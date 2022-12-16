# Dreamdata Challenge - Maro Ortega

## How to run

### Env
Create a `.env` file, you can copy `.env.template` for the defaults. Only 511 API token needs to be added.

### Cross-Origin-Resource-Sharing
Because the 511 API does not have CORS a server to proxy the requests is necessary. For this purpose `local-proxy-cors` is included in the project.

Before running the app please start the proxy with one of the following commands.
```yarn proxy```
```npm run proxy```


### App
Start the application with one of the following commands.
```yarn start```
```npm start```

The app can be open at `http:locahost:3000`, autoopen on browser has been disabled.


# Issues
The search queries don't seem to work well when searching by location, the geography parameter does not behave as expected from the documentation and also it does not recognize it when encoded with URLSearchParams.

Also the tolerance param doesn't seem to work as expected as it returns results for the point 0,0 at 1km distance.

# TODO
* Better configuration of tsconfig
* Add sorting capabilities for the events
* Improve file structure organization when the app grows to have more functionality