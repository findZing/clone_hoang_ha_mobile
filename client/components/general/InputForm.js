import React, { useEffect, useState, memo} from 'react'
import { HiSearch } from 'react-icons/hi'
import Image from 'next/image'
import Link from 'next/link'

// import ModalSearch from './ModalSearch'

import loadingGif from '../../public/loading_icon.gif'

import axiosConfig from '../../axiosConfig'

import { useDispatch, useSelector } from 'react-redux'
import { setOpenModalSearch } from '../../reducers/navbar'

const InputForm = ({ border = false }) => {
    const dispatch = useDispatch()
    // const { openModalSearch } = useSelector(state => state.navbar)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [listResult, setListResult] = useState([])

    const ItemResult = ({item}) => {
        return (
            <Link
                href={`/product/${item.id}`}
                className='w-full h-[100px] py-[10px] flex flex-row justify-start gap-[10px]'
                onClick={() => {
                    dispatch(setOpenModalSearch({ open: false }))
                    setSearch('')
                    setListResult([])
                }}
            >
                <Image
                    alt='img'
                    src={item.images[0]}
                    width={60}
                    height={50}
                    className='object-contain'
                />

                <div className='flex flex-col items-start justify-center gap-[10px]'>
                    <p className='text-[15px] font-[700]'>{item.name}</p>
                    <p className='text-[13px] font-[700] text-price'>{item.price} <span className='underline'>đ</span></p>
                </div>
            </Link>
        )
    }

    const showListResults = () => {
        console.log(listResult)
        if (listResult.length === 0) return (
            <div className='w-full py-[5px] h-[50px]'>
                <p>Không có sản phẩm</p>
            </div>
        )

        return listResult.map((item, i) => {

            if(i > 0 && item.name !== listResult[i-1].name){
                return <ItemResult item={item}/>
            }   
            else if(i == 0){
                return <ItemResult item={item}/>
            }
        }
        )
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axiosConfig()({
                method: 'POST',
                url: `api/v1/product/search?name=${search}`
            })

            console.log(res.data.products)
            setLoading(false)
            setListResult([...res.data.products])

        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)

    }

    const handleSearch = (search) => {
        if (search !== '') {
            setListResult([])
            setSearch(search); 
            fetchData()
            // dispatch(setOpenModalSearch({ open: true }))
            setOpen(true)
        }
        else {
            setListResult([])
        }
    }

    useEffect(() => {
        console.log(search)
        if (search !== '') {
            setListResult([])
            // dispatch(setOpenModalSearch({ open: true }))
            setOpen(true)
            fetchData()
        }
        else {
            setListResult([])
        }
    }, [search])

    return (
        <div className={`max-w-[669px] w-full h-[40px]  bg-white rounded-[20px] px-[10px] py-[5px] relative z-30 ${border ? 'border border-gray-300' : 'drop-shadow-primary'}`}>
            <input
                type='text'
                className='focus:outline-none w-full h-full text-[14px] font-[500]'
                placeholder='Hôm nay bạn cần tìm gì?'
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
            />
            <button className='w-[42px] h-[42px] py-[6px] bg-primary rounded-[17px] absolute right-[8px] bottom-[8px] bg-gradient-to-b from-[#00917a] to-[#00483d] flex justify-center items-center'>
                <HiSearch color='white' size={20} />
            </button>

            {open && (
                <div className={`absolute top-[120%] left-0 right-0 bg-white rounded-[8px] flex flex-col items-center px-[20px] ${listResult.length > 6 && 'h-[500px] overflow-y-auto scroll-bar-location'}`}>
                    {showListResults()}
                </div>
            )}

            {loading && (
                <div className='absolute z-30 top-[110%] right-0 left-0'>
                    <div className='w-full h-[80px] flex justify-center items-center bg-white rounded-[16px]'>
                        <Image
                            alt='gif'
                            src={loadingGif}
                            className='w-[80px] h-[80px] object-contain'
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(InputForm)