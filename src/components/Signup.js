import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserPool from '../UserPool';

import { Auth } from 'aws-amplify';

export default function Signup() {

    const history = useHistory();

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")
    const [userRole, setuserRole] = useState("user")
    const [confirmationCode, setconfirmationCode] = useState("")

    const [isSignedUp, setisSignedUp] = useState(false)

    const [error, seterror] = useState()

    const onSubmitForm = (e) => {
        // history.push("/Dashboard");
        //setisValid(true)
        e.preventDefault()
        console.log("email", email)
        console.log("password", password)

        if (!isSignedUp) {
            Auth.signUp({
                username: username,
                password: password,
                attributes: {
                    email: email,
                   "custom:userRole": userRole
                }
            }).then((obj) => {
                setisSignedUp(true)
            })
                .catch((err) => { console.log("Error: ", err) })
        } else {
            Auth.confirmSignUp(username, confirmationCode)
                .then(() => {
                    history.push("/dashboard")
                })
        }


        // axios.post('https://tutorial4-api.herokuapp.com/api/users/login', {
        //     email: email,
        //     password: password
        //   })
        //   .then((response) => {
        //     if(response.data.status === true) {
        //         history.push("/dashboard")
        //     }
        //     else {
        //         seterror("Username/Password Not valid")
        //     } 
        //     console.log(response);
        //   }, (error) => {
        //     console.log(error);
        //   });
        // UserPool.signUp(email, password, null, (err,data)=>{
        //     if (err) {
        //         console.error(err);
        //         seterror(err.message)
        //     } 
        //     console.log(data)
        // });



    };



    return (
        <>
            <div className="all-content-center">
                <div className="container">
                    <div className="center-box">
                        <div className="main-box">
                            {!isSignedUp ?
                                <>
                                    <form onSubmit={(e) => onSubmitForm(e)}>
                                        <div className="heading-text">
                                            <h1> Signup Form</h1>
                                        </div>

                                        <div className="cus-form form-top-space">
                                            <span>Username</span>
                                            <input className="input-design top-space" type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Your Username" />
                                        </div>
                                        <div className="cus-form form-top-space">
                                            <span>Email</span>
                                            <input className="input-design top-space" type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Your Email Address" />
                                        </div>
                                        <div className="cus-form form-top-space">
                                            <span>Role</span>
                                            <input className="input-design top-space" type="text" value={userRole} onChange={(e) => setuserRole(e.target.value)} placeholder="Your Role" />
                                        </div>
                                        <div className="cus-form form-top-space">
                                            <span>Password</span>
                                            <input className="input-design top-space" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
                                        </div>
                                        {
                                            error
                                        }
                                        <div className=" form-top-space">
                                            <button type="submit">Submit</button>

                                        </div>
                                    </form></> :
                                     <><form onSubmit={(e) => onSubmitForm(e)}>
                                        <div className="heading-text">
                                            <h1> Confirm Sign Form</h1>
                                        </div>

                                        <div className="cus-form form-top-space">
                                            <span>Username</span>
                                            <input className="input-design top-space" type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Your Username" />
                                        </div>
                                       
                                        <div className="cus-form form-top-space">
                                            <span>Confiramtion code</span>
                                            <input className="input-design top-space" type="password" value={confirmationCode} onChange={(e) => setconfirmationCode(e.target.value)} placeholder="Code" />
                                        </div>
                                        {
                                            error
                                        }
                                        <div className=" form-top-space">
                                            <button type="submit">Submit</button>

                                        </div>
                                    </form></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}