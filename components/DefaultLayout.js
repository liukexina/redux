import React from 'react';
import { Layout } from 'antd';
import Sider from './menu';
import Main from './Main';
import './menu.less';

class Siders extends React.Component {
  state = {};

  render() {
    const { pageProps } = this.props;
    return (
      <Layout>
        <Sider {...pageProps} />
        <Main {...this.props} />
      </Layout>
    );
  }
}

export default Siders;
