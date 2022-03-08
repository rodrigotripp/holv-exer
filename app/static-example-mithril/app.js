(function(window, document) {
    const m = window.m;

    const AppStore = {
        merchantName: '',
        inventory: [],

        fetchMerchantName: () => {
            const promise = m.request({
                url: '/api/merchant-name/',
                extract: (xhr) => xhr
            })
            promise.then((response) => {
                if (response.status == 200) {
                    AppStore.merchantName = response.responseText;
                }
            })
            return promise
        },

        fetchItems: () => {
            const promise = m.request({
                url: '/api/inventory/'
            })
            promise.then((data) => {
                // empty inventory
                AppStore.inventory.length = 0;
                // add items to inventory
                for (const it of data) {
                    AppStore.inventory.push(it)
                }
            })
            return promise
        },

        addItem: (name) => {
            const formData = new FormData()
            formData.set('name', name)
            const promise = m.request({
                url: '/api/inventory/',
                method: 'POST',
                body: formData
            })
            promise.then((data) => {
                // empty inventory
                AppStore.inventory.push(data)
            })
            return promise
        },

        removeItem: (id) => {
            const inventoryItem = AppStore.inventory.find((it) => it.id == id)

            // if it is not found in the inventory do not attempt request
            if (!inventoryItem) {
                return false
            }

            const promise = m.request({
                url: `/api/inventory/${id}/`,
                method: 'DELETE',
            })
            promise.then(() => {
                // remove the item from the inventory
                AppStore.inventory.splice(AppStore.inventory.indexOf(inventoryItem), 1)
            })
            return promise
        },
        setItemQuantity: (id, quantity) => {
            const inventoryItem = AppStore.inventory.find((it) => it.id == id)
                // if it is not found in the inventory do not attempt request
            if (!inventoryItem) {
                return false
            }

            const formData = new FormData()
            formData.set('quantity', quantity)

            const promise = m.request({
                url: `/api/inventory/${id}/`,
                method: 'PATCH',
                body: formData
            })
            promise.then((data) => {
                //update the quantity in the model
                inventoryItem.quantity = data.quantity
            })
            return promise
        }

    }

    const AddItemService = {
        name: '',
        setName: (name) => {
            AddItemService.name = name
        },
        canSubmit: () => {
            return Boolean(AddItemService.name)
        },
        clear: () => {
            AddItemService.name = ''
        },
        add: () => {
            const promise = AppStore.addItem(AddItemService.name)
            promise.then(() =>
                AddItemService.clear()
            )
            return promise
        }
    }

    const AddItemForm = {
        view: (vnode) => {
            return m('form', {
                'onsubmit': (ev) => {
                    ev.preventDefault()
                    AddItemService.add();
                }
            }, [
                m('label', {
                    'for': 'item_name_field'
                }, 'Add new item'),
                ' ',
                m('input', {
                    'type': 'text',
                    'name': 'item_name',
                    'id': 'item_name_field',
                    'value': AddItemService.name,
                    'oninput': (e) => { AddItemService.setName(e.target.value) }
                }),
                ' ',
                m('button', {
                    'type': 'submit',
                    'disabled': !AddItemService.canSubmit()
                }, 'Add')
            ])
        }
    }

    const QuantityControl = {
        view: function(vnode) {
            return [
                m('button', {
                    onclick: () => {
                        AppStore.setItemQuantity(vnode.attrs.item.id, vnode.attrs.item.quantity - 1)
                    },
                    disabled: vnode.attrs.item.quantity <= 0
                }, '-'),
                ' ',
                m('button', {
                    onclick: () => {
                        AppStore.setItemQuantity(vnode.attrs.item.id, vnode.attrs.item.quantity + 1)
                    }
                }, '+'),
            ]
        }
    }

    const InventoryApp = {
        view: function() {
            return m('main', [
                m('h1', { class: 'title' }, AppStore.merchantName ? `Inventory for ${AppStore.merchantName}` : 'Inventory'),
                m('table', { id: 'inventory-table' }, [
                    m('tr', [
                        m('th', 'Name'), m('th.quantity', 'Quantity'), m('th', '')
                    ]),
                    AppStore.inventory.map(function(it) {
                        return m('tr', { key: it.id }, [
                            m('td', it.name),
                            m('td.quantity', [
                                it.quantity || 0,
                                ' ',
                                m(QuantityControl, { item: it })
                            ]),
                            m('td', [
                                m('button', {
                                    'onclick': (ev) => {
                                        AppStore.removeItem(it.id)
                                    }
                                }, 'Remove')
                            ])
                        ])
                    }),
                ]),
                m('div.addform', m(AddItemForm))
            ])
        }
    };

    m.route.prefix = ''
    m.route(document.body, '/', {
        '/': {
            render: () => {
                return m(InventoryApp)
            },
            onmatch: () => {
                // prefetch data
                const merchantPr = AppStore.fetchMerchantName()
                const inventoryPr = AppStore.fetchItems()
                return Promise.all([merchantPr, inventoryPr])
            }
        }
    })
})(window, document);