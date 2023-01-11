import React, { useState } from 'react'
import Login from './Login'
import SignIn from './SignIn'

import { useSelector } from 'react-redux'

const AuthForm = () => {
    const {loginOrNot} = useSelector(state => state.auth)

    console.log(loginOrNot)
    return (
        <div className='w-screen h-screen bg-window flex items-center justify-center'>
            {
                loginOrNot ? <Login /> : <SignIn />
            }
        </div>
    )
}

export default AuthForm