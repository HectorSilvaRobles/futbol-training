import React, {useState} from 'react';
import './highlightupload.css'
import {FaPlus} from 'react-icons/fa'
import {storage} from '../../../firebaseConfig'
import {ProgressBar} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'

import AthleteSelect from '../AthleteSelect/AthleteSelect'

function HighlightUpload(props){
    const coach_user = useSelector(state => state.coach_user.userData)
    const [selectedAthletes, setSelectedAthletes ] = useState([])

    // video upload states
    const [error, setError] = useState(false)
    const [url, setUrl] = useState(null)
    const [progress, setProgress]= useState(0)
   

    // make the square component act as a input with file type
    const squareAsInput = () => {
       document.getElementsByName('highlightupload')[0].click()
    }


    // For selected athletes 
    const callBackSelectedAthletes = (athlete_id) => {
        if(!selectedAthletes.includes(athlete_id)){
            var joined = selectedAthletes.concat(athlete_id)
            setSelectedAthletes(joined)
        } else {
            var remove = selectedAthletes.filter(e => e !== athlete_id)
            setSelectedAthletes(remove)
        }

    }


    // For uploading the video 
    const handleUploadChange = (event) => {
        const file = event.target.files[0]

        if(file){
            const filetype = file['type'];
            const validVideoFile = ['video/mp4']

            if(validVideoFile.includes(filetype)){
                const uploadVideo = storage.ref(`highlights/videos/${file.name}`).put(file)

                uploadVideo.on(
                    'state_changed', 

                    snapshot => {
                        let uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgress(uploadProgress)

                    },

                    error => setError(error),

                    () => {
                        storage.ref('highlights/videos').child(file.name).getDownloadURL()
                        .then(url => setUrl(url))
                })
            } else {
                setError('error tyring to upload video')
            }
        }
    }



    const handleSubmit = () => {
        const {lastname} = coach_user
        if(progress < 100){
            toast.error('Wait until the video is fully uploaded')
        } else if(selectedAthletes.length == 0){
            toast.error('Please select an athlete')
        }
        console.log(url)
    }

    console.log(coach_user)

    return (
        <div className='highlight-upload'>
             <div className='upload-video'>
                <div className='upload-video-square' onClick={() => squareAsInput()} >
                    <FaPlus size={90} color={'#707070'}/>
                </div>
                {<ProgressBar now={progress} label={`${progress}%`} className='upload-progress-bar'/>}
                <label className='custom-file-upload'>
                    <input type='file' onChange={handleUploadChange} name='highlightupload' />
                    Upload Video
                </label>
             </div>
             <AthleteSelect callBack={callBackSelectedAthletes} />
            <button className='rating-button' onClick={handleSubmit} >Upload Highlight</button>
        </div>
    )
}

export default HighlightUpload