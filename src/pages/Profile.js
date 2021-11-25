import React,{useEffect, useState, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from "axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';

function Profile() {
    let {id} = useParams();
    const [username,setUsename] = useState("");
    const [listOfPosts,setListOfPosts] = useState([]);
    let history = useHistory();
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsename(response.data.username);
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });
    
      
      }, []);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                
             <div><h1>Username: {username}</h1></div> 
             {authState.username === username && <button onClick={()=>{history.push("/changepassword")}} >Change My Password</button>}
            
            </div>
            <div className="listOfPost"></div>

            {listOfPosts.map((value, key) => {
                return (
                <div key={key} className="post">
                    <div className="title">{value.title}</div>
                    <div className="body" onClick={()=>{
                    history.push(`/post/${value.id}`);
                }}>{value.postText}</div>
                    <div className="footer">
                        <div className="username">{value.username}</div>
                    <div className="buttons">
                        
                    <ThumbUpIcon  className="unlikeBttn"  /><label>{value.Likes.length}</label></div>
                </div>
                </div>
                )
            })}

        </div>
           
          
          
        
    )
}

export default Profile
