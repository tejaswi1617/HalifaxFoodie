import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Container, Col, Row, Button, ThemeProvider } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import axios from 'axios'
export class giveRating extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
        axios.post('https://yex5gvxdk9.execute-api.us-east-1.amazonaws.com/default/addRatings',this.state.rating).then(resposne=>{
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
            <Row>
                <div>
                    <input type="text" palceholder="Add task" name="rating" value={this.state.rating} onChange={this.onValueChange} />
                </div>
                <div className="add-button">
                    <Button className="primary-button add-button" onClick={this.saveItem}>Submit</Button>
                    <Button className="primary-button add-button" onClick={this.cancel}>Cancel</Button>
                </div>
            </Row>
        )
    }
}
export default withRouter(giveRating);