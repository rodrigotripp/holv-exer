import os
from flask import Flask
from flask import request
from flask import send_file
from flask_cors import CORS
from tinydb import TinyDB, Query
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

APP_PATH = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.environ.get('DB_PATH', os.path.join(APP_PATH, 'db.json'))

db = TinyDB(DB_PATH)
items_table = db.table('items')
Item = Query()

def serialize_tinydb_el(el):
    ret = {k: v for k, v in el.items()}
    ret['id'] = str(el.doc_id)
    return ret


# serve the index page
# in order to enable HTML5 routing, 404s return the index page
@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return send_file('static/index.html'), 200


@app.route('/api/merchant-name/', methods=['GET'])
def merchant_name():
    """
    Get the merchant name
    """
    return os.environ.get('MERCHANT_NAME')


@app.route('/api/inventory/', methods=['GET', 'POST'])
def inventory_list():
    """
    Get the list of products and their details or create new product
    """
    if request.method == 'POST':
        errors = {}
        # light validation
        if 'name' not in request.form:
            errors['name'] = 'This field is required'
        if errors:
            return (json.dumps(errors), 400)

        doc_id = items_table.insert({'name': request.form['name'], 'quantity': 0})
        return (serialize_tinydb_el(items_table.get(doc_id=doc_id)), 200)
    else:
        return (json.dumps(list(map(serialize_tinydb_el, items_table.all()))), 200)


@app.route('/api/inventory/<int:item_id>/', methods=['GET', 'PATCH', 'DELETE'])
def inventory_item(item_id):
    """
    Place an order to the provider
    """
    el = items_table.get(doc_id=item_id)
    if not el:
        return 'Not found', 404

    if request.method == 'GET':
        return json.dumps(serialize_tinydb_el(el)), 200
    if request.method == 'PATCH':
        errors = {}
        update_data = {}
        if 'quantity' in request.form:
            if not request.form['quantity'].isnumeric():
                errors.update({'quantity': 'Enter a positive integer'})
            else:
                quantity = int(request.form['quantity'])
                if quantity < 0:
                    errors.update({'quantity': 'Enter a positive integer'})
                else:
                    update_data['quantity'] = quantity
        if 'name' in request.form:
            update_data['name'] = request.form['name']

        if errors:
            return (json.dumps(errors), 400)

        items_table.update(update_data, doc_ids=[el.doc_id])
        return (json.dumps(serialize_tinydb_el(items_table.get(doc_id=el.doc_id))), 200)
    if request.method == 'DELETE':
        items_table.remove(doc_ids=[el.doc_id])
        return ('', 204)