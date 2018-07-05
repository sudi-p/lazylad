import React, { Component } from 'react';
import {
  Form,
  Input,
} from 'antd';
import "./styles/LogIn.Module.css";

const FormItem = Form.Item;

class LogInForm extends Component{
  constructor(){
    super()
    this.state = {
      zipcode_error: ""
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="form">
          <span className="form-item__label">EMAIL</span>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email', message: 'The input is not valid E-mail!',
                },
                { 
                  required: true, message: 'Email is required!'
                }
              ],
            })(
              <Input size="large" />
            )}
          </FormItem>

          <span className="form-item__label">Password</span>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password is required!' }],
            })(
              <Input size="large" type="password" placeholder= "6 characters or more "/>
            )}
          </FormItem>
          <FormItem>
            <center>
              <button type="submit" className="button blue_button">Log in</button>
            </center>
          </FormItem>
        </Form>
      </div>
    );
  }

}
const WrappedLogInForm = Form.create()(LogInForm);

export default WrappedLogInForm