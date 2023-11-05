import { useState, useEffect } from "react";
import footerLogo from "../assets/imgs/B_shortLogo.png";
import facebook from "../assets/imgs/facebook.png";
import instagram from "../assets/imgs/instagram.png";
import tweeter from "../assets/imgs/tweeter.png";
import LoginModal from "./login-modal";
import Logout from "./logout";
// import LoadingScreen from "react-loading-screen"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import fireAuth from '../firebase';

export function AppFooter() {

  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isAuthenticated, setisAuthenticated] = useState(false)

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth(fireAuth);
      await signOut(auth);
      setisAuthenticated(false)
      console.log(isAuthenticated, 'Logged out')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeLogin = () => {
    setLoginOpen(false);
  }

  useEffect(() => {
    const auth = getAuth(fireAuth);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setisAuthenticated(true)
        console.log('User is logged in:', isAuthenticated, currentUser)
      } else {
        setisAuthenticated(null);
        console.log('User is not logged in:', isAuthenticated)
      }
    });
  }, [isAuthenticated]);

  const openLogin = () => {
    setLoginOpen(true);
  }

  // if (isLoading) {
  //   return <LoadingScreen
  //     loading={true}
  //     bgColor="rgba(255,255,255,0.5)"
  //     spinnerColor="#4850b9"
  //     textColor="#676767"
  //     logoSrc="../logo.png"
  //     text="Loading"
  //   >
  //     {" "}
  //   </LoadingScreen>
  // }

  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  return (
    <footer className="app-footer">
      <div className="footer-logo">
        <img className="footer-image" src={footerLogo} alt="logo" />
        <div className="char-style-1 footer-rigths">Copyright 2022 - All rights reserved</div>

      </div>
      <address className="footer-contact">
        <li className="char-style-1 line-spacing-17"><span className="char-style-2">Address: </span> Hakhartsit 3, Savyon </li>
        <li className="char-style-1 line-spacing-17"><span className="char-style-2">Phone: </span>03-7411-141</li>
        <li className="char-style-2">Working hours:</li>
        <li className="char-style-1">Sun - Thu 9:00-20:00</li>
        <li className="char-style-1">Friday and Holiday eve 8:00 - 14:00</li>

      </address>
      <ul className="footer-nav-bar">
        <li className="char-style-2 line-spacing-17 cursor">Custom made</li>
        <li className="char-style-2 line-spacing-17">Contact us</li>
        <li className="char-style-2 line-spacing-17">Terms of use</li>
        <li className="char-style-2 line-spacing-17">Deliveries</li>.


        {!isAuthenticated ? (
          <li>
            {isLoginOpen && (
              <LoginModal
                isOpen={isLoginOpen}
                onClose={closeLogin}
              />
            )}
            <button onClick={openLogin}>Login</button>
          </li>
        ) : (
          <li>
            <Logout handleLogout={handleLogout} />
          </li>
        )}
      </ul>
      <ul className="footer-shop-nav">
        <li className="char-style-2 spanner line-spacing-17">Shop</li>
        <li className="char-style-1 line-spacing-17">Home&Office</li>
        <li className="char-style-1 line-spacing-17">Balcony</li>
        <li className="char-style-1 line-spacing-17">Spilled</li>
        <li className="char-style-1 line-spacing-17">Vegetables and spices</li>
        <li className="char-style-1 line-spacing-17">Gardening equipment</li>
        <li className="char-style-1 line-spacing-17">planting tool</li>
      </ul>

      <div className="">
        <div className="footer-social">
          <img src={facebook} alt="facebook" />
          <img src={tweeter} alt="tweeter" />
          <img src={instagram} alt="instagram" />
        </div>
      </div>
    </footer>
  )
}