# DeviceApi
A Mobile app that uses prebuilt device api to take advantage of hardware.


# Setup
1. Clone this repo.
2. This project requires use of google maps api to get fine user location. Create a google cloud acount at [Google Cloud](https://cloud.google.com/) and get an api key.
3. Create a file at the root of the project named env.js. In that file should be an object as follows:
```
const env = {
  googleApiKey: 'YOUR_API_KEY'
}

export default env;
```
4. Install node packages with `npm install` or `yarn`
5. Run project with `npm start' or `yarn start`
