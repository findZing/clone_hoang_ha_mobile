import React, {useEffect, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setChangeAmountProduct, setValueAmountProduct } from '../../reducers/navbar'

const ControlAmount = ({item}) => {
    console.log('change 2')
    const dispatch = useDispatch()
    const [value, setValue] = useState(item.amount)

    const handleAdd = (amount) => {
        dispatch(setChangeAmountProduct({product: item.product, amount}))
        setValue(state => state + amount)
    }

    const handleChangeValue = (e) => {
        dispatch(setValueAmountProduct({product: item.product, amount: Number(e.target.value)}))
        setValue(Number(e.target.value))
    }

    useEffect(() => {
        if(item.amount !== value) setValue(item.amount)
    }, [item])
    return (
        <div className='flex flex-row justify-center items-center'>
            <button onClick={() => handleAdd(1)} className='w-[24px] h-[26px] border border-r-0'>+</button>
            <input type='text' className='w-[25px] h-[26px] border focus:outline-none text-[11px] text-center' value={value} onChange={handleChangeValue}/>
            <button onClick={() => handleAdd(-1)} className='w-[24px] h-[26px] border border-l-0'>-</button>
        </div>
    )
}

export default ControlAmount