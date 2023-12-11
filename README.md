# Frontend exercise

This repository provides a "quick" application for a frontend exercise.
While apps do not follow best practices or the quality standards at
Holvi, they have been put in place quickly for the exercise.

## Requirements

You will need to have installed in your system `Docker` and `docker-compose`.
All this has been developed mostly using MacOS. Please let us know if there is
any problem running this in other operating systems (potential problems may
arise in mounted volumes).

## Quickstart

The app provides a simple inventory application where there are items and
quantity for them.

The exercise consists in writing a web frontend UI

 * Add items
 * Remove items
 * Change quantity of an item

The only thing necessary to get the applications running is execute
`docker-compose up` at the root folder of the directory.

* `http://localhost:5555/api/....`: API endpoints
* `http://localhost:5555/*`: Other endpoints serve the index.html so that HTML5
  history.pushState API can be used.


## Service implementation and integration

The services use Python `Flask` with storage of data with Python `tinydb` in json.
Databases with initial data have been provided so that they are easy to reset
via `git reset --hard` (docker-compose down and up will be required)

## API definition

The API definition can be found in the main [./app/app.py](app/app.py).

Reading and understanding the API for integration is part of the exercise, just
couple hints.

* `POST` over `/api/inventory` requires only `name` attribute and will set
`quantity` to zero, regardless if a value has been sent over.

## Exercise

Write a very simple UI for interacting with the backend. You choose the
technologies you want to use. Minimum functionality to implement:

* Display the list of items
* Add item
* Remove item
* Edit item quantity

Please add types to everything.

Extra points but not necessary:

* Tests: try to focus on unit tests, but component and E2E tests are also possible
* Item details view and routing
  * As there are no additional details to show in the current db, you are of course allowed to extend the schema with additional fields
