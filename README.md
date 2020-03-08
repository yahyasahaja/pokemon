# Social Media Dashboard
[![pipeline status](https://gitlab.com/yahyasahaja/pokemon/badges/master/pipeline.svg)](https://gitlab.com/yahyasahaja/pokemon/commits/master)

---

[DEMO](https://pokemon.ngopi.men)
I'm using **React JS** using typescript as a framework to develop this app.

## Project Structure

- ``src/components`` contains all shared components
- ``src/contexts`` contains all contexts, could be represented as ViewModel
- ``src/screens`` contains all the screens inside this app, structured by route logic

## Libraries
- For the UI, I'm using `material-ui`
- Styling using `styled-components`
- State management using `React Context API`

## Architecture

I'm using (Model-View-ViewModel) as an app architecture. 
- The `Model` can be found at `https://pokeapi.co/api/v2/`.
- The `View` can be found at `screens`
- The `ViewModel` can be represented as the context itself. So all the requests can only be triggered from ViewModel. There's no way to direct interaction between Model and View

## PWA (Progressive Website Application)
- Mobile-First method to make this app feels more like a mobile app at the first impression.
- Utilize `service worker` to handles the concept
- And also, with special logic to cache the fetched data

## TEST
- For unit test, I'm using `enzyme`.
- And also adding end-to-end testinng using `cypress`

## CI/CD
Thanks for Gitlab CI and my aws account that this can be up at [https://pokemon.ngopi.men](https://pokemon.ngopi.men) with `passes` all of the tests (unit and e2e test)

## TO RUN LOCALLY
- clone repo
- run `yarn install`
- run `yarn start`

To run test:
- run `yarn cypress:open`
- or run without UI: `yarn cypress:run`