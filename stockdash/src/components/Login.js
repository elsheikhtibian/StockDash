// import React from 'react'; not needed?
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();
//         // Basic validation logic here
//         console.log("Email:", email);
//         console.log("Password:", password);
//     };

//     return (

//         <container className="login-container" style={{ maxWidth: '400px', marginTop: '40px' }}>
//         </container>
//     );
// }

// username and password requirements
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,64}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,64}$/;

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    // user will contain new user's desired username
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // pwd will contain new user's desired password
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // matchPwd will be used to double check the new user's password choice
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // any error or success messages to be displayed
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    // anytime the user changes either pwd or matchPwd, check them
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd; // check passwords match
        setValidMatch(match);
    }, [pwd, matchPwd])

    // anytime user, pwd, or matchPwd changes, clear any previous error messages
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    // handle user account submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with js hack
        const x = USER_REGEX.test(user);
        const y = PWD_REGEX.test(pwd);
        if (!x || !y) {
            setErrMsg("Invalid Entry");
            return;
        }
        // TODO: backend half
        console.log(user, pwd);
        setSuccess(true);
    }

    return (
        <login className="Login">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        {/* TODO: router link here */}
                        <a href="./Login.js">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Create Account</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef} // set focus
                            autoComplete="off" // prevent previous values from being displayed
                            onChange={(e) => setUser(e.target.value)} // ties input to user state
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote" // display input requirements (see below)
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign In</button>
                    </form>
                    <p>
                        Don't have an account?<br />
                        <span className="line">
                            {/* TODO: router link here */}
                            <a href="./CreateAccount.js">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </login>
    )
};

export default Login;
