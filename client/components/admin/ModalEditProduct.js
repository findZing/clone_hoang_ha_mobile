import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../../reducers/admin/modalEditProduct'
import { setToken, setRefreshToken, setLogOut } from '../../reducers/admin/auth'
import InputForm from './InputForm'

import { CiCircleRemove } from 'react-icons/ci'
import axiosConfig from '../../axiosConfig'

const ModalEditProduct = ({  }) => {
    const dispatch = useDispatch()

    const { token } = useSelector(state => state.auth)
    const {hasBeen, product} = useSelector(state => state.modaleditproduct)

    const [message, setMessage] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState('')
    const [storeProduct, setStoreProduct] = useState('')
    const [imageProduct, setImageProduct] = useState('')

    const [listImage, setListImage] = useState([])
    const [listStore, setListStore] = useState([])

    const handleLoadProduct = async () => {
        if(nameProduct === '') 
        {
            setMessage('Fill out or cann\'t load product')
            return 0
        }
        const payload = {
            name: nameProduct,
            price: priceProduct,
            store: listStore,
            images: listImage
        }

        let res = await axiosConfig(token)({
            method: 'POST',
            url: 'api/v1/product/add',
            data: payload
        })
        
        console.log(res)
        if (res.data.err == 1) {
            res = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/auth/requestrefreshtoken',
            })
            // console.log(res)
            if (res.data.err == 1) dispatch(setLogOut())
            else if (res.data.err == 0) {
                dispatch(setToken({ token: res.data.accessToken }))
                dispatch(setRefreshToken({ refreshToken: res.data.refreshToken }))
            }


            res = await axiosConfig(token)({
                method: 'POST',
                url: 'api/v1/product/load',
                data: payload
            })
        }
        setMessage(res.data.msg)
    }

    const handleUpdateProduct = async () => {
        const payload = {
            name: nameProduct,
            price: priceProduct,
            store: listStore,
            images: listImage,
        }

        const res = await axiosConfig(token)({
            method: 'POST',
            url: 'api/v1/product/update',
            data: payload
        })

        console.log(res)
        if (res.data.err == 1) {
            const res = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/auth/requestrefreshtoken',
            })
            // console.log(res)
            if (res.data.err == 1) dispatch(setLogOut())
            else if (res.data.err == 0) {
                dispatch(setToken({ token: res.data.accessToken }))
                dispatch(setRefreshToken({ refreshToken: res.data.refreshToken }))
            }


            await axiosConfig(token)({
                method: 'POST',
                url: 'api/v1/product/update',
                data: payload
            })
        }
    }

    const handleDeleteProduct = async () => {
        const payload = {
            name: product.name,
        }

        let res = await axiosConfig(token)({
            method: 'POST',
            url: 'api/v1/product/delete',
            data: payload
        })

        if (res.data.err == 1) {
            const res = await axiosConfig()({
                method: 'POST',
                url: 'api/v1/auth/requestrefreshtoken',
            })
            // console.log(res)
            if (res.data.err == 1) dispatch(setLogOut())
            else if (res.data.err == 0) {
                dispatch(setToken({ token: res.data.accessToken }))
                dispatch(setRefreshToken({ refreshToken: res.data.refreshToken }))
            }


            await axiosConfig(token)({
                method: 'POST',
                url: 'api/v1/product/delete',
                data: payload
            })
        }

    }
    const showListStore = () => {
        return listStore.length > 0 && listStore.map((store, index) => {
            return (
                <div key={index} className='w-[50px] h-[20px] rounded-[20px] relative border border-gray-400 px-[5px]'>
                    <p className='text-[11px]'>{store}</p>
                    <CiCircleRemove size={15} className='absolute top-[-4px] right-[-4px] cursor-pointer' onClick={() => { setListStore(state => { let array = [...state]; console.log('remove', index); array.splice(index, 1); return array }) }} />

                </div>
            )
        })
    }

    const showListImage = () => {
        return listImage.length > 0 && listImage.map((image, index) => {
            return (
                <div key={index} className='w-[50px] h-[50px] relative'>
                    <Image
                        width={50}
                        height={50}
                        alt='img'
                        src={image}
                    // className='object-cover'
                    />

                    <CiCircleRemove size={15} className='absolute top-[-2px] right-[-2px] cursor-pointer' onClick={() => { setListImage(state => { let array = [...state]; console.log('remove', index); array.splice(index, 1); return array }) }} />
                </div>
            )
        })
    }

    useEffect(() => {
        // console.log(product.images.image)
        if(hasBeen){
            setNameProduct(product.name)
            setPriceProduct(product.price)
            // setStoreProduct(product.store)
            setListStore(product.store)
            setImageProduct(product.images[0])
            setListImage(product.images)
        }
    }, [])

    return (
        <div className='fixed top-0 right-0 bottom-0 left-0 bg-contain-modal z-30 flex items-center justify-center' onClick={() => dispatch(setOpen({ open: false }))}>
            <div className='w-[500px] bg-white rounded-[16px] p-[25px] pt-[15px] flex flex-col items-center gap-[8px]' onClick={(e) => e.stopPropagation()}>
                <h1 className='text-[20px] font-[700]'>Edit Product</h1>

                <div className='flex flex-row justify-between items-center w-[80%] gap-[20px]'>
                    <p>Name</p>
                    <InputForm
                        type='text'
                        placeholder='Name of product'
                        value={nameProduct}
                        setValue={setNameProduct}
                        widthChange={300}

                    />
                </div>

                <div className='flex flex-row justify-between items-center w-[80%] gap-[20px]'>
                    <p>Price</p>
                    <InputForm
                        type='text'
                        placeholder='Price of product'
                        value={priceProduct}
                        setValue={setPriceProduct}
                        widthChange={300}
                    />
                </div>

                <div className='flex flex-row justify-between items-center w-[80%] gap-[20px]'>
                    <p>Store</p>
                    <InputForm
                        type='text'
                        placeholder='Store of product'
                        value={storeProduct}
                        setValue={setStoreProduct}
                        widthChange={300}
                        onKeyUp={(e) => {
                            if(e.key === 'Enter') {
                                setListStore(state => [...state, storeProduct])
                                setStoreProduct('')
                            }
                        }}
                    />
                </div>
                
                <div className='flex flex-row flex-wrap items-center gap-[10px]'>
                    {
                        showListStore()
                    }
                </div>

                <div className='flex flex-row justify-between items-center w-[80%] gap-[20px]'>
                    <p>Image</p>
                    <InputForm
                        type='text'
                        placeholder='Store of product'
                        value={imageProduct}
                        setValue={setImageProduct}
                        widthChange={300}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                setListImage(state => [...state, imageProduct])
                                setImageProduct('')
                            }
                        }}
                    />
                </div>

                <div className='flex flex-row flex-wrap items-center'>
                    {
                        showListImage()
                    }
                </div>
                
                <span>{message}</span>
                <div className='w-full flex flex-row justify-end gap-[10px]'>
                    
                    {!hasBeen && <button onClick={handleLoadProduct}>Load</button>}
                    {hasBeen && <button onClick={handleUpdateProduct}>Update</button>}
                    {hasBeen && <button onClick={handleDeleteProduct}>Delete</button>}
                </div>
            </div>
        </div>
    )
}

export default ModalEditProduct