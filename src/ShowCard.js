import React, { useState, useEffect } from 'react';
import { Space, Card, Modal, Descriptions, Badge, Avatar, Spin, Popover, message, Layout, Button, Typography, Row, Col, Input, List, Upload } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { GET, POST } from './Network';

import { Select, Form, DatePicker, InputNumber } from 'antd'

import avatar from "./avatar.png";
import swain from "./swain.jpg";
import moment from 'moment';

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



export const ShowCard = (props) => {
  const [callupList, setCallupList] = useState([]);
  const [detail, setDetail] = useState({ id: '' });
  const [requests, setRequests] = useState([]);
  const [myReq, setMyReq] = useState({ user_id: '' });
  const [newDescription, setNewDescription] = useState("");
  const [applyVisible1, setApplyVisible1] = useState(false);
  const [applyVisible2, setApplyVisible2] = useState(false);
  const [applyVisible3, setApplyVisible3] = useState(false);
  const [changeCallUp, setChangeCallUp] = useState(false);
  const { Paragraph } = Typography;
  const { TextArea } = Input;

  const getCallup = () => {
    GET('/calluplist',
      (json) => {
        const newCallupList = [];
        json.callupinfo.forEach((callup, index) => {
          if (index % 4 === 0)
            newCallupList.push([]);
          newCallupList[newCallupList.length - 1].push(callup);
        })
        setCallupList(newCallupList);
      },
      (errMsg) => message.error(errMsg)
    );
  };

  useEffect(getCallup, []);

  const showDetail = (callup) => {
    setMyReq({ user_id: '' });
    for (let i = 0; i < callup.requests.length; i++) {
      if (callup.requests[i].user_name === props.userVars.user) {
        setMyReq(callup.requests[i]);
      }
    }
    setRequests(callup.requests);
    setDetail(callup);
  };


  const callupCards = callupList.map((callupGroup, group_idx) => (
    <Space key={group_idx} size={50} >
      {
        callupGroup.map((callup) => (
          <Card
            key={callup.id}
            hoverable
            onClick={(e) => {
              showDetail(callup);
              // e.stopPropagation();
            }}
            style={{ width: 320 }}
            cover={ <img src={swain} alt='swain' /> }
          >
            <Card.Meta
              title={ <Paragraph >{callup.name}</Paragraph> }
              description={ <Paragraph ellipsis={{ rows: 1 }}>{callup.description}</Paragraph> }
            />
          </Card>
        ))
      }
    </Space>
  ));




  const [form] = Form.useForm();

  const showChangeCallUp = () => {
    form.setFieldsValue({
      "title": detail.name,
      "type": String(detail.type),
      "endtime": moment(detail.end_time),
      "population": detail.member,
      "description": detail.description,
    })
    setChangeCallUp(true);
  };

  const changeSubmit = (values) => {
    console.log(values);
    const payload = {
      'id': `${detail.id}`, 
      'title': values.title,
      'type': values.type,
      'endtime': values.endtime.format('YYYY-MM-DD'),
      'description': values.description,
      'population': `${values.population}`,
      'img': 'no image',
    };
    console.log(payload);

    POST('/changecallup', payload, (json) => {
      message.success("Call up changed successfully!")
    }, (errMsg) => {
      message.error(errMsg);
      //form.resetFields();
    });
    handleOk();
  };

  const handleCancel = () => {
    setChangeCallUp(false);
    setDetail({ id: '' });
  };
  const handleOk = () => {
    setChangeCallUp(false);
    setDetail({ id: '' });
  };

  var d = new Date().format('yyyy-MM-dd'); 
  function disabledDate(current) {
    return current.format('YYYY-MM-DD') < d;
  }



  return (
    <>
      <Space className='main-col' align='center' direction='vertical' size={50} >
        {callupCards}
      </Space>
      <Modal
        centered
        width={1000}
        visible={detail.id}
        destroyOnClose={true}
        onCancel={() => setDetail({ id: '' })}
        title={
          <p style={{ fontSize: 30 }} >
            {detail.name}
          </p>
        }
        footer={[
          <Button key="back" type="primary" onClick={() => setDetail({ id: '' })}>
            Return
          </Button>
        ]}
      >
        <Spin spinning={!detail.id} >
          <Descriptions bordered >
            <Descriptions.Item label="召集令描述" span={3} >
              {detail.description}
            </Descriptions.Item>
            <Descriptions.Item label="发布者" >
              {detail.owner}
            </Descriptions.Item>
            <Descriptions.Item label="所在城市" >
              {detail.city}
            </Descriptions.Item>
            <Descriptions.Item label="招募人数" >
              {detail.member}
            </Descriptions.Item>
            <Descriptions.Item label="结束时间" >
              {detail.end_time}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间" >
              {detail.ctime}
            </Descriptions.Item>
            <Descriptions.Item label="修改时间" >
              {detail.mtime}
            </Descriptions.Item>
            <Descriptions.Item label="申请人数" >
              {requests.length}
            </Descriptions.Item>
            {detail.owner === props.userVars.user ?
              <Descriptions.Item label="管理申请" span={2} >
                {requests.length > 0 ?
                  <Button type="primary" shape="round" onClick={()=>setApplyVisible1(true)} >
                    管理用户申请
                  </Button> :
                  <>
                    还没有用户申请!
                    <Button type='primary' shape='round' onClick={showChangeCallUp}
                    style={{marginLeft:30}}>修改召集令</Button>
                  </>
                }
              </Descriptions.Item> :
              <Descriptions.Item label="申请" span={2} >
                {myReq.user_id ?
                  <Row align="middle">
                    <Col span={5} >
                      {"todo 申请"}
                    </Col>
                    <Col offset={1} span={5} >
                      <Button type="primary" shape="round" onClick={()=>setApplyVisible2(true)} >
                        修改申请
                      </Button>
                    </Col>
                  </Row> :
                  <Button type="primary" shape="round" onClick={()=>setApplyVisible3(true)} >
                    申请
                  </Button>
                }
              </Descriptions.Item>
            }
          </Descriptions>
        </Spin>
      </Modal>
      <Modal
        centered
        width={600}
        visible={applyVisible3}
        destroyOnClose={true}
        onCancel={() => {
          setApplyVisible3(false);
          setDetail({ id: '' });
          setNewDescription("");
        }}
        title={
          <p style={{ fontSize: 30 }} >
            {"召集令申请"}
          </p>
        }
        footer={[
          <Button key="back" type="primary" onClick={() => {
            setApplyVisible3(false);
            setDetail({ id: '' });
            setNewDescription("");
          }}>
            Return
          </Button>
        ]}
      >
        <Row align="middle" gutter={[16, 24]} >
          <Col offset={2} span={4} >
            <p style={{ margin:0 }} >召集令</p>
          </Col>
          <Col offset={1} span={6} >
            <p style={{ margin:0 }} >{ detail.name }</p>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 24]} >
          <Col offset={2} span={4} >
            <p style={{ margin:0 }} >申请理由</p>
          </Col>
          <Col offset={1} span={8} >
            <TextArea onChange={(e) => {
              setNewDescription(e.target.value);
            }} />
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 24]} >
          <Col offset={7} span={4} >
            <Button type="primary" shape="round" onClick={() => {
              const payload = {
                id: detail.id,
                user: props.userVars.user,
                description: newDescription
              };
              console.log(payload);
              POST('/addreq', payload, (json) => {
                message.success("用户创建申请成功");
              }, (errMsg) => {
                message.error(errMsg);
              });
              setNewDescription("");
            }}>
              申请
            </Button>
          </Col>
        </Row>
      </Modal>
      <Modal
        centered
        width={600}
        visible={applyVisible2}
        destroyOnClose={true}
        onCancel={() => {
          setApplyVisible2(false);
          setDetail({ id: '' });
          setNewDescription("");
        }}
        title={
          <p style={{ fontSize: 30 }} >
            {"修改我的申请"}
          </p>
        }
        footer={[
          <Button key="back" type="primary" onClick={() => {
            setApplyVisible2(false);
            setDetail({ id: '' });
            setNewDescription("");
          }}>
            Return
          </Button>
        ]}
      >
        <Row align="middle" gutter={[16, 24]} >
          <Col offset={2} span={4} >
            <p style={{ margin:0 }} >召集令</p>
          </Col>
          <Col offset={1} span={6} >
            <p style={{ margin:0 }} >{ detail.name }</p>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 24]} >
          <Col offset={2} span={4} >
            <p style={{ margin:0 }} >申请理由</p>
          </Col>
          <Col offset={1} span={8} >
            <TextArea defaultValue={myReq.description} onChange={(e) => {
              setNewDescription(e.target.value);
            }} />
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 24]} >
          <Col offset={7} span={4} >
            <Button type="primary" shape="round" onClick={() => {
              const payload = {
                id: myReq.id,
                description: newDescription
              };
              POST('/changereq', payload, (json) => {
                message.success("用户修改申请成功");
              }, (errMsg) => {
                message.error(errMsg);
              });
              setNewDescription("");
            }}>
              修改申请
            </Button>
          </Col>
        </Row>
      </Modal>
      <Modal
        centered
        width={500}
        visible={applyVisible1}
        destroyOnClose={true}
        onCancel={() => {
          setApplyVisible1(false);
          setDetail({ id: '' });
        }}
        title={
          <p style={{ fontSize: 30 }} >
            {"管理用户申请"}
          </p>
        }
        footer={[
          <Button key="back" type="primary" onClick={() => {
            setApplyVisible1(false);
            setDetail({ id: '' });
          }}>
            Return
          </Button>
        ]}
      >
        <List
          itemLayout="horizontal"
          pagination={{ onChange: page => { console.log(page); }, pageSize: 4, }}
          dataSource={requests}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[
                <Button type="primary" shape="circle" onClick={() => {
                  const payload = {
                    id: item.id,
                    state: 2
                  }
                  POST('/managereq', payload, (json) => {
                    message.success("接受用户申请");
                  }, (errMsg) => {
                    message.error(errMsg);
                  })
                }} disabled={item.state === 2 || item.state === 4} >
                  <CheckOutlined />
                </Button> ,
                <Button shape="circle" onClick={() => {
                  const payload = {
                    id: item.id,
                    state: 3
                  };
                  POST('/managereq', payload, (json) => {
                    message.success("拒绝用户申请");
                  }, (errMsg) => {
                    message.error(errMsg);
                  });
                }} disabled={item.state === 3 || item.state === 4} >
                  <CloseOutlined />
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined style={{ fontSize: 20 }} />}
                title={
                  <p style={{ fontSize: 16, fontWeight: 'bold', margin: 0, padding: 0 }} >
                    {item.user_name}
                  </p>
                }
                description={
                  <p style={{ fontSize: 14, margin: 0, padding: 0 }} >
                    {item.description}
                  </p>
                }
                style={{ margin: 0, padding: 0, }}
              />
            </List.Item>
          )}
        />
      </Modal>



      

      

      
      <Modal
        title={<div style={{fontSize: 20}}>修改召集令</div>}
        centered
        width={910}
        visible={changeCallUp}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Form  name="changeCallUp" form={form} initialValues={{ remember: true }} onFinish={(values)=>changeSubmit(values)} preserve={false}>

          <Layout style={{backgroundColor: 'white', height: 300, marginTop: 15, marginLeft: 15 }} >
            <Layout style={{  backgroundColor: 'transparent',}} >
              <Layout.Sider width={550} style={{ backgroundColor: 'transparent' }} >
                <Layout width={450} style={{ backgroundColor: 'transparent' }} >
                  <Layout height={300} style={{ backgroundColor: 'transparent' }} >
                    <Layout.Sider width={380} style={{ backgroundColor: 'transparent', }} >
                      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]} >
                        <Input
                          placeholder="Title"
                          autoComplete="off"
                          style={{ width: 330, }}
                          // defaultValue={detail.name}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item name="type" rules={[{ required: true, message: 'Please choose the type!' }]}>
                        <Select style={{ width: 120, }}
                          // defaultValue={String(detail.type)}
                        >
                          <Select.Option value='1'>技术交流</Select.Option>
                          <Select.Option value='2'>学业探讨</Select.Option>
                          <Select.Option value='3'>社会实践</Select.Option>
                          <Select.Option value='4'>公益志愿</Select.Option>
                          <Select.Option value='5'>娱乐游玩</Select.Option>
                        </Select>
                      </Form.Item>
                    </Layout.Content>
                  </Layout>

                  <Layout height={300} style={{ backgroundColor: 'transparent', }} >
                    <Layout.Sider width={250} style={{ backgroundColor: 'transparent', }} >
                      <Form.Item name="endtime" rules={[{ required: true, message: 'Please input the end date!' }]} >
                        <DatePicker
                          placeholder='Finish date'
                          disabledDate={disabledDate}
                          inputReadOnly
                          style={{ width: 200 }}
                          // defaultValue={moment(detail.end_time)}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item name="population" rules={[{ required: true, message: 'Please input the person number!' }]} >
                        <InputNumber
                          min={1}
                          placeholder='Population'
                          style={{ width: 120 }}
                          // defaultValue={detail.member}
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
                      // defaultValue={detail.description}
                      style={{ width: 500, }}
                    />
                  </Form.Item>
                </Layout>
              </Layout.Sider>

              <Layout.Content>
                <Form.Item name="image" rules={[{ required: false, message: 'Please upload the event picture!' }]} >
                  {/* <Upload {...pppp}> */}
                  <Upload>
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

