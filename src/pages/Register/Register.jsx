import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/Path.svg';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const [err, setErr] = useState({
    emailError: '',
    passwordError: '',
    repasswordError: ''
  });
  

  const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  function validate(emailRef, passwordRef, repasswordRef) {
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

    if (repasswordRef.current.value !== passwordRef.current.value) {
      setErr(prevError => ({ ...prevError, repasswordError: "Passwords don't match" }));
      isValid = false;
    }

    return isValid;
  }

  function handelClick(e) {
    e.preventDefault();

    const isValid = validate(emailRef, passwordRef, repasswordRef);
    if (isValid) {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        repassword: repasswordRef.current.value
      };
      localStorage.setItem("user", JSON.stringify(user)); 
      navigate('/login'); 
    }
  }

  return (
    <div className="Card">
      <img src={icon} alt="" />

      <h1>Sign Up</h1>
      <form>
        <input ref={emailRef} type="email" id="email" placeholder="Email address" />
        {err.emailError && (
          <p className='error' id="emailError">{err.emailError}</p>
        )}
        <input ref={passwordRef} type="password" id="password" placeholder="Password" />
        {err.passwordError && (
          <p className='error' id="passwordError">{err.passwordError}</p>
        )}
        <input ref={repasswordRef} type="password" id="repassword" placeholder="Repeat password" />
        {err.repasswordError && (
          <p className='error' id="repasswordError">{err.repasswordError}</p>
        )}
      </form>
      <button onClick={handelClick} className="btn">Create an account</button>
      <p className='text'>Already have an account? <a href='/login'>Login</a></p>
    </div>
  );
}

export default Register;
