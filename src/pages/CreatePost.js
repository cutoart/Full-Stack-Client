import React, {useContext,useEffect} from 'react';
import {Formik,Form,Field,ErrorMessage} from "formik";
import  *as Yup from 'yup';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function CreatePost() {
    
    const {authState} = useContext(AuthContext);
    
    let history = useHistory();
    const initialValues = {
        title:"",
        postText:"",
        // username:"",
    }

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            history.push("/login");
        }
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        //username: Yup.string().min(3).max(15).required()
    }) 
    const onSubmit=((data)=>{
        
        // console.log(data);

        axios.post("https://full-stack-api-arthur.herokuapp.com/posts",data,{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response) => {

            //console.log(response.data);
            history.push("/");
        });

    })

    
    return (
        <div className="createPostPage">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
              <Form className="formContainer">
                  <label>Title:</label>
                  <ErrorMessage name="title" component="span"/>
                  <Field id="inputCreatePost" 
                        autoComplete="off"
                        name="title" 
                        placeholder="Ex. Title..."/>
                  <label>Post:</label>
                  <ErrorMessage name="postText" component="span"/>
                  <Field id="inputCreatePost" 
                        autoComplete="off"
                        name="postText" 
                        placeholder="Ex. Post..."/>
                    {/* <label>Username:</label>
                  <ErrorMessage name="username" component="span"/>      
                  <Field id="inputCreatePost" 
                        autoComplete="off"
                        name="username" 
                        placeholder="Ex. John..."/> */}

                        <button type="submit">Create Post</button>
              </Form>
          </Formik>
        </div>
    )
}

export default CreatePost
