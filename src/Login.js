import React, { useState } from 'react';
import { Button, Input, Form, Checkbox, message } from 'antd';
import { Link, Redirect, useHistory  } from 'react-router-dom';
import { GET } from './Network';

const Login = (props) => {
  let history = useHistory();

  const formSubmit = (values) => {
    // 用户验证
    GET(`/login/${values.username}`, (json) => {
      console.log(json);
    }, (errMsg) => {
      message.error(errMsg);
    })

    // 登录验证通过，允许跳转到主页面
    const location = {
      pathname: "/", 
      state: {
        userName: values.username,
        userPassword: values.password
      }
    };
    history.push(location);
  };

  return (
    <Form name="basic" initialValues={{ remember: true }} onFinish={formSubmit} >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Login;
