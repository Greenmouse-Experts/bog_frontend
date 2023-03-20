import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
// @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";
import CookieSheet from './components/layouts/CookieSheet';
import TimeAgo from 'javascript-time-ago'
import FetchMeIfAuthenticated from './hooks/useFetchMe';
import FetchAdminNotification from './hooks/useFetchAdminNotification';
import FetchUserNotification from './hooks/useFetchUserNotification';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const googleId = process.env.REACT_APP_GOOGLE_CLIENT_ID


const app = (
  <Provider store={store}>
    <FetchMeIfAuthenticated />
    <FetchAdminNotification />
    <FetchUserNotification />
    <CookieSheet />
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleId}>
      {/* <React.StrictMode> */}
        <ThemeProvider>
          <ErrorBoundary>
            <App />
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
        {/* </React.StrictMode> */}
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
)

const root = createRoot(document.getElementById('root'));
root.render(app);
