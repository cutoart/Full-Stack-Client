import React, {useState,useContext} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Login() {

    let history = useHistory();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);
    const login = ()=>{
        const data={username:username,password:password};
    axios.post("http://localhost:3001/auth/login",data).then((response)=>{

if(response.data.error){
    alert(response.data.error);
   
}else{
    //console.log(response.data);
    localStorage.setItem("accessToken", response.data.token);
    setAuthState({
        username:response.data.username, 
        id:response.data.id,
        status:true,
    });
    history.push("/");
}

    });
    }
    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input type="text" onChange={(event)=>{
                setUsername(event.target.value);
            }}></input>
            <label>Password:</label>
            <input type="password" onChange={(event)=>{
                setPassword(event.target.value);
            }}></input>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
