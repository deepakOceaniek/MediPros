import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="leftFooter">
          <h4>Download Our App</h4>
          <p>Download App For Android and IOS Phone</p>
          <a href="https://play.google.com"><img src="images/playstore.png" alt="playstore" /></a> 
          <a href="https://www.apple.com"><img src="images/Appstore.png" alt="playstore" /></a>  
        </div>
        <div className="midFooter">
          <h1>MediPros</h1>
          <p>High Quality is our first priority</p>
          <p>Copyright 2022 &copy; DeepakSingh</p>
        </div>
        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="https://instagram.com/" target="blank">Instagram</a>
          <a href="https://facebook.com/" target="blank">Facebook</a>
          <a href="https://linkedIn.com/" target="blank">LinkedIn</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
