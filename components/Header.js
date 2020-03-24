import React from 'react';
import { Switch, Layout, Avatar, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

class Siders extends React.Component {
  state = {};

  changeTheme = value => {
    if (value) {
      this.props.dispatch({ type: 'DARK' });
    } else {
      this.props.dispatch({ type: 'LIGHT' });
    }
  };

  render() {
    return (
      <Header
        className="site-layout-background"
        style={{ position: 'relative', padding: '0 0 0 20px' }}
      >
        <Switch
          checked={this.props.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        {/* <div style={{ marginLeft: '30px' }}>header</div> */}
        <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '5px 5px 5px 1px #888888',
            }}
          />
        </Dropdown>
      </Header>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Siders);
