import React, {Component} from 'react';
import './editcoachuser.css'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {storage} from '../../../firebaseConfig';
import {ProgressBar} from 'react-bootstrap';
import {connect} from 'react-redux'

class EditCoachUser extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        if(this.props.coach_user.userData){
            const {profile_pic} = this.props.coach_user.userData
        }

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
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
                })}

                onSubmit={(values, {setSubmitting}) => {
                    console.log(values)
                }}
            >
                {props => {
                    const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className='edit-profile-component'>
                                <div className='edit-profile'>
                                    <div className='ep-photo-update'>
                                        <div className='ep-ph-up-title'>
                                            <h1>Profile Picture</h1>
                                        </div>
                                        <div className='ep-ph-up-body'>

                                        </div>
                                            
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
                                                            id='password'
                                                            type='password'
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            placeholder='Enter new password'
                                                            className='field-input-2'
                                                        />
                                                        {/* {errors.password ? <div>{errors.password}</div> : null} */}
                                                </div> 
                                                <div className='field-input-div-2'>
                                                        <h1>Confirm Password</h1>
                                                        <Field
                                                            id='confirmPassword'
                                                            type='password'
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
                                <button type='submit' disabled={isSubmitting} className='create-post-button'>Update Profile</button>
                            </div>  
                        </Form>                   
                    )
                }}
            </Formik>
            
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}


export default connect(mapStateToProps)(EditCoachUser)