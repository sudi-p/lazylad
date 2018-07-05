import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Icon
} from 'antd';
import './styles/IndividualDishSave.Module.css'

const { TextArea } = Input;
const FormItem = Form.Item;

let uuid = 0;
class IndividualDishSave extends Component{
  constructor(){
    super();
    this.state = {
      dish_info:{
        'short_description': '',
        'long_description': '',
        'ingredients': [], 
      }
    }
  }
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit= (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let dish_info = this.state.dish_info
        dish_info.short_description = values.short_description
        dish_info.long_description = values.long_description
        if (values.ingredients){
          dish_info.ingredients = values.ingredients
        }
        this.setState({dish_info: dish_info})
        console.log(this.state)
        this.props.addDishInfo(dish_info);
      }
    });
  }
  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
     const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'ingredients' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`ingredients[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input ingredient's name or delete this field.",
            }],
          })(
            <Input placeholder="ingredient name" style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit= {this.handleSubmit}>
        <FormItem
          label="Two words to describe your dish(less than twenty letters)"
        >
          {getFieldDecorator('short_description', {
            rules: [{
              required: true,
              message: 'Please describe your dish!',
              max: 20
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="Dish Description"
        >
          {getFieldDecorator('long_description', {
            rules: [{
              required: true, message: 'Please input the description for the dish!',
            }],
          })(
            <TextArea rows={6}/>
          )}
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add ingredient
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large">
            Create Dish
          </Button>
          &nbsp;
          <Link to="/dishes/">
            <Button type="default" size="large">
              Skip this step for now.
            </Button>
          </Link>
        </FormItem>
      </Form>
    )
  }
}

const WrappedApp = Form.create()(IndividualDishSave);

export default WrappedApp