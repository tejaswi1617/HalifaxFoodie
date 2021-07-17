import { Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';


import '../src/main.css'

function App() {
    return (
        <>
        <Router> 
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Signup}/>

            </Switch>
        </Router>
        
        </>
    )
};


export default App;