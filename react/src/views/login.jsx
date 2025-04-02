import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null)
  const { setUser, setToken } = useStateContext()
  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then((response) => {
        setUser(response.data.user);  // Note: response.data contains the actual data
        setToken(response.data.token);
        setErrors({});
      })
      .catch((error) => {
        if (error.response) {
          // Check if errors exist in response, otherwise use fallback
          const errorData = error.response.data;

          setErrors(errorData.errors);




        }
      });

  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login into your account
          </h1>
          {errors && (
            <div className="alert">

                {Object.keys(errors).map((key) => (
                  <div className="mb"><p key={key}>
                    * {errors[key]}
                  </p></div>
                ))
              }
            </div>
          )}



          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered ? <Link to="/signup">Create an account </Link>
          </p>
        </form>
      </div >

    </div >
  )
}
