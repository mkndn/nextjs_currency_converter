import App from "next/app";
import React from "react";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import "semantic-ui-css/themes/default/assets/fonts/icons.eot";
import "semantic-ui-css/themes/default/assets/fonts/icons.woff";
import "semantic-ui-css/themes/default/assets/fonts/icons.woff2";

import store from "../store";
import withRedux from "next-redux-wrapper";
import { CookiesProvider, withCookies } from "react-cookie";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store, cookies } = this.props;
    pageProps.cookies = cookies;
    return (
      <CookiesProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </CookiesProvider>
    );
  }
}

export default withRedux(store)(withCookies(MyApp));
