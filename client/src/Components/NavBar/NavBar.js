import React, { Component } from 'react' 
import {NavLink, Redirect} from 'react-router-dom'
import LoginSection from './LoginSection/LoginSection'
import logo from '../../Media/logo.png'
import './navbar.css'

export class NavBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            redirect: false
        }
    }

    toHomePage = () => {
        this.setState({
            redirect: true
        })

        setTimeout(() => {
            this.setState({
                redirect: false
            })
        }, 1000)
    }

    render() {
        return (
            <div className='navbar'>
                {this.state.redirect ? <Redirect to='/' /> : null}
                <div className='nav-logo'>
                    <img src={logo} alt='futbol training logo' onClick={() => this.toHomePage()} />
                </div>
                <div className='navbar_links'>
                    <LoginSection />
                </div>
            </div>
        )
    }
}

export default NavBar
