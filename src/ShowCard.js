import React, { useState } from 'react';


import { Modal, Card, Avatar, Layout, Comment } from 'antd'; 

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
        title='event title'
        centered
        width={800}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Layout
          style={{
            backgroundColor: 'white'
          }}
        >
          <Layout.Sider
            width={350}
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <Layout
              width={350}
              height={90}
              style={{
                backgroundColor: 'transparent'
              }}
            >
              <Layout.Sider
                width={90}
                style={{
                  backgroundColor: 'transparent'
                }}
              >
                <Avatar
                  src={avatar}
                  size={70}
                />
              </Layout.Sider>
              <p
                style={{
                  //fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                
              </p>
              
              <p>
                <b>binibin</b><br />
                13XXXXXXXXX<br />
                gold level
              </p>
            </Layout>

            <p
              style={{
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
              event intro: 
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
            <img src={swain} alt='swain' width={400} />


          </Layout.Content>
        </Layout>
      </Modal>
    </>
  )
}
  