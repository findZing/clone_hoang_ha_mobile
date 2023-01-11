import React from 'react'

import { RiProductHuntLine } from 'react-icons/ri'
import { RiAdvertisementLine } from 'react-icons/ri'
import { SiStaffbase } from 'react-icons/si'

import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTabIndex } from '../../reducers/dashBoard'

const MenuDashBoard = () => {
    const dispatch = useDispatch()
    const {selectedTabIndex} = useSelector(state => state.dashboard)

    return (
        <div className='w-[300px] fixed top-0 left-0 bottom-0 h-screen bg-tab-index' onClick={(e) => e.stopPropagation()}>
            <div className='w-full h-[50px] p-[15px] bg-header-tab-index flex items-center justify-center'>
                <p className='text-[18px] text-white font-[700]'>DashBoard</p>
            </div>

            <div className='w-full h-full'>
                <div 
                    className={`w-full h-[70px] px-[15px] flex flex-row items-center gap-[15px] text-white cursor-pointer hover:bg-hover-tab-index ${selectedTabIndex === 0 && 'bg-hover-tab-index'}`}
                    onClick={() => dispatch(setSelectedTabIndex({tab: 0}))}
                >
                    <RiProductHuntLine size={25} />
                    <p>Products Management</p>
                </div>

                <div 
                    className={`w-full h-[70px] px-[15px] flex flex-row items-center gap-[15px] text-white cursor-pointer hover:bg-hover-tab-index ${selectedTabIndex === 1 && 'bg-hover-tab-index'}`}
                    onClick={() => dispatch(setSelectedTabIndex({tab: 1}))}

                >
                    <RiAdvertisementLine size={25} />
                    <p>Posters Management</p>
                </div>

                <div 
                    className={`w-full h-[70px] px-[15px] flex flex-row items-center gap-[15px] text-white cursor-pointer hover:bg-hover-tab-index ${selectedTabIndex === 2 && 'bg-hover-tab-index'}`}
                    onClick={() => dispatch(setSelectedTabIndex({tab: 2}))}
                
                >
                    <SiStaffbase size={25} />
                    <p>Staffers Management</p>
                </div>
            </div>
        </div>
    )
}

export default MenuDashBoard