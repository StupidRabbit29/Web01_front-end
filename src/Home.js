import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Layout, Menu, Button, Affix, Avatar, Select, Input } from 'antd';

import { ShowCard } from './ShowCard.js';
import { UserInfo } from './UserInfo.js';
import { Manager } from './Manager.js';
import { AddEvent } from './AddEvent.js';

import './Home.less';

import avatar from "./avatar.png";
import avatar1 from "./avatar1.png";
import avatar2 from "./avatar2.png";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.png";
import avatar5 from "./avatar5.png";


export const Home = (props) => {
  let history = useHistory();
  const [pageHeight, setPageHeight] = useState(window.document.body.clientHeight);
  const [pageWidth, setPageWidth] = useState(window.document.body.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [specificType, setSpecificType] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const { Search } = Input;
  const avatarList = [avatar1, avatar2, avatar3, avatar4, avatar5];

  useEffect(() => {
    setPageHeight(window.document.body.clientHeight);
    setPageWidth(window.document.body.innerWidth);
  });

  if (props.userVars.isLogIn) {
    return (
      <Layout className='layout'
        style={{
          height: pageHeight,
          width: pageWidth
        }}
      >
        <Affix offsetTop={0} >
          <Layout.Sider width={350}
            style={{
              borderRight: 0,
              height: pageHeight
            }}
          >
            <Layout className='sider-back'
              style={{
                height: pageHeight,
                backgroundColor: '#21618C'
              }}
            >
              <Layout.Content>
                <Layout className='headpic-back'
                  style={{
                    height: 320,
                    backgroundColor: 'transparent'
                  }}
                >
                  <Avatar
                    size={210}
                    shape='circle'
                    src={ props.userVars.userType == 2 ? avatar : avatarList[props.userVars.id % 5] }
                    alt="headpic"
                    style={{
                      margin: '70px 70px 40px 70px',
                    }} />
                </Layout>
                
                <div style={{ height: 200 }} >
                  <UserInfo userVars={props.userVars} />
                </div>

                <div style={{ height: 50, textAlign: 'center' }} >
                  <Button type='link' shape="round" onClick={() => { props.userVars.setIsLogIn(false); }} >
                    退出登录
                  </Button>
                </div>

                <Menu
                  theme='light'
                  mode='inline'
                  defaultSelectedKeys={['1']}
                  onClick={(e) => { setCurrentPage(e.key); }}
                >
                  <Menu.Item className='menu-text' key="1" >召集令大厅</Menu.Item>
                  {props.userVars.userType == 1 ?
                    <Menu.Item className='menu-text' key="2" >我的发布</Menu.Item> : <></>
                  }
                  {props.userVars.userType == 1 ?
                    <Menu.Item className='menu-text' key="3" >我的申请</Menu.Item> : <></>
                  }
                  {props.userVars.userType == 2 ?
                    <Menu.Item className='menu-text' key="4" >管理<Manager showtype={currentPage} /></Menu.Item> : <></>
                  }
                </Menu>
              </Layout.Content>
                
              <Layout.Footer style={{ backgroundColor: 'transparent' }} >
                <p style={{ marginTop: 60, textAlign: "center", }} >
                  ©2020 Binbin&Xuanxuan. <br /> All rights reserved.
                </p>
              </Layout.Footer>
            </Layout>
          </Layout.Sider>
        </Affix>

        <Layout.Content className='content-back' width={pageWidth - 350} >
          <Layout >
            <Affix offsetTop={0} >
              <Layout.Header
                className='header-back'
                style={{
                  padding: 0,
                  backgroundColor: '#154360'
                }}
              >
                <Search
                  className="searchBox"
                  placeholder='Search something'
                  allowClear
                  onSearch={(value) => { setSearchKey(value); }}
                  background='transparent'
                  style={{
                    width: 400,
                    margin: '16px 26px',
                    background: 'transparent',
                  }}
                />
                <Select defaultValue='0' style={{ width: 120 }} onChange={(value) => { setSpecificType(value); }} >
                  <Select.Option value='0'>全部类别</Select.Option>
                  <Select.Option value='1'>技术交流</Select.Option>
                  <Select.Option value='2'>学业探讨</Select.Option>
                  <Select.Option value='3'>社会实践</Select.Option>
                  <Select.Option value='4'>公益志愿</Select.Option>
                  <Select.Option value='5'>娱乐游玩</Select.Option>
                </Select>
                <AddEvent userVars={props.userVars} />
              </Layout.Header>
            </Affix>

            <Layout.Content className='content-back' >
              <div className="card-area"
                style={{
                  marginTop: 50,
                  marginLeft: 70
                }} >
                <ShowCard userVars={props.userVars} showtype={currentPage} specificType={specificType} searchKey={searchKey} />
              </div>
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    );
  }
  else {
    history.push("/signin");
    return (null);
  };
};
