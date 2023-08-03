import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import instagram from "./Image/instagram.png";
import facebokIcon from "./Image/facebookIcon.png";
import googleIcon from "./Image/googlelogo.png";
import microIcon from "./Image/microsoft.png";
import homePhone from "./Image/home-phones-2x.png";
import Image from "./Image";
import { language, site } from "../data";

const Login = () => {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let [success, setSuccess] = useState("");
  let [error, setError] = useState("");
  let { token, setToken } = useContext(Context);

  let navigate = useNavigate();

  let { email, password } = user;

  console.log("token", token);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  async function implementLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/login",
        { email, password }
      );
      setSuccess(response.data.message);
      setError("");
      console.log("response", response.data.data.token);
      setToken(response.data.data.token);
      // add token to local storage
      localStorage.setItem("token", response.data.data.token);
      // localStorage.setItem("token2", JSON.stringify({a:10, b:20}))

      // localStorage.setItem("token", token)
      setUser({ email: "", password: "" });
      alert("Login Successful");
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
      setSuccess("");
    }
  }

  return (
    <div>
      <div className="signup">
        {error && <h1> {error}</h1>}
        {success && <h1> {success}</h1>}
        <div className="background-img">
          <div style={{ position: "relative" }}>
            <img
              src={homePhone}
              width={500}
              height={670}
              style={{ marginLeft: "150px" }}
            />
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "60px",
                zIndex: "10",
              }}
            >
              <Image />
            </div>
          </div>
        </div>

        <div className="login_form">
          <form onSubmit={implementLogin}>
            <div className="heads">
              <img src={instagram} width={180} />
            </div>

            <div className="login_input">
              <input
                type="email"
                placeholder="Phone number, username or email address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div>
              <button className="btn" type="submit">
                Log in
              </button>
            </div>
            <div className="seprator"></div>
            <div className="logo">
              <img src={facebokIcon} width={25} height={25} />
              <p>Log in with Facebook</p>
            </div>
            <div className="forget">
              <p>Forgotten your password?</p>
            </div>
          </form>
          <div className="account-signup">
            <p>
              Don't have an account? <span className="span">Sign up</span>
            </p>
          </div>
          <div>
            <p className="get">Get the app.</p>
            <div className="img">
              <div>
                <img src={googleIcon} width={130} height={40} />
              </div>
              <div>
                <img src={microIcon} width={130} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site">
        {site.map((site, index) => {
          return <span>{site}</span>;
        })}
      </div>
      <div className="insta-logo">
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

export default Login;
