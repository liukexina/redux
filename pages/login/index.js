import React, { Component, Fragment } from 'react';
import { Input, Button, Checkbox, Form, message } from 'antd';
import './index.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import request from '@utils/request';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  formRef = React.createRef();

  onFinish = values => {
    //设置值
    // this.formRef.current.setFieldsValue({
    //     username: 'Bamboo',
    // });

    //获取值
    // this.formRef.current.validateFields().then(values => {
    //     console.log(values)
    // })

    request({
      url: 'http://rap2api.taobao.org/app/mock/234047/login',
      method: 'post',
    }).then(res => {
      console.log(res);
    });

    console.log('Received values of form: ', values);
    if (values.username === 'admin' && values.password === '123456') {
      message.success('登录成功！');
      localStorage.setItem('user', JSON.stringify(values));
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      this.formRef.current.setFields([
        {
          name: ['password'],
          value: values.password,
          errors: ['账号或密码错误'],
        },
      ]);
      //重置表单值
      // this.formRef.current.resetFields()
    }
  };

  render() {
    return (
      <div className="app">
        <div className="body">
          <Form
            ref={this.formRef}
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Fragment>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: '100%' }}
                >
                  Log in
                </Button>
              </Fragment>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Login;
