import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Modal} from 'react-bootstrap'
import {storage} from '../../../../firebaseConfig'

function AddAthleteModal(props){

    // Modal handler for opening and closing modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Uploading athlete picture to firebase and getting back the URL to image
    const [image, setImg] = useState(null);
    const [url, setUrl] = useState(null)
    const [error, setError] = useState('')

    const handleFileUpload = (event) => {
    
        const file = event.target.files[0]
        console.log(file)

        if(file){
            const fileType = file['type'];
            const validImageTypes = ['image/jpeg', 'image/png']

            if(validImageTypes.includes(fileType)){
                setError('')
                setImg(file)
            } else {
                setError('Please select an image to upload')
            }
        }
    }

    const handleUpdate = () => {
        if(image){
            const uploadTask = storage.ref(`athlete/athlete_pic/${image.name}`).put(image)

            uploadTask.on(
                'state_changed',

                snapshot => {
                    return;
                },

                error => {
                    setError(error)
                },

                // Getting the url of the image
                () => {
                    storage.ref('athlete/athlete_pic').child(image.name).getDownloadURL()
                    .then(url => {
                        console.log('this is the url', url)
                        setUrl(url)
                    })
                }
            )
        } else {
            setError('Error please choose an image to upload')
        }
    }


    const CustomInputComponent = () => (
        <div>
            <input type='file' onChange={handleFileUpload}  />
            <button onClick={handleUpdate} type='button'>Upload Image</button>
        </div>
    )
        return (
            <div>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        position: '',
                        age: '',
                        athlete_pic: ''
                    }}

                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            let dataToSubmit = {
                                firstname: values.firstname,
                                lastname: values.lastname,
                                position: values.position,
                                age: values.age,
                                athlete_pic: values.athlete_pic
                            }
                            console.log(dataToSubmit)
                            setSubmitting(false)
                        }, 500)
                    }}
                    
                    validationSchema={Yup.object().shape({
                        firstname: Yup.string().required('Athlete\'s first name is required'),
                        lastname: Yup.string().required('Athlete\'s last name is required'),
                        position: Yup.string().required('Athlete\'s position is required'),
                        age: Yup.number().required('Athlete\'s age is required'),
                        athlete_pic: Yup.string().required('Athlete\'s picture is required')
                    })}
                >
                {props => {
                    const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props
                    console.log(values)
                    return (
                        <div>
                            <button onClick={handleShow}>Add Athlete</button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header>
                                    <Modal.Title>Add New Athlete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
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
                                            <label htmlFor="position">Position</label>
                                            <Field 
                                                id="position" 
                                                type="text" 
                                                value={values.position}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Position" 
                                                className={
                                                    errors.position && touched.position ? 'text-input error' : 'text-input'
                                                } 
                                            />
                                            {touched.position && errors.position && (
                                                <div className='input-error-feedback'>{errors.position}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="age">Age</label>
                                            <Field 
                                                id="age" 
                                                type="number" 
                                                value={values.age}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                                placeholder='Enter athlete age'
                                                className={
                                                    errors.age && touched.age ? 'text-input error' : 'text-input'
                                                } 
                                            />
                                            {touched.age && errors.age && (
                                                <div className='input-error-feedback'>{errors.age}</div>
                                            )}
                                        </div>
                                        <div className='form-group'>
                                                <Field id='athlete_pic' as={CustomInputComponent} type='text' value={url} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.athlete_pic && errors.athlete_pic && (
                                                    <div className='input-error-feedback'>{errors.athlete_pic}</div>
                                                )}
                                        </div>
                                        <div>
                                            <button variant="secondary" onClick={handleClose}>Close</button>
                                            <button type="submit"  disabled={isSubmitting} >Save Changes</button>
                                        </div>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </div>
                        )
                    }
                }
                </Formik>
            </div>
        )
}

export default AddAthleteModal
