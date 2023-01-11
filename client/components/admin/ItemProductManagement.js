import React from 'react'
import ItemProductPrimary from '../product/ItemProductPrimary'

import {FaEdit} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setOpen } from '../../reducers/admin/modalEditProduct'

const ItemProductManagement = ({ product }) => {
    const dispatch = useDispatch()

    return (
        <div className='max-w-[230px] w-full rounded-[8px] border border-gray-400 flex items-center justify-center relative'>
            <ItemProductPrimary product={product} />

            <FaEdit className='absolute top-[5px] right-[5px] cursor-pointer' size={30} color='' onClick={() => dispatch(setOpen({open: true, hasBeen: true, product: product}))}/>
        </div>
    )
}

export default ItemProductManagement