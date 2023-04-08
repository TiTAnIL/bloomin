import footerLogo from "../assets/imgs/B_shortLogo.png";
import facebook from "../assets/imgs/facebook.png";
import instagram from "../assets/imgs/instagram.png";
import tweeter from "../assets/imgs/tweeter.png";

export function AppFooter() {

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
                <li className="char-style-2 line-spacing-17">Custom made</li>
                <li className="char-style-2 line-spacing-17">Contact us</li>
                <li className="char-style-2 line-spacing-17">Terms of use</li>
                <li className="char-style-2 line-spacing-17">Deliveries</li>
            </ul>
            <ul className="footer-shop-nav">
                <li className="char-style-2 spanner line-spacing-17">Shop</li>
                <li className="char-style-1 line-spacing-17">Home&Office</li>
                <li className="char-style-1 line-spacing-17">Balcony</li>
                <li className="char-style-1 line-spacing-17">Spilled</li>
                {/* <div className=""> */}
                <li className="char-style-1 line-spacing-17">Vegetables and spices</li>
                <li className="char-style-1 line-spacing-17">Gardening equipment</li>
                <li className="char-style-1 line-spacing-17">planting tool</li>
                {/* </div> */}
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