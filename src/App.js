import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Chatbot from './components/Chatbot';
import Order from './components/orderPage';
import GiveRating from './components/giveRating';
import PubSubChat from './components/pubsub';
import WordCloud from './components/wordCloud';
// import UserPool from './UserPool'


import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import '../src/main.css'
import Question from './components/Question';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import db from './firebase';

function App() {

   
    useEffect(async () => {

    //     debugger
    //    !JSON.parse( localStorage.getItem("IsQuestion")) &&
    //         await Auth.currentAuthenticatedUser().then((obj) => {
            
    //             const user = {
    //                 username: obj.username,
    //                 email: obj.attributes.email,

    //             }
    //             console.log(obj);
    //             debugger
    //             localStorage.setItem("user", JSON.stringify(user))
    //             localStorage.setItem("IsQuestion", false)
    //         })
    }, [])
    return (
        <>
        {console.log(">>>",JSON.parse(localStorage.getItem("IsQuestion")))}
            {!JSON.parse(localStorage.getItem("IsQuestion")) ?
                <Router>
                    <Switch>
                        <Route exact path="/" component={Question} />
                        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
                    </Switch>
                </Router>
                :
                <Router>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/register" component={Signup} />
                        <Route exact path="/pubsub" component={PubSubChat} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/profile/:id" component={Profile} />
                        <Route exact path="/question" component={Question} />
                        <Route exact path="/chatbot" component={Chatbot} />
                        <Route exact path="/order" component={Order} />
						<Route exact path="/giveratings" component={GiveRating}/>
						<Route exact path="/wordcloud" component={WordCloud}/>
                    </Switch>
                </Router>

            }
        </>
    )
};


export default withAuthenticator(App);