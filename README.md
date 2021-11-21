# PGR305 H2021 Exam - Webutvikling 3

## Om prosjektet

Vi har valgt klesbutikk som tema med utvalg av klær m.m. 

Informasjon om klær ligger på en ekstern MongoDB dokument-database og hentes via WebAPI fra backend.
vi har også lagt opp "placeholder"-informasjon som brukes om ekstern database er utilgjengelig.

Informasjonen som hentes kan endres på via en "Admin-portal" og vises for "kundene" via en butikkløsning på frontend.

Kommunikasjon mellom WebAPI på backend og butikkløsning på frontend går over forskjellige porter, som håndteres via CORS-oppsett på backend.


- Backend WebAPI.
  - Controller for Klær og opplasting av bilder.
    - Hente "collections" av klær, legge inn nye klær, endre attributter på klær og slette klær fra MongoDB via Serviceklasse.
  - Interfaces for attributter relatert til Klær og Anmeldelse.
  - Modeller for attributter relatert til Klær og Anmeldelse.


- Admin-portal.
  - Legge inn nye klær (Create).
  - Hente informasjon om klær (Read).
  - Oppdatere kles-informasjon (Update).
  - Slette kles-informasjon (Delete).


- Frontend butikkløsning.
  - Hjem-side og egne "hjem"-sider for valgt kjønn.
    - Filtering av viste klær basert på valgt kjønn.
  - Visning av liste med klær basert på valgt kategori (f.eks: "Shoes").
  - Visning av detalj-side for klesplagget man trykker på.
    - Kunne trykke på "thumnail"-bildene for å se flere bilder for produktet.
    - Velge ønsket størrelse og legge til produkt i en handlekurv.
    - Kunne legge inn en annmeldelse for produktet.
  - Visning produkter i handlekurven med mulighet for å legge til/fjerne antall.
  - Søkefelt som viser liste med resultater basert på nøkkelord (kjønn, kategori, merkenavn og navn på klesplagget) 


## Begrunnelse av valg

I butikkdelen av applikasjonen bestemte vi oss for å ha en hovedside som viser alle produkter (Klær, Sko, osv...).
Og delsider som viser produktene sortert etter kategorier. Vi gjorde det på denne måten fordi, vi hadde lyst til at dataene i databasen
skulle ha betydningsfull mening i applikasjonsdelen av oppgaven.

Vi har valgt å lage en egen Admin-portal hvor man gjør CRUD-operasjoner mot WebAPI, for å skille det ut fra hva "kunder" skal kunne gjøre.
For å kunne bytte mellom "admin-portalen" og "kunde-sidene" raskt valgte vi å legge inn knapper for dette rett på navigasjonsbaren.

Vi har valgt å benytte "Context" som gjør komponentene i butikk-delen av applikasjonen mindre avhengig av hverandre, og muliggjør kommunikasjon på tvers av bredde og dybde i et "komponent-hierarki".

Ved valg mellom forskjellige gitte verdier har vi valgt å benytte "dropdown"-lister, siden det kun gir mulighet til å velge noe som er gyldig og da sikrer mot feil.

Siden et produkt kan ha inneholde flere bilder valgte vi å separere redigering-funsksjonaliteten fra opplasting og sletting av bilder,
på denne måten blir redigering av produkter mer oversiktlig, både for administrator og i koden.

Ved innlastning av forskjellig informasjon viser vi beskjed om at innhold blir lastet inn, slik at sluttbrukeren vet at noe skjer og at løsningen ikke har stoppet å fungere.

For å gi "kunden" et klart inntrykk av at man kan interagere med klær som vises, så har vi valgt å fremheve klær man flytter musepekeren over. 

Vi valgte å ikke inkludere en checkout i handlekurv delen av applikasjonen. Dette er fordi det vanligvis er noe som krever sitt eget API.
I tillegg ville vi bare kunne brukt det til å oppdatere verdier i databasen. Noe vi allerede har fått til på admin pagen.


## Hva kunne vært gjort annerledes
 
Vi kunne ha vist tilpassede feilmeldinger til sluttbruker, istedenfor å bare skrive ut feilmelding til konsoll.  

Vi kunne hatt mer "space" mellom enkelte deler (f.eks. mellom navigasjonsbar og overskrift på vist side).

Vi kunne ha lagt opp funksjonalitet for å bytte mellom vist bilde på detaljsiden til valgt produkt, når man flytter musepekeren over en "thumbnail".

Enkelte sider kunne godt hatt en tilbake-knapp så man kommer tilbake "rett der man var" som gir en bedre brukeropplevelse.

Hatt et "søke-ikon som blir til et søkefelt" og ha det plassert på et mer naturlig sted i navigasjonsbaren.

Vise litt mer detaljer informasjon om produket på tilhørende detaljside, hvor sluttbrukeren nå må gjette hva som er: klesmerke, navn på klesplagget, kategorien den tilhører. 

Kunne ha funksjonalitet for å "legge inn nye produkter" og "endring av produkter" på forskjellige "sider"/"faner", slik at man slipper å bla ned til bunnen og toppen av siden hver gang man skal gjøre en av delene.


## Fremtidige forbedringer

"Loadingindicator/progressbar" når klær lastes inn, så man får en litt mer behagelig overgang.

"Dropdown"-lister med ekstra filtere for søk (f.eks.: størrelse). Ved dette kan man også vurdere å lage en egen "SearchContext" m.m.

Be om bekreftelse før fjerning av et produkt i handlekurven.

Ha "navigasjonslenker"/"tabs" for hver CRUD-operasjon en "admin" kan gjøre.

Rydde opp i duplisert kode. f.eks. ved å flytte dupliserte hardkodede verdier til "sentraliserte punkter".

Legge opp søtte for "dark mode".


### Tema valgt : Ett eller annet med klær, vesker, klokker e.l.

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

# Sources
1. Basarat. Last updated: 02 November 2020. [Index signatures in TypeScript](https://basarat.gitbook.io/typescript/type-system/index-signatures).
2. React Router. "Query Parameters" example. [React Router v5 Query Parameter example](https://v5.reactrouter.com/web/example/query-parameters)
3. MDN Info about removing eventListener(s). [Removing eventlisteners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
4. Back-arrow navigation icon: [Back arrow icon](https://www.flaticon.com/premium-icon/left_2722991?term=arrow%20left&page=1&position=5&page=1&position=5&related_id=2722991&origin=search)
