<<<<<<< HEAD
import React, { useState } from 'react';

import { Link, useLocation } from "react-router-dom";
//import 'antd/dist/antd.css';
import './Home.less';

import { ConfigProvider, DatePicker, message, Empty } from 'antd';
import { Layout, Menu, Button, Affix} from 'antd';
import { Input } from 'antd';
import { Avatar, Card, Tag, Divider, Select } from 'antd';
import { Row, Col } from 'antd';

import { Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


import { ShowCard } from './ShowCard';

import avatar from "./avatar.png";
import swain from "./swain.jpg";


import { PlusCircleOutlined } from '@ant-design/icons'

import { IconMap } from 'antd/lib/result';
import TextArea from 'antd/lib/input/TextArea';

const { Search } = Input;
const onSearch = value => console.log(value);

const cardnum = 35;



const Home = (props) => {
  // let location = useLocation();
  // props.userVars.setIsLogIn(true);


  if (props.userVars.isLogIn) {
    return (
      <Layout
        className='layout'
        style={{
          height: '100%'
        }}
      >
        <Affix
          offsetTop={0}
        >
          <Layout.Sider
            width={350}
            style={{
              borderRight: 0,
              height: '100vh'
            }}
          >
            
            <Layout
              className='sider-back'
              style={{
                height: '100%'
              }}
            >
              <Layout.Content>
              
                <Layout
                  className='headpic-back'
                  style={{
                    height: 320,
                    backgroundColor: 'transparent'
                  }}
                >
                  <Avatar
                    size={210}
                    shape='circle'
                    src={avatar}
                    alt="headpic"
                    style={{
                      margin: '70px 70px 40px 70px',
                    }} />
                </Layout>
                
                <Layout
                  style={{
                    height: 350,
                    backgroundColor: 'transparent'
                  }}
                >
                  <p
                    //WITH LINK!!!
                    style={{
                      fontSize: 35,
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    {props.userVars.user}
                  </p>
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: 20
                    }}
                  >
                    attribute 1: value1
                    <br />
                    attribute 2: value2
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      margin: '0px 30px 0px 30px'
                    }}
                  >personal message personal message personal
                    message personal message personal message
                    personal message personal message personal
                    message personal message personal message </p>
                </Layout>
                
                
                <Menu
                  theme='light'
                  mode='inline'
                  defaultSelectedKeys={['1']}
                >
                  <Menu.Item
                    className='menu-text'
                    key="1"
                  >All Events</Menu.Item>
                  <Menu.Item
                    className='menu-text'
                    key="2"
                  >Posted</Menu.Item>
                  <Menu.Item
                    className='menu-text'
                    key="3"
                  >Joined</Menu.Item>
                </Menu>

                <Layout
                  style={{
                    backgroundColor: 'transparent'
                  }}
                >
                  <p
                    style={{
                      marginTop: 60,
                      textAlign: "center",
                    }}
                  >
                    ©2020 Binbin&Xuanxuan. <br /> All rights reserved.
                  </p>

                </Layout>
              </Layout.Content>
            </Layout>
          </Layout.Sider>
        </Affix>

        <Layout>
          <Affix
            offsetTop={0}
          >
            <Layout.Header
              className='header-back'
              style={{
                padding: 0,
                // backgroundColor: 'black'
              }}
            >
              <Search
                className="searchBox"
                placeholder='Search something'
                allowClear
                onSearch={onSearch}
                background='transparent'
                style={{
                  width: 400,
                  margin: '16px 26px',
                  background: 'transparent',
                  
                }}
                
              />

                <Select
                  defaultValue='all'
                  style={{ width: 120 }}  
                >
                  <Select.Option value='all'>ALL</Select.Option>
                  <Select.Option value='1'>技术交流</Select.Option>
                  <Select.Option value='2'>学业探讨</Select.Option>
                  <Select.Option value='3'>社会实践</Select.Option>
                  <Select.Option value='4'>公益志愿</Select.Option>
                  <Select.Option value='5'>游玩</Select.Option>
                </Select>

              <Button
                style={{
                  marginLeft: 840
                }}
              >
                new
                <Divider type='vertical' />
                <PlusCircleOutlined />
              </Button>

            </Layout.Header>
          </Affix>

          <Layout.Content
            className='content-back'
          >
            

            <div className="card-area"
              style={{
                marginTop: 30,
                marginLeft: 40
              }}
            >
              <Row gutter={[16,32]}>
                <Col span={6}>
                  <ShowCard attr={1}/>
                </Col>
                <Col span={6}>
                  <ShowCard attr={2}/>
                </Col>
                <Col span={6}>
                  <ShowCard attr={3}/>
                </Col>
                <Col span={6}>
                  <ShowCard attr={4}/>
                </Col>

                <Col span={6}>
                  <ShowCard attr={5}/>
                </Col>
                <Col span={6}>
                  <ShowCard attr={6}/>
                </Col>
                <Col span={6}>
                  <ShowCard attr={7}/>
                </Col>
                <Col span={6}>
                  <ShowCard attr={8}/>
                </Col>
{/* 
                <Col span={6}>
                  <ShowCard />
                </Col>
                <Col span={6}>
                  <ShowCard />
                </Col>
                <Col span={6}>
                  <ShowCard />
                </Col>
                <Col span={6}>
                  <ShowCard />
                </Col>

                <Col span={6}>
                  <ShowCard />
                </Col>
                <Col span={6}>
                  <ShowCard />
                </Col>
                <Col span={6}>
                  <ShowCard />
                </Col>
                <Col span={6}>
                  <ShowCard />
                </Col> */}

              </Row>

            </div>




            {/* <p>{location.state.userName}</p>
            <p>{location.state.userPassword}</p> */}
          </Layout.Content>
        </Layout>

        
      </Layout>
    );
  }


  else {
    // 如果没有登录给用户展示什么还需要改
    return (
      <div>
        <p>You are not log in!<br/>Log in first!</p>
        <Link to="/login" >
          <Button>Log In</Button>
        </Link>
      </div>  
    );
  };
};

=======
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

>>>>>>> 04e82073b0f4e53cdb947c45d27efa10f4a27117
export default Home;