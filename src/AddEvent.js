import React, { useState } from 'react';


import { Modal, Card, Avatar, Layout, Button, Upload } from 'antd'; 

import { Divider } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons'

import avatar from "./avatar.png";
import swain from "./swain.jpg";
//import Layout from 'antd/lib/layout/layout';


export const AddEvent = (props) => {
    
    
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
      <Button
        onClick={showModal}
        style={{
          marginLeft: 860
        }}
      >
        new
        <Divider type='vertical' />
        <PlusCircleOutlined />
      </Button>


      <Modal
        title={<div style={{fontSize: 20}}>Add new card</div>}
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
                
              </Layout.Sider>
              

            </Layout>

          </Layout.Sider>
          <Layout.Content>
            <img src={swain} alt='swain' width={450} />


          </Layout.Content>
        </Layout>
      </Modal>
    </>
  )
}
  