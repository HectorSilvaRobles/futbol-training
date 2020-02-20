import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import './notifications.css';
import axios from 'axios'

import {createCoachPost} from '../../../Redux/actions/coach_to_athlete_actions'
import {removeRequest, getAllRequest} from '../../../Redux/actions/pending_actions'


function Notifications(props) {
    const dispatch = useDispatch()

     // Modal handler for opening and closing modals
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);


     // Get data from redux state
     let requests = useSelector(state => state.pending_reducer.all_request);


     // If pending request is accepted 
     const acceptedRequest = (dataToSubmit, request_id, type_of_endpoint) => {
         // If type of endpoint is createCoachPost then run this
        if(type_of_endpoint == 'createCoachPost'){
            dispatch(createCoachPost(dataToSubmit))
            .then(res => {
                if(res.payload.success){
                    rejectedRequest(request_id)
                }
            })
        }
     }


     // If pending request is rejected
     const rejectedRequest = (request_id) => {
        dispatch(removeRequest(request_id))
        .then(res => {
            dispatch(getAllRequest())
        })
     }
     
     
     let all_requests;
     if(requests){
         const {all_pending_requests} = requests 

         // If there is no more pending requests then return this message
         if(all_pending_requests.length == 0){
            all_requests = (
                <div>
                    No requests sorry
                </div>
             )
         } 
         else {
            all_requests = all_pending_requests.map(val => {
                // get the specific athlete
                let selected_athletes = axios.get(`/api/athletes/get-this-athlete/${val.dataToSubmit.athlete_id}`)
                .then(res => console.log(res.data))

                console.log(selected_athletes)

                return (
                    <div key={val._id} className='notification-card'>
                        <div className='notification-card-header'>
                            <img src={val.coach_profile_pic} alt='coach profile picture' />
                            <h1>Coach {val.coach_writer}</h1>
                        </div>
                        <div className='notification-card-info'>
                            <div className='n-c-i-header'>
                                {val.typeOfEndpoint == 'createCoachPost' ? <h1>Coach Post</h1> : null}
                            </div>
                            <div className='n-c-i-body'>
                                {/* <h1>{val.dataToSubmit.athlete_id}</h1> */}
                                {/* <h1>{selected_athletes.lastname}</h1> */}
                            </div>
                        </div>
                        <div className='notification-card-buttons'>
                            <button className='not-button-accept' onClick={() => acceptedRequest(val.dataToSubmit, val._id, val.typeOfEndpoint)}>Accept</button>
                            <button className='not-button-reject' onClick={() => rejectedRequest(val._id)}>Reject</button>
                        </div>
                    </div>
                )
            })
        }
     }

    return (
        <div className='notification' >
            <button onClick={handleShow}></button>
            <Modal 
                show={show} 
                onHide={handleClose} 
                dialogClassName={"notification-modal"}
                scrollable={true}
                centered={true}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>Pending Requests</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='notification-modal-body'>
                        {all_requests}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Notifications
