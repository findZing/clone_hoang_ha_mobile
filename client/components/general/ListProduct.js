import React from 'react'
import Link from 'next/link'
import ItemProductCustom from './ItemProductCustom'
import { useSelector } from 'react-redux'

const ListProduct = ({ title, kindProduct, listProduct }) => {
    const list = []
    const {changeWidth} = useSelector(state => state.app)

    if(kindProduct !== '') {
        listProduct.map(item => {
            console.log(item.store)
            if(item.store.includes(kindProduct) || item.name.toLowerCase().search(kindProduct.toLowerCase()) > -1) 
            {
                list.push(item)
            }
        })
    }
    else listProduct.map((item) => {
        list.push(item)
    })

    const showListProduct = () => {
        return list.length > 0 && list.map((item, i) => {
            return <ItemProductCustom
                key={i}
                product={item}
            />
        })
    }

    const ContentList = () => {
        return (
            <Link
            href='/'
            className='relative max-w-[350px] w-full h-[30px] bg-primary content-list border-l-[30px] border-l-[#009981] text-[14px] font-[700] text-white pt-[5px] pr-[60px] pb-[6px] pl-[35px]'
        >
            {title}
        </Link>
        )
    }

    return (
        <div className='w-full flex flex-col gap-[20px]'>
            <ContentList /> 

            <div className='grid grid-cols-5 gap-[10px] max-[1200px]:grid-cols-4 max-[900px]:grid-cols-2'>
                {showListProduct()}
            </div>
        </div>
    )
}

export default ListProduct