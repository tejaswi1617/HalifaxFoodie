import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Container, Col, Row, Button, ThemeProvider } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import axios from 'axios'
export class giveRating extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            rating:''
        }
    }

    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    saveItem = (event) =>{
        event.preventDefault()
        const ratings = this.state.rating
        const username = this.state.user.username
        const url = 'https://yex5gvxdk9.execute-api.us-east-1.amazonaws.com/default/addRatings?username='+username+'&ratings='+ratings
        axios.post(url).then(resposne=>{
            console.log(resposne)
            this.cancel()
        })
        console.log("text",this.state.rating)
    }

    cancel = (e) =>{
        
        this.props.history.push('/order')
    }
    render() {
        return (
            <Row className="rating-content">
                <div>
                    <h2>Please give your feedback</h2>
                </div>
                <div>
                    <input type="text" palceholder="Add task" name="rating" value={this.state.rating} onChange={this.onValueChange} />
                </div>
                <div className="add-button">
                    <Button className="primary-button" onClick={this.saveItem}>Submit</Button>
                    <Button className="primary-button" onClick={this.cancel}>Cancel</Button>
                </div>
            </Row>
        )
    }
}
export default withRouter(giveRating);