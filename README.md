# PGR305 H2021 Exam - Webutvikling 3

### Tema valgt : Ett eller annet med klær, vesker, klokker e.l.

Krav til oss selv
* [ ] Diverse konfigurering som for eksempel for CORS
* [ ] wrap responses
* [ ] enum

* Laste opp nye produkter
* Slette Produkter
* Update (PUT) Oppdatering  (Admin side?)
* [ ] Router
* [ ] Ajax

*** Nettside
* Søkeside
* [ ] søkefunksjonalitet,
* [ ] sorteringsfunksjonalitet,

* Cart - bruk av logoe, legge til flere antall, slette produkt som ikke skal være med
* [ ] Admin side
* Hjemme side random selction av klær


### Hovedtema / Krav

* [x] React (frontend)
* [x] .NET/C# Web Api MongoDb (backend)
* [ ] Husk at oppkoblingen til MongoDb krever en ConnectionString med brukernavn og passord.
  * Du må vurdere om denne burde fjernes slik at sensorene evt. ikke skal kunne se sensitive data.
    * det er ok å levere uten ConnectionString


#### Spesifikke Backend Krav
* [x] Database i MongoDb Atlas
* [ ] .NET/C# Web API med CRUD-funksjonalitet mot MongoDb

Krav tekniker teknologier:

* [x] Controller 
* [x] Model-klasser
* [x] Interface
* [x] Service
* [ ] Diverse konfigurering som for eksempel for CORS
* [x] MongoDb Atlas
* [ ] CRUD – Create, Read, `Update`, `Delete`
* [ ] Bildeopplasting

- Interfaces, Model-klasser, Service-klasser med CRUD og Controllere Ca. 30-45%
- Diverse konfigurasjon, CORS, staticFiles osv- Ca. 5-10%



#### Spesifikke Frontend Krav


* [ ] Sider med funksjonalitet hvor en bruker kan gjøre CRUD. Forsøk å dele opp CRUDfunksjonaliteten
  i flere komponenter.
* [ ] Diverse funksjonalitet som du mener kan passe å ha med.
  * Eksempler kan være å ha med
    * [ ] søkefunksjonalitet, 
    * [ ] sorteringsfunksjonalitet, 
    * [ ] quiz osv. Du har stor frihet til å
        bestemme funksjonalitet du kan ha med her.

Krav tekniker teknologier: 

* [x] Komponentbasert utvikling med blant annet List og Item-fordeling av ansvar
* [x] State management med Context
* [x] TypeScript
  * [x] Interface 
  * [x] Type
  * [x] Typesetting
* [ ] Router
* [ ] Ajax
* [x] React Bootstrap 
  * Et hovedmoment her er å gjøre bruk av Grid-systemet i CSS-rammeverket
* [x] Diverse JS-teknikker som for eksempel .map(), spread operator, ternary operator, array, object literal osv.


- Komponentbasert utvikling med blant annet List og Item-fordeling av ansvar.
- TypeScript med Interface og Type og diverse typedefinering.
- Diverse JS-teknikker som for eksempel .map(), spread operator, ternary operator, array, object literal, Ajax osv. Ca. 30-40%
- State management med Context. Routing. Ca. 10-15%
- React Bootstrap Ca. 10-15%


### Tools

* [x] Bootstrap
* [x] .NET5
* [x] MongoDb


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Sources
1. Basarat. Last updated 02 November 2020. [Index signatures in TypeScript](https://basarat.gitbook.io/typescript/type-system/index-signatures)