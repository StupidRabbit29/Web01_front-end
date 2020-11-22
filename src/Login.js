import React, { useState } from 'react';
import { Button, Input, Form, Checkbox } from 'antd';
import { Link, Redirect, useHistory  } from 'react-router-dom';

const Login = (props) => {
  let history = useHistory();

  const formSubmit = (values) => {
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
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={formSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        {/* <Link to={{ pathname: "/", state: { username: "" }}}> */}
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        {/* </Link> */}
      </Form.Item>
    </Form>
  )
};

export default Login;
