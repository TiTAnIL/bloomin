import React, { useState, useRef, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import fireAuth from '../firebase';

function LoginModal({ isOpen, onClose}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const modalRef = useRef(null)
    // const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(email, password)
    }, [email, password])


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          console.log(email, password)
        //   const auth = getAuth(fireAuth);
        //   const userCredential = await signInWithEmailAndPassword(auth, email, password)
        //   setUser(userCredential.user)
        //   console.log('Logged in:', user)
        } catch (error) {
          console.error('Login failed:', error)
        }
      };

    return (
        <div className={`login-modal ${isOpen ? 'open' : ''}`}>
            <div className="login-modal-inner" ref={modalRef}>
                <span className="login-modal-close" onClick={onClose}>
                    X
                </span>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}
// }
export default LoginModal;
