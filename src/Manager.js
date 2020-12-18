import React, { useState, useEffect } from 'react';
import { Menu, Modal, Button, List, Row, Col, message, Statistic, Select } from 'antd';
import { PieChartOutlined, UserOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { GET } from './Network';


export const Manager = (props) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("1");

  const showModal = () => {
    if (props.showtype == 4)
      setVisible(true);
    else
      setVisible(false);
  };

  useEffect(showModal, [props.showtype]);

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
  const [profit, setProfit] = useState(0);
  const [year, setYear] = useState("2020");
  const [month, setMonth] = useState("12");

  return (
    <Row align="middle" >
      <Col span={12} >
        <div style={{ height: 200, padding: 20}} >
          <Row align="middle" style={{ marginTop: 50}}>
            <Col offset={1} span={8} >
              <Select defaultValue='2020' style={{ width: '100%' }} onChange={(value) => { setYear(value); }} >
                <Select.Option value='2020'>2020</Select.Option>
              </Select>
            </Col>
            <Col offset={1} span={2} >年</Col>
            <Col offset={1} span={8} >
              <Select defaultValue='12' style={{ width: '100%' }} onChange={(value) => { setMonth(value); }} >
                <Select.Option value='1'>1</Select.Option>
                <Select.Option value='2'>2</Select.Option>
                <Select.Option value='3'>3</Select.Option>
                <Select.Option value='4'>4</Select.Option>
                <Select.Option value='5'>5</Select.Option>
                <Select.Option value='6'>6</Select.Option>
                <Select.Option value='7'>7</Select.Option>
                <Select.Option value='8'>8</Select.Option>
                <Select.Option value='9'>9</Select.Option>
                <Select.Option value='10'>10</Select.Option>
                <Select.Option value='11'>11</Select.Option>
                <Select.Option value='12'>12</Select.Option>
              </Select>
            </Col>
            <Col offset={1} span={2} >月</Col>
          </Row>
        </div>
        <div style={{ height: 200, padding: 20 }} >
          <Statistic title="收益" value={profit} style={{ marginLeft: 150 }} valueStyle={{ fontSize: 50 }}/>
        </div>
      </Col>
      <Col span={12} >
        <div style={{ height: 400, padding: 20 }} >

        </div>
      </Col>
    </Row>
  );
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
        </List.Item>
      )}
    />
  );
};
