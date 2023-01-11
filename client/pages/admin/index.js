import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import AuthForm from '../../components/admin/AuthForm'
import DashBoard from '../../components/admin/DashBoard'

import { setChangeWidth } from '../../reducers/app'
import { setLogOut, setRefreshToken, setToken } from '../../reducers/admin/auth'

import axiosConfig from '../../axiosConfig'


const AdminPage = () => {
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [logIn, setLogIn] = useState(true)

    console.log(token)
    const changeWidth = () => {
        dispatch(setChangeWidth({ width: window.innerWidth }))
    }

    useEffect(() => {
        dispatch(setChangeWidth({ width: window.innerWidth }))

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    useEffect(() => {
        const apiRequest = async () => {
            const res = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/auth/requestrefreshtoken',
            })
            console.log(res)
            if (res.data.err == 1) dispatch(setLogOut())
            else if (res.data.err == 0) {
                dispatch(setToken({ token: res.data.accessToken }))
                dispatch(setRefreshToken({ refreshToken: res.data.refreshToken }))
            }
        }

        try {
            apiRequest()
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        if (token === '') {
            setLogIn(true)
        }
        else if (token !== '') {
            setLogIn(false)
        }
    }, [token])

    console.log(token)

    return logIn ? (
        <AuthForm />
    ) : (
        <DashBoard />
    )


}

export default AdminPage