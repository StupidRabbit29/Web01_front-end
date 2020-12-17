import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Input, message } from 'antd';
import { PhoneOutlined, IdcardOutlined, HomeOutlined, EditOutlined, CrownTwoTone } from '@ant-design/icons';
import { POST } from './Network';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

export const UserInfo = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      "user": props.userVars.user,
      "phone": props.userVars.phone,
      "password": "",
      "description": props.userVars.description
    })
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const formSubmit = () => {
    const payload = form.getFieldsValue();
    console.log(payload);
    POST('/changeuserinfo', payload, (json) => {
      message.success("Change user's info successfully!");
      props.userVars.userLogIn(json.userinfo[0]);
    }, (errMsg) => {
      message.error(errMsg);
    });
    handleOk();
  };

  let level = null;
  if (props.userVars.level === 1) {
    level = <CrownTwoTone twoToneColor="#666633" style={{ fontSize: 35}} />;
  } else if (props.userVars.level === 2) {
    level = <CrownTwoTone twoToneColor="#C0C0C0" style={{ fontSize: 35}} />;
  } else {
    level = <CrownTwoTone twoToneColor="#FFD700" style={{ fontSize: 35}} />;
  }
  //#666633
  //#C0C0C0
  //#FFD700
  
  return (
    <>
      <Row align="middle" >
        <Col offset={5} span={2} >
          {level}
        </Col>
        <Col offset={2} span={8} >
          <p
            style={{
              fontSize: 35,
              fontWeight: 'bold',
              margin: 0
            }}
          >
            {props.userVars.user}
          </p>
        </Col>
        <Col span={4} >
          <Button type="link" onClick={showModal} shape="circle">
            <EditOutlined style={{ fontSize: 25 }} />
          </Button>
        </Col>
      </Row>
      <Row align="middle" >
        <Col offset={5} span={2} >
          <PhoneOutlined style={{ fontSize: 20}} />
        </Col>
        <Col span={12} >
          <p
            style={{
              fontSize: 20,
              margin: 0
            }}
          >
            {props.userVars.phone}
          </p>
        </Col>
      </Row>
      <Row align="middle" >
        <Col offset={5} span={2} >
          <IdcardOutlined style={{ fontSize: 20}} />
        </Col>
        <Col span={12} >
          <p
            style={{
              fontSize: 20,
              margin: 0
            }}
          >
            {props.userVars.identityNum}
          </p>
        </Col>
      </Row>
      <Row align="middle" >
        <Col offset={5} span={2} >
          <HomeOutlined style={{ fontSize: 20}} />
        </Col>
        <Col span={12} >
          <p
            style={{
              fontSize: 20,
              margin: 0
            }}
          >
            {props.userVars.city}
          </p>
        </Col>
      </Row>
      <Row align="middle" >
        <Col offset={5} span={2} >
          <EditOutlined style={{ fontSize: 20}} />
        </Col>
        <Col span={12} >
          <p
            style={{
              fontSize: 20,
              margin: 0
            }}
          >
            {props.userVars.description}
          </p>
        </Col>
      </Row>
      
      <Modal
        visible={visible}
        title="修改用户信息"
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        footer={
          <>
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>
          </>
        }
      >
        <Form name="changeuserinfo" onFinish={formSubmit} form={form} {...layout} >
          <Form.Item
            name="user"
            label="用户名"
            rules={[{ required: false }]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: false }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="description"
            label="用户描述"
            rules={[{ required: false }]}
          >
            <Input autocomplete='off'/>
          </Form.Item>
          <Form.Item {...tailLayout} >
            <Button type="primary" htmlType="submit" >
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
