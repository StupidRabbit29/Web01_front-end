import React, { useState } from 'react';
import { ConfigProvider, DatePicker, message, Layout, Menu, Row, Col, Tag, Empty } from 'antd';
import { useLocation } from "react-router-dom";
import 'antd/dist/antd.css';


const Home = (props) => {
  let location = useLocation();

  return (
    <Layout className='layout' style={{ height: '100%' }}>
      <Layout.Header style={{ padding: 0 }}>
        <Row justify='space-between' style={{ flexWrap: 'nowrap' }}>
          <Col flex='auto'>
            <Menu theme='light' mode='horizontal' defaultSelectedKeys={['1']}>
              <Menu.Item key='1'>Page1</Menu.Item>
              <Menu.Item key='2'>Page2</Menu.Item>
              <Menu.Item key='3'>Page3</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content>
        <p>{location.state.userName}</p>
        <p>{location.state.userPassword}</p>
      </Layout.Content>
      <Layout.Footer>
      </Layout.Footer>  
    </Layout>
  );
};

export default Home;