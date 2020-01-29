import React, {useState} from 'react'
import {withRouter, Redirect, NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function LoginSection(props) {
    const user = useSelector(state => state.coach_user)

    const [redirect, setRedirect] = useState(false);

    const logoutHandler = () => {
        axios.get('/api/coach-users/logout').then(res => {
            if(res.status === 200){
                props.history.push('/login')
            } else {
                alert('Logout Failed')
            }
        })
    }

    const toLoginPage = () => {
        setRedirect(true)
        setTimeout(()=> {
            setRedirect(false)
        }, 1000)
    }

    if(user.userData && !user.userData.isAuth){
        return (
            <div className='navbar_real'>
                <div className='nav-links'>
                        <NavLink exact to='/'>Home</NavLink>
                        <NavLink exact to='/athletes'>Athletes</NavLink>
                        <NavLink exact to='/coaches'>Coaches</NavLink>
                </div>
                <div className='login-button'>
                    {redirect ? <Redirect to='/login' /> : null}
                    <button onClick={() => toLoginPage()} >Coach Login</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='navbar_real'>
                <div className='nav-links'>
                        <NavLink exact to='/'>Home</NavLink>
                        <NavLink exact to='/athletes'>Athletes</NavLink>
                        <NavLink exact to='/coaches'>Coaches</NavLink>
                        <NavLink exact to='/coach-dashboard'>Dashboard</NavLink>
                </div>
                <div className='logout-button'>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        )
    } 
    
}

export default withRouter(LoginSection)
