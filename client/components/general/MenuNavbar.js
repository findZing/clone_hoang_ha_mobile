import React from 'react'
 
import {RxAvatar} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'

import { useDispatch } from 'react-redux'
import { setOpenMenuNavbar } from '../../reducers/navbar'

import { contentItemNavbar } from '../../data/dummy'
import { navBarData } from '../../data/dummy'

import ItemMenuNavbar from './ItemMenuNavbar'

const MenuNavbar = () => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenMenuNavbar({open: false}))
    }

    const showListTitle = () => {
        const arrayIcons = navBarData[0]

        return arrayIcons.map((item, index) => {
            return <ItemMenuNavbar icon={() => item()} text={navBarData[1][index]} content={contentItemNavbar[index]}/>
        })
    }

    return (
        <div className='fixed top-0 right-0 bottom-0 left-0 z-50 bg-contain-modal flex flex-row justify-start '>
            <AiOutlineClose className='absolute top-5 right-5 ' color='#00483D' size={50} onClick={handleClose}/>
            <div className='w-[70%] h-full bg-white flex flex-col overflow-y-auto'>
                <div className='w-full h-[95px] bg-primary flex flex-row items-center px-[15px] gap-[8px]'>
                    <RxAvatar size={70} color='white'/>

                    <div className='flex flex-col items-start justify-center gap-[5px]'>
                        <p className='text-[15px] text-white font-bold'>Đăng nhập</p>
                        <p className='text-[13px] text-white italic'>Đăng nhập để nhập nhiều ưu đãi</p>
                    </div>
                </div>
                {showListTitle()}
            </div>

        </div>
    )
}

export default MenuNavbar