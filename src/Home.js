import React, { useState } from 'react';
import { ConfigProvider, DatePicker, message, Layout, Menu, Row, Col, Button, Tag, Empty } from 'antd';
import { Link, useLocation } from "react-router-dom";
import 'antd/dist/antd.css';


const Home = (props) => {
  // let location = useLocation();
  // props.userVars.setIsLogIn(true);

  if (props.userVars.isLogIn) {
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
          {console.log(props.userVars)}
        </Layout.Content>
        <Layout.Footer>
        </Layout.Footer>  
      </Layout>
    );
  } else {
    // 如果没有登录给用户展示什么还需要改
    return (
      <div>
        <p>You are not log in!<br/>Log in first!</p>
        <Link to="/signin" >
          <Button>Sign In</Button>
        </Link>
        <Link to="/signup" >
          <Button>Sign Up</Button>
        </Link>
      </div>
    );
  };
};

export default Home;