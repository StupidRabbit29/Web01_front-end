import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { Link, Redirect, useHistory  } from 'react-router-dom';
import { GET } from './Network';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import doge from "./doge.png"
import './SignIn&Up.css'

const SignUp = (props) => {
  let history = useHistory();

  const formSubmit = (values) => {
    // 用户注册
    // GET(`/login/${values.username}`, (json) => {
    //   console.log(json);
    // }, (errMsg) => {
    //   message.error(errMsg);
    // })

    // 后期需要改成响应后端返回结果，也有可能是错误的登录
    // if (true) {
    //   props.userVars.setUser(values.username);
    //   props.userVars.setEmail("test");
    //   props.userVars.setPhone("test");
    //   props.userVars.setUserType("1");
    //   props.userVars.setIsLogIn(true);
    // };

    history.push("/signin");
  };
  
  if (!props.userVars.isLogIn) {
    return (
      <div
        style={{
          width: 350,
          margin: 'auto',
          textAlign: "center",
        }}
      >
        <div style={{ textAlign: 'center', margin: "40px 145px 20px 145px" }} >
          <img
            style={{ height: '60px', }}
            alt="logo"
            src={doge}
          />
        </div>
        <h1 style={{ textAlign: 'center', }} >
          召集令系统用户注册
        </h1>
        <div className="rcorners" >
          <Form name="basic" initialValues={{ remember: true }} onFinish={formSubmit} >
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                style={{ width: '100%', borderRadius: '6px'}}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{ width: '100%', borderRadius: '6px'}}
              />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit"
                style={{ width: '100%', borderRadius: '6px', backgroundColor: '#F1C40F', border: 'none', fontSize: '16px', }}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  } else {
    history.push("/");
    return (null);
  };
};

export default SignUp;
