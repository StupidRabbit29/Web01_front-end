import React, { useState } from 'react';


import { Modal, Layout, Button, Upload, message, Input, Select, DatePicker } from 'antd'; 

import { Divider, InputNumber, Form } from 'antd';

import { moment } from 'moment';

import { PlusCircleOutlined } from '@ant-design/icons'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import { Row, Col } from "antd";

import avatar from "./avatar.png";
import swain from "./swain.jpg";


import { GET, POST } from './Network';


import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined, EditOutlined } from '@ant-design/icons';



Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}



export const AddEvent = (props) => {
  
  var d = new Date().format('yyyy-MM-dd'); 
  function disabledDate(current) {
    return current.format('YYYY-MM-DD') < d;
  }

  const [form] = Form.useForm();

  const callUpSubmit = (values) => {
    console.log(values);
    const payload = {
      'username': props.userVars.user, 
      'title': values.title,
      'type': values.type,
      'endtime': values.endtime.format('YYYY-MM-DD'),
      'description': values.description,
      'population': `${values.population}`,
      'img': 'no image',
    };
    console.log(payload);

    POST('/addcallup', payload, (json) => {
      message.success("Call up added successfully!")
    }, (errMsg) => {
      message.error(errMsg);
      form.resetFields();
    });
    handleOk();
  };

  // const callUpSubmit = (values) => {
  //   //console.log(values);
  //   //console.log(values.image.fileList[0]);
  //   const payload = {
  //     'head': 'head',
  //     'title': values.title,
  //     'file': values.image.fileList[0],
  //   };
  //   console.log(payload);

  //   POST('/test', payload, (json) => {
  //     message.success("tested successfully!")
  //   }, (errMsg) => {
  //     message.error(errMsg);
  //     form.resetFields();
  //   });

  //   handleOk();
  // };



  



  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const pppp = {
    name: 'thisisafile',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    // onChange(info) {
    //   if (info.file.status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },

    // customRequest(file) {
    //   console.log(file);

    //   POST('/rec', file, (json) => {
    //     message.success("!!!!!!!!!!!!!!!!!!")
    //   }, (errMsg) => {
    //     message.error(errMsg);
    //   });
    // }
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
        width={910}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Form form={form} name="addCallUp" initialValues={{ remember: true }} onFinish={(values)=>callUpSubmit(values)} preserve={false}>

          <Layout
            style={{
              backgroundColor: 'white',
              height: 300,
              marginTop: 15,
              marginLeft: 15
            }}
          >
          
            <Layout
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Layout.Sider
                width={550}
                style={{
                  backgroundColor: 'transparent'
                }}
              >
                <Layout
                  width={450}
                  style={{
                    backgroundColor: 'transparent'
                  }}
                >
                  <Layout
                    height={300}
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Layout.Sider
                      width={380}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]} >
                        <Input
                          placeholder="Title"
                          autoComplete="off"
                          style={{
                            width: 330,
                          }}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item name="type" rules={[{ required: true, message: 'Please choose the type!' }]}>
                        <Select style={{ width: 120,}}>
                          <Select.Option value='1'>技术交流</Select.Option>
                          <Select.Option value='2'>学业探讨</Select.Option>
                          <Select.Option value='3'>社会实践</Select.Option>
                          <Select.Option value='4'>公益志愿</Select.Option>
                          <Select.Option value='5'>娱乐游玩</Select.Option>
                        </Select>
                      </Form.Item>
                    </Layout.Content>
                  </Layout>

                  <Layout
                    height={300}
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Layout.Sider
                      width={250}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Form.Item name="endtime" rules={[{ required: true, message: 'Please input the end date!' }]} >
                        <DatePicker
                          placeholder='Finish date'
                          disabledDate={disabledDate}
                          inputReadOnly
                          style={{
                            width: 200
                          }}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item name="population" rules={[{ required: true, message: 'Please input the person number!' }]} >
                        <InputNumber
                          min={1}
                          placeholder='Population'
                          style={{
                            width: 120
                          }}
                        />
                      </Form.Item>
                    </Layout.Content>
                  </Layout>
                  
                  <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]} >
                    <Input.TextArea
                      placeholder="Discription"
                      showCount
                      maxLength={140}
                      rows={4}
                      autoComplete="off"
                      style={{
                        width: 500,
                      }}
                    />
                  </Form.Item>

                </Layout>

              </Layout.Sider>

              <Layout.Content>
              
                <Form.Item name="image" rules={[{ required: false, message: 'Please upload the event picture!' }]} >
                  <Upload {...pppp}>
                    <Button icon={<UploadOutlined />}
                      style={{
                        width: 240,
                        height: 180
                      }}
                    >upload</Button>
                  </Upload>
                </Form.Item>
              </Layout.Content>
            </Layout>

            
            <Layout style={{backgroundColor: 'transparent'}}>
              <Row gutter={16} justify="end" style={{marginRight: 10}}>
                <Col>
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Col>

                <Col>
                  <Form.Item>
                    <Button key="submit" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>

              </Row>
              


            </Layout>

          </Layout>

        </Form>

      </Modal>
    </>
  )
}
  