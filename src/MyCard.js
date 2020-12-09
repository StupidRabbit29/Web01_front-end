import React, { useState } from 'react';

import 'antd/dist/antd.css';

import {} from "antd";


import { Button, Input, Form, Checkbox, message } from 'antd';
import { Link, Redirect, useHistory  } from 'react-router-dom';
import { GET } from './Network';

const MyCard = (props) => {


  /*
  let history = useHistory();

  const formSubmit = (values) => {
    // 用户验证
    GET(`/login/00`, (json) => {
      console.log(json);
    }, (errMsg) => {
      message.error(errMsg);
    })

    // 后期需要改成响应后端返回结果，也有可能是错误的登录
    if (true) {
      props.userVars.setUser(values.username);
      props.userVars.setEmail("test");
      props.userVars.setPhone("test");
      props.userVars.setUserType("1");
      props.userVars.setIsLogIn(true);
    };

    // 登录验证通过，允许跳转到主页面
    // const location = {
      // pathname: "/", 
      // state: {
      //   userName: values.username,
      //   userPassword: values.password
      // }
    // };
    history.push("/");
  };
  */
  


  return (
    <p></p>



  );
};

export default MyCard;
