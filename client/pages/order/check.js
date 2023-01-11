import React, { useState } from 'react'
import Layout from '../../components/general/Layout'

const CheckRecipt = () => {
    const [value, setValue] = useState('')

    return (
        <Layout>
        <div className='w-full flex flex-col items-center my-[20px] gap-[15px]'>
            <h1 className='text-[27px] font-[700]'>Kiểm tra đơn hàng của bạn</h1>
            <div className='max-w-[540px] w-full h-[36px]'>
                <input
                    type='text'
                    className='w-full h-full px-[20px] py-[10px] text-[13px] bg-[#E5E5E5] rounded-[8px] focus:outline-none'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Vui lòng nhập mã đơn hàng *'
                />
            </div>

            <button className='w-[180px] h-[48px] bg-gradient-to-b from-[#009981] to-[#00483d] rounded-[8px]'><span className='text-[15px] text-white font-[700]'>TRA CỨU</span></button>
        </div>
        </Layout>
    )
}

export default CheckRecipt