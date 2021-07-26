
 import React, { Component } from 'react';
 import { withRouter } from "react-router";
 import { Container, Col, Row, Button } from 'react-bootstrap'
 import { Card } from 'react-bootstrap';
 import axios from 'axios'
 import "./order.css";

 export class orderPage extends Component {
 
     constructor(props) {
         super(props)
         this.state = {
			 user: JSON.parse(localStorage.getItem("user"))
             food: [],
             recommandation: []
         }
 
     }
 
     componentDidMount() {
         axios.post('https://ajrx3u87zg.execute-api.us-east-1.amazonaws.com/default/recommandation','vv219484').then(resposne =>{
             console.log(resposne.data[0]['food'])
             console.log(resposne.data[0]['recommandation'])
             this.setState({food:resposne.data[0]['food'],recommandation:resposne.data[0]['recommandation']})
            
         })
     }
     orderitem (row){
       
        const url = 'https://gzo7e4bb6i.execute-api.us-east-1.amazonaws.com/default/addInDb?'+'foodName'+'='+row['foodName']+'&'+'foodId'+'='+row['foodId']+'&'+
        'price='+ row['price']+'&'+'ingredient='+ row['ingredient']+'&'+'userName=Vivek123' +'&'+'orderId=123'
        axios.post(url).then(resposne =>{
            if(resposne){
                alert("Ordered "+row['foodName'] +" Successfully")
                this.props.history.push('/giveratings')
            }
        })

     }
     
     render() {
         return (
            <Container>
            <Row className="to-do-list-items">
                <Col md={12} lg={6} >
                    <div>
                        <h1>Order Your Food</h1>
                        {this.state.food.map(row => (
                            <Card className="card-content-incomplete">
                                <Row className="card-item">
                                    <Col xs={3} md={7} className="card-item-content">
                                        <Card.Body>
                                            <Card.Title>Food: {row.foodName}</Card.Title>
                                            <Card.Title>Price: ${row.price}</Card.Title>
                                            <Card.Title>Restaurant: {row.restaurantName}</Card.Title>
                                            <Card.Title>Ingredients: {row.ingredient}</Card.Title>
                                        </Card.Body>
                                    </Col>
                                    <Col xs={3} md={3} className="card-item-content">
                                        <Button className="add-button" onClick={() => this.orderitem(row)}>Place Order</Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col md={12} lg={6}>
                    <div>
                        <h1>Recommanded Food</h1>
                        {this.state.recommandation.map(row => (
                            <Card>
                                <Card.Body>
                                    <Card.Title className="card-item-completed">{row.foodName}</Card.Title>
                                    <Card.Title className="card-item-completed">{row.price}</Card.Title>
                                    <Card.Title className="card-item-completed">{row.restaurantName}</Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
         )
 
     }
 }
 
 export default withRouter(orderPage);