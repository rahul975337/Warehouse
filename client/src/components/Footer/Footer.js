import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footer_wrapper">
        <div className="footer_desc">
          <h1>Warehouse</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Cupiditate, modi? Lorem ipsum dolor sit amet.
          </p>
          <p id="phone">989799302</p>
        </div>
      </div>
      <div id="footer" className="footer_wrapper">
        <div className="footer_links">
          <h2 className="footer_title">Get in Touch</h2>
          <a href="gd" target="blank" className="footer_link">
            JSSATEB
          </a>
          <a href="gd" target="blank" className="footer_link">
            Facebook
          </a>
          <a href="gd" target="blank" className="footer_link">
            Youtube
          </a>
          <a href="gd" target="blank" className="footer_link">
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
