import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

export default function Question() {
    const [answer, setanswer] = useState("")
    const [email, setemail] = useState("")
    
    const onSubmitForm = async (e)=> {
        e.preventdefault()
    }


    return (
        <>
            <div className="all-content-center">
                <div className="container">
                    <div className="center-box">
                        <div className="main-box">
                            <form onSubmit={(e) => onSubmitForm(e)}>
                                <div className="heading-text">
                                    <h1> Multi-Factor Authentication</h1>
                                </div>

                                <div className="cus-form form-top-space">
                                    <span>What is Your nickname?</span>
                                    <input className="input-design top-space" type="text" value={answer} onChange={(e) => setanswer(e.target.value)} placeholder="Your Answer" />
                                </div>

                                <div className="cus-form form-top-space">
                                    <button type="submit">Submit</button>

                                </div>



                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
