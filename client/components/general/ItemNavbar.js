import Link from 'next/link'
import React, { useRef, useEffect } from 'react'

import BoxNavbar from './BoxNavbar'

import { useDispatch, useSelector } from 'react-redux'
import { setOpenBox } from '../../reducers/navbar'

import { formatVietnameseToString } from '../../ultils/formatVietnameseToString'

const ItemNavbar = ({ text, icon, change, changeDesktop, content }) => {
    const navbar = useRef(null)
    const dispatch = useDispatch()
    const { openBox, title } = useSelector(state => state.navbar)

    useEffect(() => {
        const navBarRef = navbar.current

        const handleMouseEnter = () => {
            console.log('enter', text)
            dispatch(setOpenBox({ open: true, title: text }))
        }

        const handleMouseLeave = () => {
            console.log('leave', text)
            dispatch(setOpenBox({ open: false, title: text }))
        }

        navBarRef.addEventListener('mouseenter', handleMouseEnter)
        navBarRef.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            navBarRef.removeEventListener('mouseenter', handleMouseEnter)
            navBarRef.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div>
            {
                changeDesktop ? (
                    <Link ref={navbar} href={`/${formatVietnameseToString(text)}`}>
                        {
                            change ? (
                                <div className='flex flex-row items-center gap-[4px] text-white px-[8px] cursor-pointer'>
                                    <div>{icon()}</div>
                                    <div className='text-[12px]'>{text}</div>
                                </div>
                            )
                                :
                                (
                                    <div className='flex flex-col items-center text-white px-[12px] cursor-pointer hover:hover-button-b'>
                                        <div className='text-[30px]'>{icon()}</div>
                                        <div className='w-full text-[10px] uppercase '>{text}</div>
                                    </div>
                                )
                        }
                        {openBox && title === text && <BoxNavbar change={change} content={content} />}

                    </Link>
                )
                    :
                    (<Link href={`/${formatVietnameseToString(text)}`} className='h-[100px] flex flex-col items-center gap-[5px] justify-start'>
                        <div className='w-[52px] h-[52px] bg-primary rounded-[50%] flex justify-center items-center text-white'>
                            <div>{icon()}</div>
                        </div>

                        <span className='text-[10px] font-[700]'>{text}</span>
                    </Link>
                    )
            }
        </div>
    )
}

export default ItemNavbar