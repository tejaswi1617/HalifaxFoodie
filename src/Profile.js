import React, { useEffect, useState } from 'react';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'reactstrap';

export default function Profile() {
    let { id } = useParams();
    useEffect(() => {
        getUseDetails()
    }, [])

    const [Data, setData] = useState()

    const getUseDetails = async () => {
        await axios.get(`https://tutorial4-api.herokuapp.com/api/users/${id}`)
            .then((response) => {
                console.log("response data in Profile: ", response.data.data)
                setData(response.data.data)
            })
    }

    return (
        <>
            <div className="all-content-center">
                <div className="main-dbox">

                    <img src={Data?.picture}></img><br />
                    <span><b>First Name: </b></span>
                    {Data?.title} {Data?.firstName}<br />
                    <span><b>Last Name:</b> </span>
                    {Data?.lastName} <br />
                    <span><b>Email: </b></span>
                    {Data?.email} <br/><br/>
                    <NavLink to="/dashboard">Back to Home</NavLink>
                </div>
            </div>
        </>
    )
}