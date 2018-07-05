import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, InputNumber, Button } from 'antd';
import { Row, Col } from 'antd';
const FormItem = Form.Item;

class AddDishHeader extends Component{

  render(){
    return(
      <Row>
        <Col span={9}><h1>Create a New Dish</h1></Col>
        <Col span={10}></Col>
        <Col span={4}>
          <Link to ="/dishes/">
            <Button type="primary">Cancel</Button>
          </Link>
        </Col>
      </Row>
    );
  }
}

class AddDish extends Component{
  
  constructor(){
    super();
    this.state ={
      newDish: {
        'dish_name':'',
        'price':''
      }
    }
  }
  handleSubmit= (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newDish = this.state.newDish
        newDish.dish_name = values.dish_name
        newDish.price = values.price
        this.setState({newDish: newDish})
        this.props.AddDish(this.state)
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div>
        <AddDishHeader />
        <hr/>
        <Form onSubmit={this.handleSubmit}> 
          <FormItem
            label="Dish Name"
          >
            {getFieldDecorator('dish_name', {
              rules: [{
                required: true, message: 'Please input your dish name!',
              }],
            })(
              <Input />
            )}
          </FormItem>
       
          <FormItem 
            label="Price (in $)">
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Price of dish is required!!' }],
            })(
              <InputNumber min= {0} />
            )}
          </FormItem>
                  
          <FormItem >
            <Button type="primary" htmlType="submit" size="large">
              Create Dish
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedApp = Form.create()(AddDish);

export default WrappedApp;