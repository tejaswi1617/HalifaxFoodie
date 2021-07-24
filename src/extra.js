import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, setState } from 'react';

function App() {
  

  const [errors, seterrors] = useState({
    // firstName: "", 
    // email: "",
    // lastName: ""
  })



  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [])


  const validNameRegex = RegExp(/^[a-zA-Z0-9]+$/);
  const validEmailRegex = RegExp(
    // /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  );
  const validateName = (value) => {

    if (!validNameRegex.test(value)) {
      return true
    }
    return false
  }

  const passwordValidation = (value) => {
    if (password === confirmPassword)
    {
      return true
    }
    return false
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(">>>>>>>>>>>>>", event.target.value)
    //const errors = {};
    //let errors = {name:"",email:""};
    //  let errors = {firstName:"",lastName:"",email:""};
    switch (name) {
      case 'firstName':
        setfirstName(value);
        errors.firstName =
          validateName(value)
            ? 'First Name must be alphanumeric'
            : '';

        break;
      case 'lastName':
        setlastName(value);
        errors.lastName =
          validateName(value)
            ? 'last Name must be alphanumeric'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? 'Email is not valid!'
            : '';
        break;
      case 'password':
      setpassword(value)  
      errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
      break;
      case 'confirmPassword':
        setconfirmPassword(value)
        errors.confirmPassword =
          passwordValidation(value)
            ? ''
            : 'Password must be same';

        break;
      default:
        break;
    }
    console.log('error brfore :  ', errors)
    seterrors({ ...errors, errors });
    console.log('error:  ', errors)
  }

  const onSubmitForm = (e) => {
    localStorage.setItem('firstName: ',firstName)
    localStorage.setItem('lastName: ',lastName)

  }
  return (
    <div className="App">
      <div className="lg:w-1/2 pl-8 pr-3 m-pl-0 t-mt-2 t-pl-0 t-pr-0 m-pr-0">
        <div className="contact-box">
          {/* <form> */}
            <form onSubmit={(e) => onSubmitForm(e)}>

            First Name:
            <div className="md:flex">
              <div className="md:w-1/2 pl-3 pr-3 m-mb-1">
                <input className="cus-form-control" type="text" name="firstName" onChange={(e) => handleChange(e)} placeholder="First Name" required />
              </div>
              {errors?.firstName?.length > 0 &&
                <span className='error'>{errors.firstName}</span>}
              LastName: 
              <div className="md:w-1/2 pl-3 pr-3">
                <input className="cus-form-control" type="name" name="lastName" onChange={(e) => handleChange(e)} placeholder="Last Name" required />
              </div>
              {errors?.lastName?.length > 0 &&
                <span className='error'>{errors.lastName}</span>}
            </div>
            Email:
            <div className="md:flex">
              <div className="md:w-full pl-3 pr-3">
                <input className="cus-form-control" type="text" onChange={(e) => handleChange(e)} placeholder="Your Email Address" required />
              </div>
              {errors?.email?.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            Password:
            <input className="cus-form-control" type="password" onChange={(e) => handleChange(e)} placeholder="Password" required />
            {errors?.password?.length > 0 &&
                <span className='error'>{errors.password}</span>}
            Confim Password:
            <input className="cus-form-control" type="confirmPassword" onChange={(e) => handleChange(e)} placeholder="Confirm" required />
            {errors?.confirmPassword?.length > 0 &&
                <span className='error'>{errors.confirmPassword}</span>}

            <input type = "Submit"></input>
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;



// import React from 'react';

// const validEmailRegex = RegExp(
//   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// );
// const validateForm = errors => {
//   let valid = true;
//   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
//   return valid;
// };

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fullName: null,
//       email: null,
//       password: null,
//       errors: {
//         fullName: '',
//         email: '',
//         password: '',
//       }
//     };
//   }

//   handleChange = (event) => {
//     event.preventDefault();
//     const { name, value } = event.target;
//     let errors = this.state.errors;

//     switch (name) {
//       case 'fullName': 
//         errors.fullName = 
//           value.length < 5
//             ? 'Full Name must be at least 5 characters long!'
//             : '';
//         break;
//       case 'email': 
//         errors.email = 
//           validEmailRegex.test(value)
//             ? ''
//             : 'Email is not valid!';
//         break;
//       case 'password': 
//         errors.password = 
//           value.length < 8
//             ? 'Password must be at least 8 characters long!'
//             : '';
//         break;
//       default:
//         break;
//     }

//     this.setState({errors, [name]: value});
//     console.log('errors',errors);
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     if(validateForm(this.state.errors)) {
//       console.info('Valid Form')
//     }else{
//       console.error('Invalid Form')
//     }
//   }

//   render() {
//     const {errors} = this.state;
//     return (
//       <div className='wrapper'>
//         <div className='form-wrapper'>
//           <h2>Create Account</h2>
//           <form onSubmit={this.handleSubmit} noValidate>
//             <div className='fullName'>
//               <label htmlFor="fullName">Full Name</label>
//               <input type='text' name='fullName' onChange={this.handleChange} noValidate />
//               {errors.fullName.length > 0 && 
//                 <span className='error'>{errors.fullName}</span>}
//             </div>
//             <div className='email'>
//               <label htmlFor="email">Email</label>
//               <input type='email' name='email' onChange={this.handleChange} noValidate />
//               {errors.email.length > 0 && 
//                 <span className='error'>{errors.email}</span>}
//             </div>
//             <div className='password'>
//               <label htmlFor="password">Password</label>
//               <input type='password' name='password' onChange={this.handleChange} noValidate />
//               {errors.password.length > 0 && 
//                 <span className='error'>{errors.password}</span>}
//             </div>
//             <div className='submit'>
//               <button>Create</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
