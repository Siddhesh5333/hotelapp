import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar.jsx'

const gridStyle = {
  width: '100%',
  textAlign: 'center',
};

const Login = () => {
  const navigate = useNavigate(); 

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    navigate('/Rooms'); 
  };

  return (
    <div>
      <Navbar/>
     
      <Card title="Login Page">
        <Card.Grid style={gridStyle}>
          <div className="container">
            <div className="login">
              <h2>Login Form</h2>
              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  label="Enter Username or Email"
                  rules={[{ required: true, message: 'Please input your username or email!' }]}
                >
                  <Input placeholder="Username or Email" />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  label="Enter Password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Enter Password" />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Card.Grid>
      </Card>
    </div>
  );
};

export default Login;
