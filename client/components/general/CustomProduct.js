import React from 'react'
import ItemCustomProduct from './ItemCustomProduct'

const CustomProduct = () => {
  
  return (
    <div className='w-full h-[47.6px] bg-white rounded-[8px] drop-shadow-primary flex flex-row items-center justify-end px-[20px] relative gap-8 z-10'>
        <p className='text-[13px] text-hover font-[700]'>Lọc danh sách:</p>

        <ItemCustomProduct title='Danh mục'/>
        <ItemCustomProduct title='Thương hiệu'/>
        <ItemCustomProduct title='Giá'/>
    </div>
  )
}

export default CustomProduct