import React, { useState } from 'react';


import { Modal, Card, Avatar, Layout, Button } from 'antd'; 

import avatar from "./avatar.png";
import swain from "./swain.jpg";
//import Layout from 'antd/lib/layout/layout';


export const ShowCard = (props) => {
    
    
  const [value, setValue] = useState(0);


  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setValue(props.attr);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



    



  return (
    <>
      <Card
        hoverable
        onClick={showModal}
        style={{
          width: 320
        }}
        cover={
          <img
          src={swain}
          alt='swain'
          />
        }
      >
        <Card.Meta
          avatar={<Avatar src={avatar} />}
          // 此处应该加入省略排版
          title='The Noxian Grand General'
          description='League of Legends Champions'
        />
      </Card>
      <Modal
        title={<div style={{fontSize: 20}}>this is a title</div>}
        centered
        width={1000}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Apply
          </Button>,
        ]}
      >
        <Layout
          style={{
            backgroundColor: 'white'
          }}
        >
          <Layout.Sider
            width={500}
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <Layout
              width={500}
              height={100}
              style={{
                backgroundColor: 'transparent'
              }}
            >
              <Layout.Sider
                width={100}
                style={{
                  backgroundColor: 'transparent',
                  marginRight: 10
                }}
              >
                <Avatar
                  src={avatar}
                  size={90}
                />
              </Layout.Sider>
              
              <p
                style={{
                  fontSize: 18,
                }}
              >
                <b>binbin</b><br />
                13XXXXXXXXX<br />
                gold level
              </p>
            </Layout>

            <p
              style={{
                fontSize: 16,
                marginRight: 20
              }}
            >
              personal intro: 
              i am binbin. i love zhuzhu. 
              i am binbin. i love zhuzhu. 
              i am binbin. i love zhuzhu. <br />
              event number: 00{value}<br />
              date of start: 2020-12-9<br />
              date of end: 2020-12-15<br />
              event intro: <br />
              This is an event. This is an event.
              This is an event. This is an event.
              This is an event. This is an event.
              This is an event. This is an event.
              This is an event. This is an event.
              This is an event. This is an event.
              This is an event. This is an event.
            </p>

          </Layout.Sider>
          <Layout.Content>
            <img src={swain} alt='swain' width={450} />


          </Layout.Content>
        </Layout>
      </Modal>
    </>
  )
}
  