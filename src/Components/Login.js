
import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";


const Login = () => {
    let [user, setUser] = useState({
        email:"", password:""
    })
    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")
    let {token, setToken} = useContext(Context)

    let navigate = useNavigate();

    let {email, password} = user;

    console.log("token", token)


    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/home")
        }
    },[])
    
    async function implementLogin(e){
        e.preventDefault() 

        if(!email || !password){
            setError("Please fill all the fields")
            setSuccess("")
            return ;
        }
        

      try{
            const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/login", {email, password})
            setSuccess(response.data.message)
            setError("")
            console.log("response", response.data.data.token)
            setToken(response.data.data.token)
            // add token to local storage
            localStorage.setItem("token", response.data.data.token)
            // localStorage.setItem("token2", JSON.stringify({a:10, b:20}))

            // localStorage.setItem("token", token)
            setUser({email:"", password:""})
            alert("Login Successful")
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

               <form onSubmit={implementLogin}>
                    
                    <input type="email" placeholder="enter your email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    />
                    <input type="password" placeholder="enter your password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    />
                    
                    <button type="submit">Login</button>
               </form>
        </div>
    )
}

export default Login;