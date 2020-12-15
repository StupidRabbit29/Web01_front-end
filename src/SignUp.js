import React, { useState } from 'react';
import { Button, Input, Form, message, Radio } from 'antd';
import { useHistory  } from 'react-router-dom';
import { GET, POST } from './Network';
import { UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined, EditOutlined } from '@ant-design/icons';
import doge from "./doge.png"
import './SignIn&Up.css'

export const SignUp = (props) => {
  let history = useHistory();
  const [idtype, setIDType] = useState(1);
  const [form] = Form.useForm();

  const formSubmit = (values) => {
    console.log(values);
    // 用户注册
    const payload = {
      'name': values.name,
      'password': values.password,
      'phone_num': values.phonenum,
      'description': values.description,
      'identity_type': `${values.identitytype}`,
      'identity_num': values.identitynum,
      'city': values.city
    };
    console.log(payload);
    POST('/signup', payload, (json) => {
      message.success("Signup successfully, signin now!")
      history.push("/signin");
    }, (errMsg) => {
      message.error(errMsg);
      form.resetFields();
    });
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
        <div className="rcorners" style={{ height: "464px" }}>
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
            <Form.Item name="phonenum" rules={[{ required: true, message: 'Please input your phone number!' }]} >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone number"
                style={{ width: '100%', borderRadius: '6px'}}
              />
            </Form.Item>
            <Form.Item name="identitytype" rules={[{ required: true, message: 'Please select your identity type!' }]} >
              <Radio.Group onChange={(e)=>{setIDType(e.target.value)}} value={idtype} >
                <Radio value={1} >身份证</Radio>
                <Radio value={2} >护照</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="identitynum" rules={[{ required: true, message: 'Please input your identity number!' }]} >
              <Input
                prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="Identity number"
                style={{ width: '100%', borderRadius: '6px'}}
              />
            </Form.Item>
            <Form.Item name="city" rules={[{ required: true, message: 'Please input your city!' }]} >
              <Input
                prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="City"
                style={{ width: '100%', borderRadius: '6px'}}
              />
            </Form.Item>
            <Form.Item name="description" rules={[{ required: false, message: 'Introduce yourself!' }]} >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Introduce yourself"
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
