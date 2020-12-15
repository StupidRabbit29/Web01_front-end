import React, { useState } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";

import { Layout, Menu, Button, Affix, Avatar, Card, Tag, Divider, Select, Input, Row, Col, Tooltip, ConfigProvider, DatePicker, message, Empty} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

import avatar from "./avatar.png";
import swain from "./swain.jpg";
//import 'antd/dist/antd.css';
import './Home.less';

import { IconMap } from 'antd/lib/result';
import TextArea from 'antd/lib/input/TextArea';
import { ShowCard } from './ShowCard.js';
import { UserInfo } from './UserInfo.js';
import { Manager } from './Manager.js';

const { Search } = Input;
const onSearch = value => console.log(value);
const cardnum = 35;

export const Home = (props) => {
  let history = useHistory();
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
                height: '100%',
                backgroundColor: '#FDEBD0'
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
                
                <div style={{ height: 200 }} >
                  <UserInfo userVars={props.userVars} />
                </div>

                <div style={{ height: 50, textAlign: 'center' }} >
                  <Button type='link' shape="round"
                    onClick={() => { props.userVars.setIsLogIn(false); }}
                  >
                    退出登录
                  </Button>
                </div>

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
                  {props.userVars.userType == 2 ?
                    <Menu.Item
                      className='menu-text'
                      key="4"
                    >
                      Manage
                    </Menu.Item> :
                    <></>
                  }
                </Menu>

                <Manager />

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
    history.push("/signin");
    return (null);
  };
};
