import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap'
import LexChat from "react-lex";

export default function Dashboard() {

    // const [Data, setData] = useState()
    // const [AllData, setAllData] = useState()
    const history = useHistory();

    // useEffect(() => {
    //     getUseDetails()
    // }, [])

    // const getUseDetails = async () => {
    //     await axios.get('https://tutorial4-api.herokuapp.com/api/users')
    //         .then((response) => {
    //             console.log("response data: ", response.data.data)
    //             setData(response.data.data)
    //             setAllData(response.data.data)
    //         })
    // }

    // const viewProfile = async (id) => {

    //     await history.push(`/profile/${id}`);
    // }

    // const onFilter = (e)=> {
        
    //     let result =[];
    //     result = AllData.filter((filter) =>
    //         filter.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //         filter.lastName.toLowerCase().includes(e.target.value.toLowerCase()) )

    //     setData(result);
    // }
    const chatbot =() =>{
        history.push('/chatbot')
    }
    const orderitem =()=>{
        history.push('/order')
    }
    const wordcloud=()=>{
        history.push('/wordcloud')
    }
    const recipeUpload=()=>{
        history.push('/recipeupload')
    }
    const visual=()=>{
        history.push('/visualization')
    }
    const pubsub=()=>{
        history.push('/pubsub')
    }
    return (
        <div>
        <Row>
            <Col>
                <Button className="add-button" onClick={()=>chatbot()}>Chatbot</Button>
            </Col>
            <Col>
                <Button className="add-button" onClick={()=>orderitem()}>Order Page</Button>
            </Col>
            <Col>
                <Button className="add-button" onClick={()=>wordcloud()}>Word Cloud</Button>
            </Col>
            <Col>
                <Button className="add-button" onClick={()=>visual()}>Visualization</Button>
            </Col>
            <Col>
                <Button className="add-button" onClick={()=>recipeUpload()}>Recipe Upload</Button>
            </Col>
            <Col>
                <Button className="add-button" onClick={()=>pubsub()}>One to One Chat</Button>
            </Col>
        </Row>                            
<LexChat
      botName="HalifaxFoodie"
      IdentityPoolId="us-east-1:490d8d9b-4877-4f91-a06d-aee20121e312"
      placeholder="Placeholder text"
      backgroundColor="#FFFFFF"
      height="430px"
      region="us-east-1"
      headerText="Chat with our awesome bot"
      headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
      greeting={
        "Hello, how can I help? You can say things like 'help' to get more info"
      }
    />
            {/* <div className="all-content-center">
                <div className="ccontainer">
                    <div className="center-box">
                        <div className="main-dbox">
                            <div className="heading-text">
                                <h3>Hello</h3><br />
                                
                            </div>
                            <h2>Email</h2>
                        </div>
                    </div>
                </div>
            </div> */} 
            {/* <div className="mt-5 text-center">
                <form>
                Search:<input  type = "text" name="search" onChange = {(e)=>{onFilter(e)}} />
                </form>
            </div>
            <div className="w-80 m-5">
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Picture</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Data?.map((userData) => {
                                return (
                                    <tr class="cursor-pointer" onClick={() => viewProfile(userData.id)}>
                                        <td>{userData.title}</td>
                                        <td>{userData.firstName}</td>
                                        <td>{userData.lastName}</td>
                                        <td>{userData.email}</td>
                                        <td><img src={userData.picture}></img></td>
                                        <td><button onClick={() => viewProfile(userData.id)}>View</button></td>
                                    </tr>)

                            })
                        }
                    </tbody>
                </Table>
            </div>
 */}


    </div>
    )
}