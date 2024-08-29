// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAwNv3AQpiMde2EWdZO3s-TXSPeJ1ZH6Jw",
    authDomain: "pgjobs-92ad6.firebaseapp.com",
    projectId: "pgjobs-92ad6",
    storageBucket: "pgjobs-92ad6.appspot.com",
    messagingSenderId: "334722253346",
    appId: "1:334722253346:web:c9709cde7ec8bb0706807b",
    measurementId: "G-ZNTP1D0S9B"
  }
};

// Initialize Firebase
// const app = initializeApp(environment.firebase);
// const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
