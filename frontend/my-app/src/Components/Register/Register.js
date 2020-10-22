import React, {useState } from 'react';
import axios from 'axios';
import './Register.css'
import { Spring } from 'react-spring/renderprops'

function Register(props) {
  
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);

  //if username and email exists in database already
  const [emailError, setEmailError] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [usernameLengthError, setUsernameLengthError] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);


  //hooks for next part of registration
  const [nextPartCheck, setNextPartCheck] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  //hooks for checking input values
  const [inputUserCount, setinputUserCount] = useState(false);
  const [inputPassCount, setinputPassCount] = useState(false);
  const [inputEmailCount, setinputEmailCount] = useState(false);
  const [inputFnameCount, setinputFnameCount] = useState(false);
  const [inputLnameCount, setinputLnameCount] = useState(false);

  const countInput = (val, logpass) => {
    if (logpass === "login" && val.length >=1){
      setinputUserCount(true);
      if (usernameError) setUsernameError(false);
      if (usernameLengthError) setUsernameLengthError(false);
    } else if (logpass === "login" && val.length < 1){
      setinputUserCount(false);
    } 
    if (logpass === "password" && val.length >=1){
      setinputPassCount(true);
      if (passwordLengthError) setPasswordLengthError(false);
    } else if (logpass === "password" && val.length < 1){
      setinputPassCount(false);
    }
    if (logpass === "email" && val.length >=1){
      setinputEmailCount(true);
      if (emailError) setEmailError(false);
      if (emailInvalidError) setEmailInvalidError(false);
    } else if (logpass === "email" && val.length < 1){
      setinputEmailCount(false);
    }
    if (logpass === "fname" && val.length >=1){
      setinputFnameCount(true);
      if (firstnameError) setFirstnameError(false);
    } else if (logpass === "fname" && val.length < 1){
      setinputFnameCount(false);
    }
    if (logpass === "lname" && val.length >=1){
      setinputLnameCount(true);
      if (lastnameError) setLastnameError(false);
    } else if (logpass === "lname" && val.length < 1){
      setinputLnameCount(false);
    }
  }
  const errorHelper = () => {
    if(emailError){
      return "This email already exists. Are you sure you don't have an account with us already?";
    }
    else if(emailInvalidError){
      return "This email appears to be invalid.";
    }
    else if(usernameError){
      return "This username already exists.";
    }
    else if(passwordLengthError){
      return "Your password must be eight characters or longer.";
    }
    else if(usernameLengthError){
      return "Your username must be between 5 and 15 characters in length.";
    }
    else if(firstnameError){
      return "Your first name should be more than 2 characters in length.";
    }
    else if(lastnameError){
      return "Your last name should be more than 2 characters in length.";
    }
  }

  const toLoginChange = () => {
    props.switch()
  }
  const backButton = () => {
    setNextPartCheck(false);
  }

  const doRegister = () => {
    setSubmitBtn(true);
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/preregister",
    }).then((res) => {
      if (res.data.success) {
        setNextPartCheck(true);
      } else{
          if (res.data.reason === "emailexists"){
            setEmailError(true);
          }
          if (res.data.reason === "invalidemail"){
            setEmailInvalidError(true);
          }
          if (res.data.reason === "usernameexists"){
            setUsernameError(true);
          }
          if (res.data.reason === "usernamelength"){
            setUsernameLengthError(true);
          }
          if (res.data.reason === "passwordlength"){
            setPasswordLengthError(true);
          }
        }
      setSubmitBtn(false);
      });
  };

  const nowRegister = () => {
    setSubmitBtn(true);
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        firstname: firstname,
        lastname: lastname
      },
      withCredentials: true,
      url: "http://localhost:4000/api/register",
    }).then((res) => {
      if (res.data.success) {
        props.handleClose();
        window.location.reload();
      } else{
        if (res.data.reason === "firstnamelength"){
          setFirstnameError(true);
        }
        if (res.data.reason === "lastnamelength"){
          setLastnameError(true);
        }
      }
      setSubmitBtn(false);
      });
  };
  return (
    <Spring from={{opacity: 0}} to={{opacity:1}} config={{delay:100, duration:1000}}>
    {propsAni => (
      <div style={propsAni}>
        <i className={!nextPartCheck ? "user-modal-splash-image user-modal-x fas fa-times" : "user-modal-x display-none"} onClick={props.handleClose}></i>
        <i className={nextPartCheck ? "user-modal-splash-image backarrow fas fa-arrow-left" : "backarrow display-none"} onClick={backButton}></i>
        {/* <img className="user-modal-splash-image" src="img/wave.png"/> */}
        <div className="user-modal-main-container">
          <div className="user-modal-container">
            <div className="user-modal-img">
              <img src="images/map-connected.svg"/>
            </div>
            <div className="user-modal-login">
            {/* <form className="user-modal-form" action={props.ifLogin ? "/login":"/register"} method="POST"> */}
              <div className="user-modal-form">
                {/* <img src="images/login.png"/> */}
                <h2 className="user-modal-title">Plan your next trip.</h2>

                <div className={!nextPartCheck ? "display-none" : inputFnameCount ? firstnameError ? "user-modal-inputdiv fname focus error" : "user-modal-inputdiv fname focus" : "user-modal-inputdiv fname"}>
                  <div className="user-modal-i">
                    <i className="fas fa-user-tag"></i>
                  </div>
                  <div>
                    <h5>First Name</h5>
                    <input type="text" className="user-modal-input" maxLength="30" onChange={(val) => {setFirstname(val.target.value); countInput(val.target.value, "fname") }}/>
                  </div>
                </div>
                  
                <div className={!nextPartCheck ? "display-none" : inputLnameCount ? lastnameError ? "user-modal-inputdiv lname focus error" : "user-modal-inputdiv lname focus" : "user-modal-inputdiv lname"}>
                  <div className="user-modal-i">
                    <i className="fas fa-user-tag"></i>
                  </div>
                  <div>
                    <h5>Last Name</h5>
                    <input type="text" className="user-modal-input" maxLength="35" onChange={(val) => {setLastname(val.target.value); countInput(val.target.value, "lname") }}/>
                  </div>
                </div>


                  <div className={nextPartCheck ? "display-none" : inputEmailCount ? emailError || emailInvalidError ? "user-modal-inputdiv email focus error" : "user-modal-inputdiv email focus" : "user-modal-inputdiv email"}>
                    <div className="user-modal-i">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h5>Email</h5>
                      <input type="email" className="user-modal-input" onChange={(val) => {setRegisterEmail(val.target.value); countInput(val.target.value, "email") }}/>
                    </div>
                  </div>

                  <div className={nextPartCheck ? "display-none" : inputUserCount ? usernameError || usernameLengthError ? "user-modal-inputdiv username focus error" :"user-modal-inputdiv username focus" : "user-modal-inputdiv username"}>
                    <div className="user-modal-i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <h5>Username</h5>
                        <input type="text" className="user-modal-input" maxLength="15" onChange={(val) => {setRegisterUsername(val.target.value); countInput(val.target.value, "login")}}/>
                    </div>
                  </div>

                  <div className={nextPartCheck ? "display-none" : inputPassCount ? passwordLengthError ? "user-modal-inputdiv pass focus error" : "user-modal-inputdiv pass focus" : "user-modal-inputdiv pass"}>
                    <div className="user-modal-i"> 
                      <i className="fas fa-lock"></i>
                    </div>
                    <div>
                      <h5>Password</h5>
                      <input type="password" className="user-modal-input" maxLength="25" onChange={(val) => {setRegisterPassword(val.target.value); countInput(val.target.value, "password")}}/>
                    </div>
                  </div>
                    <button className="user-modal-btn" disabled={emailInvalidError || passwordLengthError || usernameLengthError || emailError || usernameError || submitBtn ? true: false} onClick={nextPartCheck ? nowRegister : doRegister}> 
                      {
                        submitBtn ? <i class="fas fa-circle-notch fa-spin"></i> : "Sign UP"
                      }
                    </button>
                    <div>
                      <p className="user-modal-error-message">
                        {errorHelper()}      
                      </p>
                    </div>
                    <div className="user-modal-account-checker">
                      <p>Already have an account?</p>
                      <a className="user-modal-othermodallink" onClick={toLoginChange}>Log in</a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
        )}         
    </Spring>    
  );
}

export default Register;
