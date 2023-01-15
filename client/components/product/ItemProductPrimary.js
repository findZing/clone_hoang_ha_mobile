import React from 'react'
import Image from 'next/image'

const ItemProductPrimary = ({ product }) => {
    return (
        <div className='w-full px-[8px] flex flex-col items-center pt-[30px] pb-[15px]'>
            <Image
                width={150}
                height={187.5}
                src={product?.images[0]}
                alt='img'
            />

            <div className='w-full flex flex-col items-center mt-[8px] mb-[20px]'>
                <p className='text-[13px] font-[700] text-center break-all'>{product.name}</p>
                <p className='text-[16px] text-price font-[700]'>{product.price} <span className='underline'>đ</span></p>
            </div>

            <p className='text-start'>
                <span className='bg-prompt text-[11px] text-white p-[4px] rounded-[4px]'>KM</span>
                <label className='text-[13px]'>Giảm thêm tới 1.000.000đ khi mở thẻ...</label>
                <span className='text-[13px] font-[700] text-prompt'>VÀ 7 KM KHÁC</span>
            </p>
        </div>
    )
}

export default ItemProductPrimary