import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
const { Content } = Layout;
class Siders extends React.Component {
  state = {};

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout className="site-layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 630 }}
          >
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default Siders;
