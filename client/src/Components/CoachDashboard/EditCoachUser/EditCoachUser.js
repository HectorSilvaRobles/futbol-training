import React, {Component} from 'react';
import './editcoachuser.css'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'

class EditCoachUser extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return (

            <Formik
                initialValues={{
                    firstname: '',
                    lastname : '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                 }}

                validationSchema={Yup.object().shape({
                    firstname: Yup.string(),
                    lastname: Yup.string(),
                    email: Yup.string().email('Email is invalid, please enter a valid email'),
                    password: Yup.string().min(6, 'Password must be atleast 6 characters'),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your new password')
                })}

                onSubmit={(values, {setSubmitting}) => {
                    console.log(values)
                }}
                >
                {props => {
                    const {values, touched, errorr, isSubmitting, handleChange, handleBlur, hanldeSubmit} = props

                    return (
                        <Form>
                            <div className='edit-profile-component'>
                                <div className='edit-profile'>
                                    <div className='ep-photo-update'>
                                        
                                            
                                    </div>
                                    <div className='ep-account-info-update'>
                                        <div className='ep-account-upper'>
                                            <div className='ep-acc-upp-title'>
                                                <h1>Account Information</h1>
                                            </div>
                                            <div className='ep-acc-upp-body'>
                                                <div className='field-input-div'>
                                                    <h1>Firstname</h1>
                                                    <Field
                                                        id='firstname'
                                                        type='text'
                                                        value={values.firstname}
                                                        onChange={handleChange}
                                                        placeholder='Update Firstname'
                                                        className='field-input'
                                                    />
                                                </div> 
                                                <div className='field-input-div'>
                                                    <h1>Lastname</h1>
                                                    <Field
                                                        id='lastname'
                                                        type='text'
                                                        value={values.lastname}
                                                        onChange={handleChange}
                                                        placeholder='Update Lastname'
                                                        className='field-input'
                                                    />
                                                </div>  
                                                <div className='field-input-div'>
                                                    <h1>Email</h1>
                                                    <Field
                                                        id='email'
                                                        type='text'
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        placeholder='Update Email'
                                                        className='field-input'
                                                    />
                                                </div>  
                                            </div>            
                                        </div>
                                        <div className='ep-account-lower'>
                                            <div className='ep-acc-low-title'>
                                                <h1>Change Password</h1>
                                            </div>
                                            <div className='ep-acc-low-body'>
                                                <div className='field-input-div-2'>
                                                        <h1>New Password</h1>
                                                        <Field
                                                            id='new-password'
                                                            type='text'
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            placeholder='Enter new password'
                                                            className='field-input-2'
                                                        />
                                                </div> 
                                                <div className='field-input-div-2'>
                                                        <h1>Confirm Password</h1>
                                                        <Field
                                                            id='new-password'
                                                            type='text'
                                                            value={values.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder='Confirm new password'
                                                            className='field-input-2'
                                                        />
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </Form>                   
                    )
                }}
            </Formik>
            
        )
    }
}

export default EditCoachUser