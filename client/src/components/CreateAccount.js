// import React from 'react'; not needed?
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CreateAccount.css";

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
        <createaccount className="CreateAccount">
            {/* check if successful account creation */}
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

                        {/* username section with check and x icons */}
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
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
                        {/* show info message until user types an acceptable username */}
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens are allowed.
                        </p>

                        {/* password section */}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
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
                        {/* show info message until user types an acceptable password */}
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        {/* confirm password section */}
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        {/* show info message until user types a matching password */}
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        {/* submit button */}
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/* TODO: router link here */}
                            <a href="./Login.js">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </createaccount>
    )
};

export default CreateAccount;
