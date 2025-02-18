# How to run after unzipping: 

## Requirements

You will need to have installed in your system `Docker` and `docker-compose`.
 Then when in the root of the folder, just type the command:
 `docker-compose up --build`.

 vist `http://localhost:5555/`
 
 `.env` and `.env.local` only contain the enviroment variable for the api.
 (I added both in case I needed to share as PR in git)

 * If there would be the need to modify the build:
 - in root folder `cd app`
 - `npm install`
 - `npm run dev` for development and do the changes. (for development, it will go with default port http://localhost:5173/)
 - `npm run build` for a fresh build into the static folder. (once changes are done...)
 - then in root folder stop the current docker process and `docker-compose up --build`
 - app runs in `http://localhost:5555/`


## Structure of the Execercise
I wanted to mantain how it was working when using the template gven by Holvi, so the static files are still in the static folder. 

This files are the build of the project as static pages. 

I went for the usage of Vite with Vue, and a "manual setup".
Adding Tailwind and all the setup needed in order to be able to use it when developing. Also using Lint and Prettier for formating and linting.

Also using Typescript mostly everywhere except on some config files. 


## src folder estructure

* api: has the `index.ts` file for fetching data from the api end points. 
* components: contains vue components used in the views of the app
* router: simple vue router for home page and each item in the inventory
* stores: contains the stores for the inventory and the merchant
* views: contains the files for `Main.vue` and `SingleItem.vue`
* App.vue: contains the layout of the app.
* main.ts: file that intializes vue and other dependencies.
* style.css: file for using tailwind.
* types.ts: file for typescript types used for the app. 
* index.html: file used for development were the app lives. (only through `npm run dev`)

## Other extra notes

`Dockerfile`and `wsgi.py` were modified in order to use WhiteNoise for the only reason to not have "static" as part of the home page url so I found it googling and served its purpose for adding(in this case removing) a prefix. This is something I have not used before. 

I wanted to use the components from naive-ui library and ended up only using "n-card" for item card. It seemed easier to just write custom components that I just left that one there.  

The colors used for the components, were based on the fruits, except the card and the form fields. There I went for more conventional colors to have clear info, buttons within the form were also based on fruits.  :D 


