import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import './notifications.css';

import {createCoachPost} from '../../../Redux/actions/coach_to_athlete_actions'
import {removeRequest, getAllRequest} from '../../../Redux/actions/pending_actions'

function Notifications(props) {
    const dispatch = useDispatch()

     // Modal handler for opening and closing modals
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

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

         if(all_pending_requests.length == 0){
            all_requests = (
                <div>
                    No requests sorry
                </div>
             )
         } 
         else {
            all_requests = all_pending_requests.map(val => {
                console.log(val)
                return (
                    <div key={val._id} className='notification-card'>
                        <div className='notification-card-header'>
                            <img src={val.coach_profile_pic} alt='coach profile picture' />
                            <h1>Coach {val.coach_writer}</h1>
                        </div>
                        <div className='notification-card-info'>
                            <div>

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
