import React from "react";
import "./Footer.css";
import { useAuth0 } from "@auth0/auth0-react";
import i1 from "../../../img/facebook.png";
import i2 from "../../../img/instagram.png";
import i3 from "../../../img/twitter.png";
import i4 from "../../../img/youtube.png";

export default function Footer() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      <div className="footersection">
        <div className="sec">
          <div className="authentated">
            {isAuthenticated ? (
              <></>
            ) : (
              <button className="auth1" onClick={() => loginWithRedirect()}>
                Sign in for more access
              </button>
            )}
          </div>
          <p>You can find us at</p>
          <div className="socialmedia">
            <i>
              <img className="icon" src={i1} alt={i1} />
            </i>
            <i>
              <img className="icon" src={i2} alt={i2} />
            </i>
            <i>
              <img className="icon" src={i3} alt={i3} />
            </i>
            <i>
              <img className="icon" src={i4} alt={i4} />
            </i>
          </div>
          <div className="moviefyInfo">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="moviefyfoot"> a moviefy company</div>
          <div className="rights">
            © 2023 by MovieFy.com || Anuj Nirmal, Inc.
          </div>
        </div>
      </div>
    </>
  );
}
