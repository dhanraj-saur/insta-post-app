import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import instagram from "./Image/instagram.png";
import facebokIcon from "./Image/facebookIcon.png";
import googleIcon from "./Image/googlelogo.png";
import microIcon from "./Image/microsoft.png";
import { language, site } from "../data";
import instaApi from "../utilities/instaApi";

const Signup = () => {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  let [success, setSuccess] = useState("");
  let [error, setError] = useState("");
  let { token, setToken } = useContext(Context);
  let navigate = useNavigate();

  let { name, email, password, confirm_password } = user;

  async function implementSignup(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirm_password) {
      setError("Please fill all the fields");
      setSuccess("");
      return;
    } else if (password !== confirm_password) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        { name, email, password }
      );
      // instaApi.post("/auth/signup", {name, email, password})

      setSuccess(response.data.message);
      setError("");
      setToken(response.data.data.token);
      setUser({ name: "", email: "", password: "", confirm_password: "" });
      alert("Signup Successful");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      setSuccess("");
    }
  }

  return (
    <div>
      <div className="signup">
        <div className="error_success">
          {error && <p style={{ color: "red" }}> {error}</p>}
          {success && <p style={{ color: "green" }}> {success}</p>}
        </div>
        <div className="signup_form">
          <div className="heads">
            <img src={instagram} width={180} />
          </div>
          <div>
            <h2 className="heading">
              Sign up to see photos and videos from your friends.
            </h2>
          </div>
          <div className="icons">
            <div className="button">
              <button id="btn" type="button">
                <img
                  className="img1"
                  src={facebokIcon}
                  width={25}
                  height={25}
                ></img>
                Log in with Facebook
              </button>
            </div>
          </div>
          <div className="seprator"></div>
          <div className="form">
            <form onSubmit={implementSignup}>
              <input
                type="text"
                placeholder="enter your name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="confirm your password"
                value={user.confirm_password}
                onChange={(e) =>
                  setUser({ ...user, confirm_password: e.target.value })
                }
              />
              <div className="tag">
                <p>
                  People who use our service may have uploaded your contact
                  information to Instagram.
                  <a href="#" target="_blank" className="tagA">
                    Learn More
                  </a>
                </p>
                <p>
                  By signing up, you agree to our Terms, Privacy Policy and
                  Cookies Policy.
                </p>
              </div>
              <div className="signup_btn">
                <button className="button1" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="have-account">
        <p>
          Have an account? <span className="lo-in">Log in</span>
        </p>
      </div>
      <div>
        <p className="getTheApp">Get the app.</p>
        <div className="images">
          <div>
            <img src={googleIcon} width={130} height={40} />
          </div>
          <div>
            <img src={microIcon} width={130} height={40} />
          </div>
        </div>
      </div>
      <div className="sites">
        {site.map((site, index) => {
          return <span>{site}</span>;
        })}
      </div>
      <div className="insta-logos">
        <select for="English(UK)" id="language">
          {language.map((lang, index) => {
            return <option value={lang}>{lang}</option>;
          })}
        </select>
        <p>© 2023 Instagram from Meta</p>
      </div>
    </div>
  );
};

export default Signup;
