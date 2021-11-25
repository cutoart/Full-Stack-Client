import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik";
import  *as Yup from 'yup';
import axios from "axios";
import {useHistory} from "react-router-dom";

function Registration() {

    let history = useHistory();
    const initialValues = {
        username:"",
        password:"",
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    }) 
    const onSubmit=((data)=>{
        
        // console.log(data);

        axios.post("https://full-stack-api-arthur.herokuapp.com/auth",data).then((response) => {

            console.log(response.data);
            history.push("/");
        });

    })

    return (
        <div>
           <Formik initialValues={initialValues} 
                   onSubmit={onSubmit} 
                   validationSchema={validationSchema} >
              <Form className="formContainer">

                   <label>Username:</label>
                   <ErrorMessage name="username" component="span"/>      
                   <Field id="inputCreatePost" 
                        autoComplete="off"
                        name="username" 
                        placeholder="Ex. John..."/>

                    <label>Password:</label>
                   <ErrorMessage name="password" component="span"/>      
                   <Field id="inputCreatePost" 
                        autoComplete="off"
                        type="password"
                        name="password" 
                        placeholder="Password"/>
                        <button type="submit">Register</button>
              </Form>
          </Formik>
        </div>
    )
}

export default Registration
