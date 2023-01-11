import Link from 'next/link'
import React from 'react'
import ItemProductPrimary from '../product/ItemProductPrimary'

const ItemProductCustom = ({product}) => {
    return (
        <Link href={`/product/${product._id}`} className='bg-white rounded-[8px]'>
            <ItemProductPrimary product={product}/>
        </Link>
    )
}

export default ItemProductCustom