// import React from 'react'; not needed?
import {useRef, useState, useEffect} from "react";
import { facCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// username and password requirements
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,64}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,64}$/;


const CreateAccount = () => {
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

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Create Account</h1>
            <form>
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
                    aria-describedby="uidnote" // display input requirements
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    helloworld
                </p>
            </form>
        </section>
    )
};

export default CreateAccount;
