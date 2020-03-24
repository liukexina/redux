import React from 'react';
import { Menu, Layout } from 'antd';
import { connect } from 'react-redux';
import Router from 'next/router';
import { DingdingOutlined } from '@ant-design/icons';
import { menuList, defaultMenu } from './MenuList';
import './menu.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

class Siders extends React.Component {
  state = {
    theme: 'light',
    collapsed: false,
    current: 'home',
  };

  componentDidMount() {
    this.setState({
      current: this.props.pathname,
    });
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
    Router.push(e.key);
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  menuI(array) {
    const menuItem = [];
    for (let item of array) {
      menuItem.push(
        <Menu.Item key={item.key}>
          {item.icon}
          {item.title}
        </Menu.Item>
      );
    }
    return menuItem;
  }

  menuL(array) {
    const menu = [];
    for (let menuItem of array) {
      if (menuItem.children.length === 0) {
        menu.push(
          <Menu.Item key={menuItem.key}>
            {menuItem.icon}
            {menuItem.title}
          </Menu.Item>
        );
      } else {
        menu.push(
          <SubMenu
            key={menuItem.key}
            title={
              <span>
                {menuItem.icon}
                <span>{menuItem.title}</span>
              </span>
            }
          >
            {this.menuI(menuItem.children)}
          </SubMenu>
        );
      }
    }
    return menu;
  }

  render() {
    const menu = this.menuL(menuList);
    return (
      <Sider
        theme={this.props.theme}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo">
          <DingdingOutlined
            style={{
              fontSize: 30,
              margin: '0 auto',
              display: 'block',
              color: this.state.theme === 'dark' ? '#fff' : '#1790ff',
            }}
          />
        </div>
        <Menu
          theme={this.props.theme}
          onClick={this.handleClick}
          defaultSelectedKeys={defaultMenu.defaultSelectedKeys}
          defaultOpenKeys={defaultMenu.defaultOpenKeys}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {menu}
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Siders);

// export default Siders
