
import React, {useState, useContext} from "react";
import axios from "axios";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

import instaApi from "../utilities/instaApi";


const Signup = () => {
    let [user, setUser] = useState({
        name:"", email:"", password:"", confirm_password:""
    })
    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")
    let {token, setToken} = useContext(Context)
    let navigate = useNavigate();

    let {name, email, password, confirm_password} = user;
    
    async function implementSignup(e){
        e.preventDefault() 

        if(!name || !email || !password || !confirm_password){
            setError("Please fill all the fields")
            setSuccess("")
            return ;
        }
        else if(password !== confirm_password){
            setError("Passwords do not match")
            setSuccess("")
            return ;
        }




      try{
            // const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {name, email, password})
            instaApi.post("/auth/signup", {name, email, password})
            
            setSuccess(response.data.message)
            setError("")
            setToken(response.data.data.token)
            setUser({name:"", email:"", password:"", confirm_password:""})
            alert("Signup Successful")
            navigate("/home")

      }
        catch(error){
            setError(error.response.data.message)
            setSuccess("")
        }
    }



    return(

        <div className="signup">
                {error && <h1> {error}</h1>}
                {success && <h1> {success}</h1>}
               



               <form onSubmit={implementSignup}>
                    <input type="text" placeholder="enter your name"
                    value={user.name}
                    onChange={(e) => setUser({...user, name:e.target.value})}
                    />
                    <input type="email" placeholder="enter your email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    />
                    <input type="password" placeholder="enter your password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    />
                    <input type="password" placeholder="confirm your password"
                    value={user.confirm_password}
                    onChange={(e) => setUser({...user, confirm_password:e.target.value})}
                    />
                    <button type="submit">Signup</button>
               </form>
        </div>
    )
}

export default Signup;