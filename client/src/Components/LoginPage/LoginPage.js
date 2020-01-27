import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {loginUser} from '../../Redux/actions/coach_user_actions'
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

function LoginPage(props) {
    const dispatch = useDispatch()

    const remeberMeChecked = localStorage.getItem('rememberMe') ? true : false;

    const [formErrorMessage, setFormErrorMessage ] = useState('')
    const [rememberMe, setRememberMe] = useState(remeberMeChecked);

    const handleRemeberMe = () => {
        setRememberMe(!rememberMe)
    }

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : ''

    return (
        <div>
            <Formik
                // initializing values for login form
                initialValues={{
                    email: initialEmail,
                    password: ''
                }}

                // validating the user's input in login form
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Please enter your email').required('Email is required'),
                    password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required')
                })}

                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        let dataToSubmit ={
                            email: values.email,
                            password: values.password
                        };

                        // sending user input data to loginUser in redux
                        
                    }, 500)
                }}
            >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <div>

                    </div>
                )
            }}

            </Formik>
            
        </div>
    )
}


export default withRouter(LoginPage);