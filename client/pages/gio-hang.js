import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SlArrowLeft } from 'react-icons/sl'
import { FiCheckCircle } from 'react-icons/fi'
import { AiFillMinusCircle } from 'react-icons/ai'
import { FaRegDotCircle } from 'react-icons/fa'
import { BsCircle } from 'react-icons/bs'

import { useSelector } from 'react-redux'
import { imgCart } from '../data/dummy'
import ControlAmount from '../components/general/ControlAmount'
import { to_vietnamese } from '../ultils/convertNumberToVietnameseText'

import { deleteProduct } from '../reducers/navbar'
import { useDispatch } from 'react-redux'
import Layout from '../components/general/Layout'

const CartPage = () => {
    const dispatch = useDispatch()

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [locationCity, setLocationCity] = useState(1)
    const [locationDistrict, setLocationDistrict] = useState('')
    const [locatioRevice, setLocatioRevice] = useState('')
    const [locationStore, setLocationStore] = useState('')
    const [notification, setNotification] = useState('')

    const [checkHome, setCheckHome] = useState(true)
    const [checkStore, setCheckStore] = useState(false)

    const [checkReceipt, setCheckReceipt] = useState(true)

    const { amountProduct } = useSelector(state => state.navbar)
    let totalPrice = 0

    console.log(amountProduct)
    const showListProduct = () => {
        return amountProduct.length > 0 && amountProduct.map((item, i) => {
            // console.log(Number(item.product.price.replace(/[^0-9.-]+/g,"")))
            console.log('change 1')
            totalPrice += Number(item.product.price.replace(/[^0-9.-]+/g, "")) * item.amount
            return (
                <div className='w-full p-[15px] bg-white drop-shadow-primary flex flex-row rounded-[16px]'>
                    <div className='w-[180px] flex flex-col items-center'>
                        <Image
                            src={item.product.images[0]}
                            alt='img'
                            width={126}
                            height={157.5}
                            className='object-contain'
                        />

                        <p className='text-[13px] font-[700] break-all'>{item.product.name}</p>
                        <strong className='text-[16px] text-price'>{item.product.price} <span className='underline'>??</span></strong>

                        <p className='text-[11px] text-[#888888]'>S??? l?????ng</p>
                        <ControlAmount item={item} />
                    </div>

                    <div className='max-w-[422px] w-full flex flex-col relative'>
                        <AiFillMinusCircle onClick={() => { dispatch(deleteProduct({ product: item.product })) }} size={20} color='#FD5465' className='absolute top-[-10px] right-[-10px] cursor-pointer' />

                        {showListPromotion()}
                    </div>
                </div>
            )
        })
    }

    const showListPromotion = () => {
        return [
            'Thu c?? ?????i m???i gi???m t???i 1.000.000??',
            'T???ng esim data Mobifone Hera 5G (2GB/ng??y) (Ch??a bao g???m th??ng ?????u ti??n) - L??u ??: ch??? ??p d???ng mua tr???c ti???p t???i c???a h??ng.',
            '??u ????i gi???m th??m 100.000?? khi mua Microsoft Office k??m Laptop, Macbook, M??y t??nh b???ng, ??i???n tho???i ',
            'Gi???m 5% (T???i ??a 100.000??), khi thanh to??n t???i h??? th???ng qua v?? ??i???n t??? Moca tr??n ???ng d???ng Grab [Nh???p M?? HHMOCA11] - Kh??ng ??p d???ng c??ng KM kh??c - S??? l?????ng c?? h???n',
            'Gi???m th??m t???i 1.000.000?? khi m??? th??? t??n d???ng ?????ng th????ng hi???u TPBank EVO'
        ].map((item, i) => (
            <div className='flex flex-col items-start gap-[8px] mb-[15px]'>
                <span className='text-[11px] text-white bg-orange-yellow px-[5px] py-[3px] rounded-[4px]'>KM{i + 1}</span>

                <div className='w-full px-[10px] pt-[8px] pb-[5px] border border-gray rounded-[4px] flex flex-row gap-[8px] items-center'>
                    <div className='w-[20px] h-[20px]'>
                        <FaRegDotCircle size={20} color='#00483D' />
                    </div>
                    <p className='text-[13px]'>{item}</p>
                </div>
            </div>
        ))
    }

    return (
        <Layout>
        <div className='w-full flex flex-col my-[20px]'>
            <section className='w-full flex justify-start'>
                <Link href='/' className='flex flex-row items-center text-[15px] text-[#555555] font-[700]'>
                    <SlArrowLeft size={30} color='#00483d' />
                    Quay l???i
                </Link>
            </section>

            {
                amountProduct.length === 0 ? (
                    <section className='w-full flex flex-col items-center'>
                        <FiCheckCircle size={60} color='#00483d' />
                        <span className='font-[700]'>Gi??? h??ng</span>
                        <div className=''>
                            <Image
                                alt='img'
                                src={imgCart}
                                width='592'
                                height='333'
                                className='object-contain'
                            />
                        </div>
                    </section>
                ) :
                    (
                        <section className='flex flex-row max-[1200px]:flex-col max-[1200px]:items-center flex-wrap gap-[50px]'>
                            <div className='max-w-[672px] w-full flex flex-col items-center gap-[20px]'>
                                <FiCheckCircle size={60} color='#00483d' />
                                <span className='font-[700]'>Gi??? h??ng</span>

                                {showListProduct()}

                                <div className='w-full h-[125px] p-[15px] bg-white rounded-[16px] drop-shadow-primary flex flex-col items-start gap-[4px]'>
                                    <p className='text-[13px] font-[700] text-[#333333]'>T???ng gi?? tr???: {totalPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}</p>

                                    <p className='text-[13px] font-[700] text-[#333333]'>Gi???m gi??: -00 ???</p>
                                    <p className='text-[13px] font-[700] text-[#333333]'>T???ng thanh to??n: <span className='text-price'>{totalPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}</span></p>

                                    <p className='capitalize text-[13px] italic'>{to_vietnamese(totalPrice) + ' ?????ng'}</p>
                                </div>
                            </div>

                            <div className='max-w-[448px] w-full mt-[70px] flex flex-col items-center gap-[15px]'>
                                <h3 className='text-[20px] font-[700] mb-[25px]'>Th??ng tin ?????t h??ng</h3>
                                <span className='text-[13px] text-[#AAAAAA] italic'>B???n c???n nh???p ?????y ????? c??c tr?????ng th??ng tin c?? d???u *</span>

                                <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                    <input
                                        type='text'
                                        className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                        placeholder='H??? v?? t??n *'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                    <input
                                        type='tel'
                                        className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                        placeholder='S??? ??i???n tho???i *'
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                    <input
                                        type='email'
                                        className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <p className='text-[13px] font-[700] text-start w-full'>H??nh th???c nh???n h??ng</p>

                                <div className='w-full flex flex-row justify-between'>
                                    <div onClick={() => { if (!checkHome) { setCheckHome(state => !state); setCheckStore(state => !state) } }} className='w-[204px] h-[49px] border rounded-[8px] px-[10px] pt-[10px] pb-[5px] flex flex-row items-center cursor-pointer'>
                                        {checkHome ? <FaRegDotCircle size={20} color='#00483D' /> : <BsCircle size={20} />}
                                        <span className='text-[13px]'>Nh???n h??ng t???i nh??</span>
                                    </div>

                                    <div onClick={() => { if (!checkStore) { setCheckHome(state => !state); setCheckStore(state => !state) } }} className='w-[204px] h-[49px] border rounded-[8px] px-[10px] pt-[10px] pb-[5px] flex flex-row items-center cursor-pointer'>
                                        {checkStore ? <FaRegDotCircle size={20} color='#00483D' /> : <BsCircle size={20} />}
                                        <span className='text-[13px]'>Nh???n h??ng t???i c???a h??ng</span>
                                    </div>
                                </div>

                                {checkHome ? (
                                    <div className='w-full flex flex-col items-center gap-[15px]'>
                                        <div className='w-full flex flex-row justify-between'>
                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationCity} onChange={e => setLocationCity(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>T???nh/Th??nh ph??? *</option>
                                                    <option value={1}>H?? N???i</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>H???i D????ng</option>
                                                    <option value={4}>H???i Ph??ng</option>
                                                    <option value={5}>H??ng Y??n</option>
                                                </select>
                                            </div>

                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationDistrict} onChange={e => setLocationDistrict(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>Qu???n/Huy???n</option>
                                                    <option value={1}>H?? N???i</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>H???i D????ng</option>
                                                    <option value={4}>H???i Ph??ng</option>
                                                    <option value={5}>H??ng Y??n</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                            <input
                                                type='tel'
                                                className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                                placeholder='?????a ch??? nh???n h??ng *'
                                                value={locatioRevice}
                                                onChange={(e) => setLocatioRevice(e.target.value)}
                                            />
                                        </div>

                                        <div className='w-full bg-full-gray rounded-[16px] flex justify-center items-center p-[10px]'>
                                            <textarea
                                                type="text"
                                                className='text-[13px] h-[200px] bg-full-gray w-full focus:outline-none'
                                                placeholder='Ghi ch??'
                                                value={notification}
                                                onChange={e => setNotification(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-full flex flex-col items-center gap-[15px]'>
                                        <div className='w-full flex flex-row justify-between'>
                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationCity} onChange={e => setLocationCity(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>T???nh/Th??nh ph??? *</option>
                                                    <option value={1}>H?? N???i</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>H???i D????ng</option>
                                                    <option value={4}>H???i Ph??ng</option>
                                                    <option value={5}>H??ng Y??n</option>
                                                </select>
                                            </div>

                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationStore} onChange={e => setLocationStore(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>C???a h??ng</option>
                                                    <option value={1}>H?? N???i</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>H???i D????ng</option>
                                                    <option value={4}>H???i Ph??ng</option>
                                                    <option value={5}>H??ng Y??n</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='w-full bg-full-gray rounded-[16px] flex justify-center items-center p-[10px]'>
                                            <textarea
                                                type="text"
                                                className='text-[13px] h-[200px] bg-full-gray w-full focus:outline-none'
                                                placeholder='Ghi ch??'
                                                value={notification}
                                                onChange={e => setNotification(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className='w-full flex flex-row justify-start items-center'>
                                    <input type="checkbox" id="checkRecipt" name="checkRecipt" defaultChecked={checkReceipt} onChange={() => setCheckReceipt(state => !state)} />
                                    <label for="checkRecipt" className='text-[13px]'>Y??u c???u xu???t ho??t ????n c??ng ty (Vui l??ng ??i???n email ????? nh???n h??a ????n VAT)</label><br></br>
                                </div>

                                <button className='w-[287.5px] h-[57.6px] bg-gradient-to-b from-[#009981] to-[#00483d] rounded-[16px]'>
                                    <span className='text-[15px] font-[700] text-white'>X??C NH???N V?? ?????T H??NG</span>
                                </button>
                            </div>
                        </section>
                    )
            }
        </div>
        </Layout>
    )
}

export default CartPage