# nextjs_currency_converter
This project serves the frontend UI of the currency converter spring application available [here](https://github.com/mani0608/sb_currency_converter)

# features
This app currently offers browsing & comparing currency rates. It also provides a tool to convert currency values between multiple currencies.

# Techinical Stack
This project has been designed using,
- nextjs (react), semantic ui, redux

# build
Please run the following scripts in order to build this application
_For Development_
```
npm run dev - This command will build and start the app. it supports hot reloading of modules
```
_For Production_
```
npm run build
npm run start
```

> NextJs supports SSR rendering and has been recommended to be delployed as a stand-alone application.

# Pending
Search historical rates based on a given start and end date
Support graphical depiction of how a currency has performed over a period of time
Multiple themes and improved animations
Improved Server monitoring and metrics using Spring boot acutator on server side
Deploying on a custom server _(nginx or nodejs)_
Converter calculation is currently process on the front end server. This is to avoid server calls for each key press. A mechanism to refresh data at a regular interval _(say, every 1 hour)_ need to implemented.

# Heroku
This project has been hosted on heroku and can be accessed from [here](https://currency-converter-ui.herokuapp.com)
