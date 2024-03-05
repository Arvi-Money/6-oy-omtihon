import './Login.css'
import icon from '../../assets/Path.svg'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const emailRef = useRef();
  const passwordRef = useRef();
  const [err, setErr] = useState({
    emailError: '',
    passwordError: '',
    repasswordError: ''
  });

  const validateEmail = (email) =>{
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  
  
    function validate(emailRef, passwordRef) {
      let isValid = true;
      setErr({
        emailError: '',
        passwordError: '',
        repasswordError: ''
      });

      if (!validateEmail(emailRef.current.value)) {
        setErr(prevError => ({ ...prevError, emailError: "Email is incorrect" }));
        isValid = false;
      }
  
      if (!passwordRef.current.value) {
        setErr(prevError => ({ ...prevError, passwordError: "Password is empty" }));
        isValid = false;
      }

      return isValid;      
    }

  function handelClick(e) {
    e.preventDefault();

    const isValid = validate(emailRef, passwordRef);
    if (isValid) {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
        localStorage.setItem("user", user);
        navigate('/'); 
      }
  }
  return (
    <>
    <div className="Card">  
      <img src={icon} alt="" /> 

        <h1>Login</h1>
        <form>
            <input ref={emailRef} type="email"  id="email" placeholder="Email address"/>
            {err.emailError && (
              <p className='error' id="emailError">{err.emailError}</p>
             )}
            <input ref={passwordRef} type="password" id="password" placeholder="Password"/>
            {err.passwordError && (
              <p className='error' id="passwordError">{err.passwordError}</p>
             )}
        </form>
        <button onClick={handelClick} className="btn">Login to your account</button>
        <p className='text'>Dont have an account? <a href='../Register'>Sign Up</a></p>
      </div>
   </>
  )
}

export default Login