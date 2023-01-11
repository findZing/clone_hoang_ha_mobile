import Link from 'next/link'
import React, { useState } from 'react'

import { AiFillCaretRight } from 'react-icons/ai'
import { AiFillCaretDown } from 'react-icons/ai'

import { formatVietnameseToString } from '../../ultils/formatVietnameseToString'

const ItemMenuNavbar = ({ icon, text, content }) => {
    const [click, setClick] = useState(false)

    const showListContent = (list) => {
        let result = []
        let a = []

        list.map((item, i) => {
            a.push(item)
            if (i !== 0 && i % 6 == 0 && list.length / 6 > 1) {
                result.push([...a])
                a = []
            }
            else if (i + 1 == list.length) {
                result.push([...a])
            }
        })

        return result.map((item, i) => {
            // console.log(item)  
            return (
                <div className='flex flex-col items-start' key={i}>
                    {
                        item.map((item, i) => {
                            return (
                                <span key={i} className='text-[13px]'>
                                    {item}
                                </span>
                            )
                        })
                    }
                </div>
            )
        })
    }

    const showContent = () => {
        return (
            <div className='w-full h-full flex flex-col items-start' >
                {
                    content.map((item, i) => {
                        return (
                            <div className='w-full flex flex-col items-start border-b border-gray-300' key={i}>
                                <div className='w-full h-[42px] p-[6px] flex justify-center items-center bg-window'>
                                    <h3 className='text-[13px] font-[700]'>{item.title}</h3>
                                </div>
                                <div className='w-full flex flex-row justify-around gap-[20px]'>
                                    {
                                        showListContent(item.list)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full h-[46px] pt-[8px] pr-[10px] pb-[5px] pl-[15px] bg-white flex flex-row items-center justify-between  border-b-[0.5px] border-gray-400'>
                <Link href={`/${formatVietnameseToString(text)}`} className='flex flex-row items-center gap-[10px] font-[700] text-second text-[15px]'>
                    {icon()}
                    {text}
                </Link>

                {click ? <AiFillCaretDown onClick={() => setClick(false)} /> : <AiFillCaretRight onClick={() => setClick(true)} />}
            </div>
            {click && showContent()}

            
        </div>
    )
}

export default ItemMenuNavbar