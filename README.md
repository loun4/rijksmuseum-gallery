# Rijksmuseum app - React + TypeScript + Vite

Demo https://rijksmuseum-gallery.pages.dev/


Simple React app that consumes the [Rijksmuseum object-metadata API](https://data.rijksmuseum.nl/object-metadata/api/) and shows the leather based works from Paris.

## Getting started
After cloning the project:

### Install Dependencies
```sh
yarn
```

### Run dev server
```sh
yarn dev
```

### Run tests
```sh
yarn test
```

## Technical Architecture and Choices
### State Management
In this project, the URL acts as state management. The user inputs are set in the URL search params and shared across a shared hook.


### Data fetching
No useEffect noise, instead [tanstack-query](https://tanstack.com/query/v5) is used for data fetching. This library provides a powerful and efficient way to handle server state.

### Styling
`Scss` (`Sass`) is used with a BEM (Block Element Modifier) approch. Each component has its own
`styles.scss` file. The block class name is the component name.
