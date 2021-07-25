import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import db from '../firebase'
import { NavLink, useHistory } from 'react-router-dom';


export default function Question() {

    const history = useHistory()

    const [answer, setanswer] = useState("")
    const [question, setquestion] = useState("What is Your Nickname?")
    const [email, setemail] = useState("")
    const [setQuestion, setsetQuestion] = useState()
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(async () => {
        let dbUser;

        !JSON.parse(localStorage.getItem("IsQuestion")) &&
            await Auth.currentUserPoolUser().then((obj) => {

                const user = {
                    username: obj.username,
                    email: obj.attributes.email,

                }
                console.log(obj);
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("IsQuestion", false)
            })

        const user = JSON.parse(localStorage.getItem("user"))
        console.log("u1: ", user)
        const users = await db.collection("users")
        const userData = await users.where('username', '==', user.username).get()
        console.log("err", userData)
        
        userData.forEach(doc => {
            console.log("data", doc.data())
            dbUser = doc.data()
        })
        if (dbUser) {
            setsetQuestion(true)
        }
        else {
            setsetQuestion(false)
        }

    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        
        if (setQuestion) {


            const user = JSON.parse(localStorage.getItem("user"))
            let dbUser = {}

            const users = await db.collection("users")
            const userData = await users.where('username', '==', user.username).get()

            userData.forEach(doc => {
                console.log("data", doc.data())
                dbUser = doc.data()
            })


            if (dbUser.answer) {
                if (answer === dbUser?.answer) {
                    localStorage.setItem("IsQuestion", true)
                    window.location.reload()
                } else {
                    alert("invalid answer")
                }
            }
        } else {


            await Auth.currentAuthenticatedUser().then((obj) => {

                const user = {
                    username: obj.username,
                    email: obj.attributes.email,
                    question: question,
                    answer: answer
                }

                console.log("user:", user)
                db.collection('users').add(user)
                    .then((doc) => {
                        console.log("data Submitted Successfully.")
                        localStorage.setItem("IsQuestion", true)
                        // history.push("/")
                        window.location.reload()
                    })
                    .catch((err) => {
                        console.error("error:", err)
                    })
            }
            )
        }
    }


    return (
        <>
            {console.log("local :", JSON.parse(localStorage.getItem("user")))}
            <div className="all-content-center">
                <div className="container">
                    <div className="center-box">
                        <div className="main-box">
                            <form onSubmit={(e) => onSubmitForm(e)}>
                                <div className="heading-text">
                                    {setQuestion ?
                                        <h1> Multi-Factor Authentication</h1> : <h1> Set Up Multi-Factor Authentication</h1>}
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
