import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
// import UserPool from './UserPool';


import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import '../src/main.css'
import Question from './components/Question';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

function App() {
    useEffect(async () => {

       !JSON.parse( localStorage.getItem("IsQuestion")) &&
            await Auth.currentAuthenticatedUser().then((obj) => {
                

                const user = {
                    username: obj.username,
                    email: obj.attributes.email,

                }
                console.log(obj);
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("IsQuestion", false)
            })
    }, [])
    return (
        <>
        {console.log(">>>",JSON.parse(localStorage.getItem("IsQuestion")))}
            {!JSON.parse(localStorage.getItem("IsQuestion")) ?
                <Router>
                    <Switch>
                        <Route exact path="/" component={Question} />

                    </Switch>
                </Router>
                :
                <Router>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/register" component={Signup} />

                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/profile/:id" component={Profile} />
                        <Route exact path="/question" component={Question} />

                    </Switch>
                </Router>

            }
        </>
    )
};


export default withAuthenticator(App);