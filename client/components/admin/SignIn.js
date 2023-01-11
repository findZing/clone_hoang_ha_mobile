import React, { useState } from 'react'
import axiosConfig from '../../axiosConfig'
import InputForm from './InputForm'

import { useDispatch } from 'react-redux'
import { setToken, setLoginOrNot } from '../../reducers/admin/auth'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const dispatch = useDispatch()

    const handleClick = async () => {
        if(password === passwordAgain) {
            const payload = {
                email,
                name,
                password,
                
            }
            try {
                const response = await axiosConfig()({
                    method: 'POST',
                    url: 'api/v1/auth/register',
                    data: payload
                })
    
                dispatch(setToken({ token: response.data.accessToken }))
                // console.log(response.data.accessToken)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='w-[400px] bg-white rounded-[16px] border-gray-400 border-[1px] flex flex-col items-center p-[15px] gap-[15px]'>
            <h2 className='text-[25px] font-bold'>Sign In</h2>

            <InputForm value={email} setValue={setEmail} placeholder='Enter your email' type='text' />
            <InputForm value={name} setValue={setName} placeholder='Enter your name' type='text' />
            <InputForm value={password} setValue={setPassword} placeholder='Enter your password' type='password' />
            <InputForm value={passwordAgain} setValue={setPasswordAgain} placeholder='Enter your password again' type='password' />

            <button onClick={handleClick}>SignIn Now</button>

            <button className='text-[12px] italic' onClick={() => dispatch(setLoginOrNot({loginOrNot: true}))}>Login</button>
        </div>
    )
}

export default SignIn