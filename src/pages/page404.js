import React from 'react'
import {Link} from "react-router-dom";
function page404() {
    return (
        <div>
           <h1>Page not found :/</h1> 
           <h3>Go to homepage : <Link to="/">Home Page</Link></h3>
        </div>
    )
}

export default page404
