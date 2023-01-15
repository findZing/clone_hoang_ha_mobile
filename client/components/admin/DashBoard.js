import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import {HiMenu} from 'react-icons/hi'

import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import {setLogOut} from '../../reducers/admin/auth'

import MenuDashBoard from './MenuDashBoard'
import TabProduct from './TabProduct'
import TabPoster from './TabPoster'
import TabStaff from './TabStaff'

import avatarNone from '../../data/avatar_none.jpg'
import ModalEditProduct from './ModalEditProduct'

import axiosConfig from '../../axiosConfig'

const DashBoard = () => {
    const dispatch = useDispatch()
    const { changeWidth } = useSelector(state => state.app)
    const {selectedTabIndex} = useSelector(state => state.dashboard)
    const {open} = useSelector(state => state.modaleditproduct)

    const [showMenu, setShowMenu] = useState(false)
    const [listProduct, setListProduct] = useState([])
    const [showBtnMenu, setShowBtnMenu] = useState(false)
    useEffect(() => {
        if(changeWidth >= 900) setShowMenu(false)
    }, [changeWidth])
    
    useEffect(() => {
        const requestProduct = async () => {
            const res = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/product/all'
            })

            // const listProduct = res.data.response
            console.log(res.data)
            setListProduct(res.data.products)
        }

        requestProduct()
    }, [])

    useEffect(() => {
        const requestProduct = async () => {
            const res = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/product/all'
            })

            // const listProduct = res.data.products.response
            // console.log(listProduct)
            
            setListProduct(res.data.products)
        }

        if(!open) requestProduct()
    }, [open])

    console.log(changeWidth)
    
    return (
        <div className='w-full h-full flex flex-row'>
            {
                changeWidth >= 900 && (<MenuDashBoard />)
            }
            <div className={`${changeWidth >= 900 && 'ml-[300px]'} w-full h-full flex flex-col`}>
                <div className={`${changeWidth >= 900 ? 'left-[300px] justify-end' : 'left-0 justify-between'} fixed z-20 top-0 right-0 h-[50px] border-b border-gray-400 flex flex-row px-[20px] items-center bg-white`}>
                    {changeWidth < 900 && <HiMenu size={30} className='cursor-pointer' onClick={() => setShowMenu(state => !state)}/>}

                    <div className='w-[30px] h-[30px] rounded-[50%] border border-gray-400 cursor-pointer relative' onClick={() => {setShowBtnMenu(state => !state)}}>
                        <Image
                            alt='img'
                            width={30}
                            height={30}
                            src={avatarNone}
                            className='w-full h-full object-contain rounded-[50%]'
                        />

                        {showBtnMenu && (<div className='absolute top-[150%] right-0 bg-white p-[10px] rounded-[8px] drop-shadow-primary'>
                            <button onClick={() => {dispatch(setLogOut())}}>Logout</button>
                        </div>)}
                    </div>
                </div>
                <div className='bg-window-dashboard mt-[50px] py-[20px] h-full'>
                {selectedTabIndex == 0 && (<TabProduct listProduct={listProduct}/>)}
                {selectedTabIndex == 1 && (<TabPoster />)}
                {selectedTabIndex == 2 && (<TabStaff />)}
                </div>
            </div>

            {showMenu && 
            (
                <div className='bg-contain-modal fixed top-0 right-0 bottom-0 left-0' onClick={() => setShowMenu(false)}>
                    <MenuDashBoard />
                </div>
            )}
            
            {open && <ModalEditProduct />}
        </div>
    )
}

export default DashBoard