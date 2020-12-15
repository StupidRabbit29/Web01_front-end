import React, { useState, useEffect } from 'react';
import { Menu, Modal, Button, List, Row, Col, message } from 'antd';
import { PieChartOutlined, UserOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { GET } from './Network';


export const Manager = (props) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("1");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const formSubmit = (values) => {
    console.log(values);
  };

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const pages = {
    '1': {
      id: '1',
      content: (
        <CallUpInfo />
      ),
    },
    '2': {
      id: '2',
      content: (
        <UserList />
      ),
    },
  };

  return (
    <>
      <Button onClick={showModal} shape="round">
        Manage
      </Button>
      <Modal
        visible={visible}
        destroyOnClose={true}
        title={
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              召集令统计信息
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              用户列表
            </Menu.Item>
          </Menu>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        width={'1000px'}
        footer={
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>
        }
      >
        {pages[current].content}
      </Modal>
    </>
  );
};


const CallUpInfo = () => {
  return (null);

    // <List
    //   itemLayout="horizontal"
    //   pagination={{
    //     onChange: page => {
    //       console.log(page);
    //     },
    //     pageSize: 5,
    //   }}
    //   dataSource={}
    //   renderItem={item => (
    //     <List.Item
    //       key={item.title}
    //     >
    //       <List.Item.Meta
    //         avatar={<SlidersTwoTone style={{ fontSize: 28 }} />}
    //         title={<p style={{ fontSize: 20, margin: 0, padding: 0 }} >{item.title}</p>}
    //         description={
    //           <p style={{ fontSize: 14, margin: '0px 0px 4px', padding: 0 }} >
    //             {item.time} by <b>{item.owner}</b> ver. <b>{item.version}</b>
    //           </p>
    //         }
    //         style={{ margin: 0, padding: 0 }}
    //       />
    //       <Row justify="space-around" align="middle" >
    //         <Col span={11} >
    //           {item.description}
    //         </Col>
    //         <Col span={4} >
    //           <p style={{ fontSize: 16, margin: 0, padding: 0 }}>Accuracy:</p>
    //         </Col>
    //         <Col span={3} >
    //           <p style={{ fontSize: 24, margin: 0, padding: 0 }}><b>{item.accuracy}</b></p>
    //         </Col>
    //         <Col span={6} >
    //           <Button shape="round" type="primary" disabled={item.current} style={{ border: 0 }}>
    //             Set as Current
    //           </Button>
    //         </Col>
    //       </Row>
    //     </List.Item>
    //   )}
    // />
  
};

const UserList = () => {
  const [listUserData, setListUserData] = useState([]);

  const getUser = () => {
    GET('/userlist', (json) => {
      const tempList = [];
      for (let i = 0; i < json.userinfo.length; i++) {
        let user = json.userinfo[i]
        console.log(user);
        tempList.push({
          name: user.name,
          phone_num: user.phone_num,
          description: user.description,
          user_type: user.user_type,
          identity_type: user.identity_type,
          identity_num: user.identity_num,
          level: user.level,
          city: user.city,
          modify_time: user.modify_time
        });
      };
      setListUserData(tempList);
    }, (errMsg) => {
      message.error(errMsg);
    });
  };

  useEffect(() => {
    getUser();
  });

  return (
    <List
      itemLayout="vertical"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listUserData}
      renderItem={item => (
        <List.Item
          key={item.name}
          extra={
            <img
              width={200} alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<UserOutlined style={{ fontSize: 28 }} />}
            title={
              <p style={{ fontSize: 35, fontWeight: 'bold', margin: 0, padding: 0 }} >
                {item.name}
              </p>
            }
            description={
              <p style={{ fontSize: 16, margin: 0, padding: 0 }} >
                {item.description} 修改时间：{item.modify_time}
              </p>
            }
            style={{ margin: 0, padding: 0, }}
          />
          <Row align="middle" >
            <Col span={1} >
              <PhoneOutlined style={{ fontSize: 25}} />
            </Col>
            <Col offset={1} span={5} >
              <p style={{ fontSize: 18, margin: 0 }} >
                {item.phone_num}
              </p>
            </Col>
            <Col offset={1} span={1} >
              <IdcardOutlined style={{ fontSize: 25}} />
            </Col>
            <Col offset={1} span={3} >
              <p style={{ fontSize: 18, margin: 0 }} >
                { item.identity_type === 1 ? "身份证" : "护照" }
              </p>
            </Col>
            <Col offset={1} span={8} >
              <p style={{ fontSize: 18, margin: 0 }} >
                {item.identity_num}
              </p>
            </Col>
          </Row>
          <Row align="middle" >
            <Col span={1} >
              <HomeOutlined style={{ fontSize: 25}} />
            </Col>
            <Col offset={1} span={5} >
              <p style={{ fontSize: 18, margin: 0 }} >
                {item.city}
              </p>
            </Col>
            <Col offset={1} span={1} >
              <TeamOutlined style={{ fontSize: 25}} />
            </Col>
            <Col offset={1} span={3} >
              <p style={{ fontSize: 18, margin: 0 }} >
                { item.user_type === 2 ? "管理员" : "普通用户" }
              </p>
            </Col>
            <Col offset={1} span={1} >
              <TrophyOutlined style={{ fontSize: 25}} />
            </Col>
            <Col offset={1} span={3} >
              <p style={{ fontSize: 18, margin: 0 }} >
                {item.level} 级
              </p>
            </Col>
          </Row>
          {/* <Row align="middle" >
            <Col span={6} >
              <Button shape="round" type="primary" disabled={item.current} style={{ border: 0, }}>
                Set as Current
              </Button>
            </Col>
            <Col span={10} offset={2} >
              <p style={{ fontSize: 14, margin: '0px 0px 4px', padding: 0 }} >
                {item.time} by <b>{item.owner}</b> ver. <b>{item.version}</b>
              </p>
            </Col>
          </Row> */}
        </List.Item>
      )}
    />
  );
};
