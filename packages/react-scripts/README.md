# nod-react-scripts

This `nod-react-scripts` package was build for Grit Digital Health's Nod application. It is forked from React's `react-scripts`. `nod-react-scrips` manually finds and injects Cordova into projects that use the package.

This manual injection is done with `config/WebpackDevServer.config.js:110`
`app.use(injectCordovaJS());`

Functionality for this injection is in `config/cordovaConfig.js`.

---

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.
