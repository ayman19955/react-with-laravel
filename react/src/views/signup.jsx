import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors , setErrors] = useState(null)
  const { setUser, setToken } = useStateContext()

  const onSubmit = (ev) => {

    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {

        const response = err.response.data;
        console.log(response.errors);

          setErrors(response.errors);

      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Signup for free
          </h1>
          {errors && (
            <div className="alert">

                {Object.keys(errors).map((key) => (
                  <div className="mb"><p key={key}>
                    *{errors[key]}
                  </p></div>
                ))
              }
            </div>
          )}
          <input ref={nameRef} type="text" placeholder="name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
          <button type="submit" className="btn btn-block" >Signup</button>
          <p className="message">
            Already Registered ? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>

    </div>
  )
}
