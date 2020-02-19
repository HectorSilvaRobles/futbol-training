import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import './notifications.css';

import {createCoachPost} from '../../../Redux/actions/coach_to_athlete_actions'
import {removeRequest, getAllRequest} from '../../../Redux/actions/pending_actions'

function Notifications(props) {
     // Modal handler for opening and closing modals
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     let requests = useSelector(state => state.pending_reducer.all_request);

     // If pending request is accepted 
     const acceptedRequest = (dataToSubmit, request_id, type_of_endpoint) => {
        console.log(dataToSubmit)
        console.log(request_id)
        console.log(type_of_endpoint)
     }

     console.log(requests.all_pending_requests)

     // If pending request is rejected
     const rejectedRequest = (request_id, coach_name) => {
        console.log(request_id, coach_name)
        removeRequest(request_id)
     }
     
     let all_requests;
     if(requests){
         const {all_pending_requests} = requests 
         all_requests = all_pending_requests.map(val => {
             return (
                 <div key={val._id} className='notification-card'>
                    <div className='notification-card-header'>
                        <img src={val.coach_profile_pic} alt='coach profile picture' />
                        <h1>Coach {val.coach_writer}</h1>
                    </div>
                    <div className='notification-card-buttons'>
                        <button className='not-button-accept' onClick={() => acceptedRequest(val.dataToSubmit, val._id, val.typeOfEndpoint)}>Accept</button>
                        <button className='not-button-reject' onClick={() => rejectedRequest(val._id, val.coach_writer)}>Reject</button>
                    </div>
                 </div>
             )
         })
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
