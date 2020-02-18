import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import './notifications.css';

function Notifications(props) {
     // Modal handler for opening and closing modals
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const requests = useSelector(state => state.pending_reducer.all_request)
     
     let all_requests;
     if(requests){
         const {all_pending_requests} = requests 
         all_requests = all_pending_requests.map(val => {
            //  console.log(val)
             return (
                 <div key={val._id} className='notification-card'>
                    <div className='notification-card-header'>
                        <img src={val.coach_profile_pic} alt='coach profile picture' />
                        <h1>Coach {val.coach_writer}</h1>
                    </div>
                    <div className='notification-card-buttons'>
                        <button className='not-button-accept'>Accept</button>
                        <button className='not-button-reject'>Reject</button>
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
