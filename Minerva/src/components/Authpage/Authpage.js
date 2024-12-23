import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate hook

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/home');
        }
      
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");

        signupBtn.onclick = () => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
            setIsSignup(true);
        };
        
        loginBtn.onclick = () => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
            setIsSignup(false);
        };
        
        signupLink.onclick = () => {
            signupBtn.click();
            return false;
        };
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.success) {
                console.log('Login successful!');
                console.log(data);
                localStorage.setItem('token', data.token);

      localStorage.setItem('userName', data.name); // Store the user's name
                // Redirect to home page
                navigate('/home');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred during login');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (data.success) {
                console.log('Signup successful!');
                localStorage.setItem('token', data.token); 

      localStorage.setItem('userName', data.name); 
                navigate('/home');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            setError('An error occurred during signup');
        }
    };

    return (
        <div className="wrapper">
            <div className="title-text">
                <div className="title login">Login</div>
                <div className="title signup">Signup</div>
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input type="radio" name="slide" id="login" defaultChecked />
                    <input type="radio" name="slide" id="signup" />
                    <label htmlFor="login" className="slide login">Login</label>
                    <label htmlFor="signup" className="slide signup">Signup</label>
                    <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                    {/* Login Form */}
                    <form action="#" className="login" onSubmit={handleLogin}>
                        <div className="field">
                            <input
                                type="text"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Login" />
                        </div>
                        <div className="signup-link">Not a member? <a href="#">Signup now</a></div>
                    </form>

                    {/* Signup Form */}
                    <form action="#" className="signup" onSubmit={handleSignup}>
                        <div className="field">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Signup" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
