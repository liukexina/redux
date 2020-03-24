import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import store from '../redux/store';
// import 'antd/dist/antd.less'  //按需加载

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    if (pageProps.pathname === '/login') {
      return <Component {...this.props} />;
    }
    return (
      <Provider store={store}>
        <DefaultLayout {...this.props} />
      </Provider>
    );
  }
}
