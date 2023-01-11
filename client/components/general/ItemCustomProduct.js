import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

import { MdKeyboardArrowDown } from 'react-icons/md'

const ItemCustomProduct = ({ title }) => {
    const data = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'Nokia', 'Realme', 'Vivo', 'Nubia', 'Energizer', 'XOR', 'Masstel', 'TCL', 'Philips', 'Itel', 'BPhone', 'TECNO', 'ZTE',]

    const itemCustomProduct = useRef(null)
    const [mouse, setMouse] = useState(false)
    const [name, setName] = useState('')

    const showListContent = () => {
        let result = []
        let a = []

        data.map((item, i) => {
            a.push(item)
            if (i !== 0 && i % 4 == 0 && data.length / 5 > 1) {
                result.push([...a])
                a = []
            }
            else if (i + 1 == data.length) {
                result.push([...a])
            }
        })

        return result.map((item, i) => {
            // console.log(item)  
            return (
                <div className='flex flex-col items-start'>
                    {
                        item.map((item, i) => {
                            return (
                                <Link href='/'>
                                    <p className='text-[13px]'>{item}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            )
        })
    }

    useEffect(() => {
        const refItem = itemCustomProduct.current

        const handleMouseEnter = () => {
            setMouse(true)
            setName(title)
        }

        const handleMouseLeave = () => {
            setMouse(false)
            setName('')
        }

        refItem.addEventListener('mouseenter', handleMouseEnter)
        refItem.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            refItem.removeEventListener('mouseenter', handleMouseEnter)
            refItem.removeEventListener('mouseleave', handleMouseLeave)
        }
    })
    return (
        <div ref={itemCustomProduct} className='flex flex-row items-center cursor-pointer h-full py-[15px] '>
            <p className='text-[13px] text-primary hover:text-price'>{title}</p>
            <MdKeyboardArrowDown />

            {
                mouse && name == title && (
                    <div className='absolute z-20 top-[100%] left-0 right-0 w-full  rounded-[8px] pt-[10px]'>
                        <div className='max-w-window w-full flex flex-row p-[10px] justify-between bg-white drop-shadow-primary'>
                            {showListContent()}
                        </div>
                    </div>)
            }
        </div>
    )
}

export default ItemCustomProduct