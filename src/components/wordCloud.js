import React, { Component } from 'react';
import { withRouter } from "react-router";
import axios from 'axios'
export class wordCloud extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text:'',
            imageUrl:''
        }
    }

    componentDidMount() {
        axios.get('https://rjge7dn3y4.execute-api.us-east-1.amazonaws.com/default/getreviews').then(resposne =>{
            console.log(resposne.data)
            this.setState({text:resposne.data})
            axios.post('http://localhost:5000/wordcloud/data',this.state).then(resposne=>{
                console.log(resposne.data)
                this.setState({imageUrl:resposne.data})
            })
        })
    }
    render() {
        return (
            <div>
                <img src={this.state.imageUrl} />
            </div>
        )}
}
export default withRouter(wordCloud);