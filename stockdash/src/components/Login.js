import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Basic validation logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
    
        <container className="login-container" style={{maxWidth:'400px', marginTop: '40px'}}>
        </container>



    );
}
    
export default Login;
