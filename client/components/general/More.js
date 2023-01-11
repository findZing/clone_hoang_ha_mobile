import React from 'react'

import {HiOutlineBadgeCheck} from 'react-icons/hi'
import {RiLuggageCartLine} from 'react-icons/ri'
import {SlEarphonesAlt} from 'react-icons/sl'
import {BsArrowRepeat} from 'react-icons/bs'

const More = () => {
    return (
        <div className='flex flex-row flex-wrap justify-around items-center w-full p-[10px] bg-white m-[10px]'>
            <div className='w-[190px] h-[78px] flex flex-row pt-[10px] pl-[10px] pb-[15px] gap-[5px]'>
                <HiOutlineBadgeCheck color='#00917a' size={50}/>

                <div className='flex flex-col items-start'>
                    <span className='text-[13px]'>Sản phẩm</span>
                    <span className='text-[16px] font-[700] uppercase'>Chính hãng</span>
                </div>
            </div>
            <div className='w-[190px] h-[78px] flex flex-row pt-[10px] pl-[10px] pb-[15px] gap-[5px]'>
                <RiLuggageCartLine color='#00917a' size={50}/>

                <div className='flex flex-col items-start'>
                    <span className='text-[13px]'>Miễn phí vận chuyển</span>
                    <span className='text-[16px] font-[700] uppercase'>TOÀN QUỐC</span>
                </div>
            </div>
            <div className='w-[190px] h-[78px] flex flex-row pt-[10px] pl-[10px] pb-[15px] gap-[5px]'>
                <SlEarphonesAlt color='#00917a' size={50}/>

                <div className='flex flex-col items-start'>
                    <span className='text-[13px]'>Hotline hỗ trợ</span>
                    <span className='text-[16px] font-[700] uppercase'>1900.2091</span>
                </div>
            </div>
            <div className='w-[190px] h-[78px] flex flex-row pt-[10px] pl-[10px] pb-[15px] gap-[5px]'>
                <BsArrowRepeat color='#00917a' size={50}/>

                <div className='flex flex-col items-start'>
                    <span className='text-[13px]'>Thủ tục đổi trả</span>
                    <span className='text-[16px] font-[700] uppercase'>DỄ DÀNG</span>
                </div>
            </div>
        </div>
    )
}

export default More