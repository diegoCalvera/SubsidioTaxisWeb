import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }),
      provideRouter(routes),
      provideAnimationsAsync(),
      provideFirebaseApp(() => initializeApp(
        { "projectId": "subsidiotaxis-1e01d",
          "appId": "1:748153370852:web:1ad7c31c3f3e7910aad4f1",
          "storageBucket": "subsidiotaxis-1e01d.appspot.com",
          "apiKey": "AIzaSyDaIvaYFASv-TxB7OEuun5INbFbtOyTVIY",
          "authDomain": "subsidiotaxis-1e01d.firebaseapp.com",
          "messagingSenderId": "748153370852" })
     ), provideFirestore(() => getFirestore())]
};
