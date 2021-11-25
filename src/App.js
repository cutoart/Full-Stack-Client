
import "./App.css";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import IndividualPost from "./pages/IndividualPost";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import page404 from "./pages/page404";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import {AuthContext} from "./helpers/AuthContext";
import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState]= useState({username:"", id:0,status:false});

  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({username:"", id:0,status:false});
  }
  useEffect(() => {

      // if(localStorage.getItem("accessToken")){
      //   setAuthState(true);
      // }
      axios.get("https://full-stack-api-arthur.herokuapp.com/auth/auth",
      {headers:{"accessToken" : localStorage.getItem("accessToken")}}
      ).then((response)=>{
        console.log(response.data);
     if(response.data.error){
      setAuthState({...authState,status:false});
     }else{
      setAuthState({username:response.data.username, id:response.data.id,status:true});
     }
      });
    },[]);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
    
     <Router>
       <div className="navbar">
         <div className="links">
     
       {!authState.status ?(
       <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        </>
        ) : (
          <>
          <Link to="/createpost">Create A Post</Link>
       <Link to="/">Home Page</Link>
       </>
        )}

      </div>
      <div className="loggedInContainer">
        <h1>{authState.username}</h1>
        {authState.status && <button onClick={logout}>Logout</button>}
      </div>
      
       </div>
       <Switch>
         <Route path="/" exact component={Home}/>
         <Route path="/createpost" exact component={CreatePost}/>
         <Route path="/post/:id" exact component={IndividualPost}/>
         <Route path="/login" exact component={Login}/>
         <Route path="/registration" exact component={Registration}/>
         <Route path="/profile/:id" exact component={Profile}/>
         <Route path="/changepassword" exact component={ChangePassword}/>
         <Route path="*" exact component={page404}/>
       </Switch>
     </Router>
     </AuthContext.Provider>
    </div>
  );
}

export default App;
