import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import ItemProductManagement from './ItemProductManagement'

import { useDispatch } from 'react-redux'
import { setOpen } from '../../reducers/admin/modalEditProduct'

const TabProduct = ({ listProduct }) => {
    // const product = {
    //     images: ['https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/33333.png', 'https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/222222.png'],
    //     name: 'Apple iPhone 14 Pro Max - 256GB - Chính hãng VN/A',
    //     price: '33,390,000',
    //     store: ''
    // }

    const [searchProduct, setSearchProduct] = useState('')

    const dispatch = useDispatch()

    const showListProduct = () => {
        return listProduct?.length > 0 && listProduct.map((item, index) => {
            if (index > 0 && item.name !== listProduct[index - 1].name) {
                if(searchProduct === '') return <ItemProductManagement product={item} key={index} />
                else if(item?.name?.toLowerCase().search(searchProduct.toLocaleLowerCase()) > -1 ) return <ItemProductManagement product={item} key={index} />
            }
            else if (index == 0) {
                if(searchProduct === '') return <ItemProductManagement product={item} key={index} />
                else if(item?.name?.toLowerCase().search(searchProduct.toLocaleLowerCase()) > -1 ) return <ItemProductManagement product={item} key={index} />
            }
        })
        // console.log(list.length)
        // if(searchProduct == '') return list
        // return list?.length > 0 && list.map((item, index) => {
        //     console.log(item?.props.product?.name)
        //     if(item?.props.product?.name?.search(searchProduct.toLowerCase()) > -1) return <ItemProductManagement product={item} key={index} /> 
        // })

        // return filterListProduct(listProduct, searchProduct)
    }

    return (
        <div className='max-w-[1200px] w-full mx-auto bg-white rounded-[16px] px-[15px] py-[20px] flex flex-col gap-[30px]'>
            <div className='flex flex-row items-center justify-center gap-[15px]'>
                <div className='max-w-[300px] w-full h-[40px] bg-white rounded-[20px] flex items-center justify-center px-[12px] drop-shadow-primary relative'>
                    <input
                        type='text'
                        className='w-full bg-white focus:outline-none py-[5px] text-[13px]'
                        placeholder='Search product'
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                    />

                    <div className='absolute bottom-2 right-2 w-[42px] h-[42px] rounded-[16px] bg-gradient-to-b from-[#00917a] to-[#00483d] flex justify-center items-center'>
                        <AiOutlineSearch color='white' size={25} />
                    </div>
                </div>

                <div className='w-[42px] h-[42px] rounded-[16px] bg-gradient-to-b from-[#00917a] to-[#00483d] flex justify-center items-center'>
                    <IoMdAdd color='white' size={25} className='cursor-pointer' onClick={() => dispatch(setOpen({ open: true, hasBeen: false }))} />
                </div>


            </div>

            <div className='w-full h-full grid grid-cols-5 gap-x-2 gap-y-5'>
                {/* <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/>
                <ItemProductManagement product={product}/> */}
                {showListProduct()}

            </div>
        </div>
    )
}

export default TabProduct