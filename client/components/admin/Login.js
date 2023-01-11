import React, { useState } from 'react'
import axiosConfig from '../../axiosConfig'
import InputForm from './InputForm'

import { useDispatch } from 'react-redux'
import { setToken, setLoginOrNot, setRefreshToken } from '../../reducers/admin/auth'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleClick = async () => {
        const payload = {
            email,
            password,
        }
        try {
            const response = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/auth/login',
                data: payload
            })

            dispatch(setToken({ token: response.data.accessToken }))
            dispatch(setRefreshToken({ refreshToken: response.data.refreshToken}))
            // console.log(response.data.accessToken)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-[400px] bg-white rounded-[16px] border-gray-400 border-[1px] flex flex-col items-center p-[15px] gap-[15px]'>
            <h2 className='text-[25px] font-bold'>Login</h2>

            <InputForm value={email} setValue={setEmail} placeholder='Enter your email' type='text' />
            <InputForm value={password} setValue={setPassword} placeholder='Enter your password' type='password' />

            <button onClick={handleClick}>Login Now</button>

            <button className='text-[12px] italic' onClick={() => dispatch(setLoginOrNot({loginOrNot: false}))}>SignIn</button>

        </div>
    )
}

export default Login