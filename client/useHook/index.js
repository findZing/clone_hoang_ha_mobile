import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { setChangeScroll, setChangeWidth } from "../reducers/app"

export const useEventScroll = () => {
    const dispatch = useDispatch()

    const handleScroll = (e) => {
        // console.log('eventScroll')
        dispatch(setChangeScroll({scroll: window.scrollY}))
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
}

export const useEventWidth = () => {
    const dispatch = useDispatch()

    const changeWidth = (e) => {
        // console.log('eventScroll')
        dispatch(setChangeWidth({ width: window.innerWidth }))
    }

    useEffect(() => {
        dispatch(setChangeWidth({ width: window.innerWidth }))

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])
}

