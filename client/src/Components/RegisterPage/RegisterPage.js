import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {registerUser} from '../../Redux/actions/coach_user_actions';
import {useDispatch} from 'react-redux';

function RegisterPage(props){
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                email: '',
                lastname: '',
                firstname: '',
                password: '',
                confirmPassword: '',
                profile_pic: '',
                accountRole: ''
            }}

            onSubmit={(values, {setSubmitting}) => {
                
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        firstname: values.firstname,
                        lastname: values.lastname,
                        password: values.password,
                        profile_pic: values.profile_pic,
                        accountRole: values.accountRole
                    };

                    console.log(dataToSubmit)
                    // dispatch(registerUser(dataToSubmit)).then(res => {
                    //     if(res.payload.success){
                    //         props.history.push('/')
                    //     } else {
                    //         alert(res.payload.err.errmsg)
                    //     }
                    // });

                    setSubmitting(false);
                }, 500)
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email is invalid, Please enter valid email').required('Email is required'),
                firstname: Yup.string().required('First name is required'),
                lastname: Yup.string().required('Last name is required'),
                password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm password'),
                // profile_pic: Yup.string().required('Profile is required'),
                accountRole: Yup.string().required('Account role is required')
            })}

            
        >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
            } = props;
            
            return (
                <div className='register-page'>
                    <h2>Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <Field 
                                id="firstname" 
                                type="text" 
                                value={values.firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter First Name" 
                                className={
                                    errors.firstname && touched.firstname ? 'text-input error' : 'text-input'
                                } 
                            />
                            {touched.firstname && errors.firstname && (
                                <div className='input-error-feedback'>{errors.firstname}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <Field 
                                id="lastname" 
                                type="text" 
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Last Name" 
                                className={
                                    errors.lastname && touched.lastname ? 'text-input error' : 'text-input'
                                } 
                            />
                            {touched.lastname && errors.lastname && (
                                <div className='input-error-feedback'>{errors.lastname}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field 
                                id="email" 
                                type="email" 
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your email" 
                                className={
                                    errors.email && touched.email ? 'text-input error' : 'text-input'
                                } 
                            />
                            {touched.email && errors.email && (
                                <div className='input-error-feedback'>{errors.email}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field 
                                id="password" 
                                type="password" 
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Create new password" 
                                className={
                                    errors.password && touched.password ? 'text-input error' : 'text-input'
                                } 
                            />
                            {touched.password && errors.password && (
                                <div className='input-error-feedback'>{errors.password}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm">Confirm Password</label>
                            <Field 
                                id="confirmPassword" 
                                type="password" 
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Confirm password" 
                                className={
                                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                } 
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <div className='input-error-feedback'>{errors.confirmPassword}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm">Account Role</label>
                            <Field 
                                id="accountRole" 
                                component="select"
                                className="select-option"
                                value={values.accountRole}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select</option>
                                <option value='Admin'>Admin</option>
                                <option value="Regular">Regular</option>
                            </Field>
                            {touched.accountRole && errors.accountRole && (
                                    <div className='input-error-feedback'>{errors.accountRole}</div>
                            )}
                        </div>

                        <div className='form-submit-button'>
                            <button type='submit' disabled={isSubmitting} >Submit</button>
                        </div>
                    </Form>
                </div>
            )
        }}
        </Formik>
    )
}

export default RegisterPage