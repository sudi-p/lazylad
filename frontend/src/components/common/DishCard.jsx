import React, { Component } from 'react';
import{
  Row,
  Col,
  Card,
  Modal,
  Divider
} from 'antd';
import '../styles/DishCard.module.css';

class DishCard extends Component{
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  
  render(){
    const image_url = this.props.image_url
    const id = this.props.id
    const is_vegeterian = this.props.is_vegeterian
    const dish_name = this.props.dish_name
    const description = this.props.description
    const calorie = this.props.calorie
    const card_cover = {
      'backgroundImage': 'url('+image_url+')'
    };
    let vegeterian = ""
    let dish_type = "Non Vegeterian"
    let footer_color = {
      'color': 'red'
    }
    if (is_vegeterian){
      vegeterian = "Vegeterian"
      dish_type= "Vegeterian"
      footer_color = {
        'color': 'green'
      }
    }
    return(
      <div key={id}>
        <Card
          hoverable
          className="dish_card"
          onClick={this.showModal}
        >
          <div style={card_cover} className="card-cover"></div>
          <div className="text-wrapper">
            <div className="dish">{dish_name}</div>
            <div className="description-wrapper">{description}</div>
          </div>
          <Divider />
          <div className="card-footer">
            <p style={footer_color}>{vegeterian} {calorie} Cal</p>
            <p  className="view-more">VIEW DETAILS</p>
          </div>
        </Card>
        <Modal
          title={dish_name}
          style={{ top: 100 }}
          visible={this.state.visible}
          footer={null}
          closable={false}
          className="dish-modal"
        >
          <Row type="flex" justify="start">
            <Col span={12}>
              <div style={card_cover} className="modal_image"></div>
            </Col>
            <Col span={12}>
              <div className="modal-info-wrapper">
                <p>
                <p><span className="title">Type: </span>{dish_type}</p>
                <span className="title">Calorie:</span> {calorie} Cal</p>
                <p><span className="title">Description:</span>  {description}</p>
                <p><span className="title">Ingeridents:</span></p>
              </div>
            </Col>
          </Row>
          <button onClick={this.handleOk} className="ok">Ok</button>
        </Modal>
      </div>
    )
  }
}

export default DishCard