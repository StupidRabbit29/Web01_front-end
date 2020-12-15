import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { useHistory  } from 'react-router-dom';
import { GET } from './Network';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import doge from "./doge.png"
import './SignIn&Up.css'

export const SignIn = (props) => {
  let history = useHistory();
  const [form] = Form.useForm();

  const formSubmit = (values) => {
    // 用户验证
    GET(`/signin?name=${values.name}&password=${values.password}`, (json) => {
      console.log(json);
      props.userVars.userLogIn(json.userinfo[0]);
      history.push("/");
    }, (errMsg) => {
        message.error(errMsg);
        form.resetFields();
    })

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
          召集令系统用户登录
        </h1>
        <div className="rcorners" style={{ height: "184px" }} >
          <Form form={form} name="basic" initialValues={{ remember: true }} onFinish={(values)=>formSubmit(values)} >
            <Form.Item name="name" rules={[{ required: true, message: 'Please input your username!' }]} >
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
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Button type="link" htmlType="button"
            style={{ width: '100%', borderRadius: '6px', border: 'none', fontSize: '16px', }}
            onClick={()=>{history.push("/signup")}}
          >
            Create a new user!
          </Button>
        </div>
      </div>
    );
  } else {
    history.push("/");
    return (null);
  };
};

