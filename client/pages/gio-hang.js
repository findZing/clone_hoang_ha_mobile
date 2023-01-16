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
                        <strong className='text-[16px] text-price'>{item.product.price} <span className='underline'>đ</span></strong>

                        <p className='text-[11px] text-[#888888]'>Số lượng</p>
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
            'Thu cũ đổi mới giảm tới 1.000.000đ',
            'Tặng esim data Mobifone Hera 5G (2GB/ngày) (Chưa bao gồm tháng đầu tiên) - Lưu ý: chỉ áp dụng mua trực tiếp tại cửa hàng.',
            'Ưu đãi giảm thêm 100.000đ khi mua Microsoft Office kèm Laptop, Macbook, Máy tính bảng, Điện thoại ',
            'Giảm 5% (Tối đa 100.000đ), khi thanh toán tại hệ thống qua ví điện tử Moca trên ứng dụng Grab [Nhập Mã HHMOCA11] - Không áp dụng cùng KM khác - Số lượng có hạn',
            'Giảm thêm tới 1.000.000đ khi mở thẻ tín dụng đồng thương hiệu TPBank EVO'
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
                    Quay lại
                </Link>
            </section>

            {
                amountProduct.length === 0 ? (
                    <section className='w-full flex flex-col items-center'>
                        <FiCheckCircle size={60} color='#00483d' />
                        <span className='font-[700]'>Giỏ hàng</span>
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
                                <span className='font-[700]'>Giỏ hàng</span>

                                {showListProduct()}

                                <div className='w-full h-[125px] p-[15px] bg-white rounded-[16px] drop-shadow-primary flex flex-col items-start gap-[4px]'>
                                    <p className='text-[13px] font-[700] text-[#333333]'>Tổng giá trị: {totalPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}</p>

                                    <p className='text-[13px] font-[700] text-[#333333]'>Giảm giá: -00 ₫</p>
                                    <p className='text-[13px] font-[700] text-[#333333]'>Tổng thanh toán: <span className='text-price'>{totalPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}</span></p>

                                    <p className='capitalize text-[13px] italic'>{to_vietnamese(totalPrice) + ' đồng'}</p>
                                </div>
                            </div>

                            <div className='max-w-[448px] w-full mt-[70px] flex flex-col items-center gap-[15px]'>
                                <h3 className='text-[20px] font-[700] mb-[25px]'>Thông tin đặt hàng</h3>
                                <span className='text-[13px] text-[#AAAAAA] italic'>Bạn cần nhập đầy đủ các trường thông tin có dấu *</span>

                                <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                    <input
                                        type='text'
                                        className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                        placeholder='Họ và tên *'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                    <input
                                        type='tel'
                                        className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                        placeholder='Số điện thoại *'
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

                                <p className='text-[13px] font-[700] text-start w-full'>Hình thức nhận hàng</p>

                                <div className='w-full flex flex-row justify-between'>
                                    <div onClick={() => { if (!checkHome) { setCheckHome(state => !state); setCheckStore(state => !state) } }} className='w-[204px] h-[49px] border rounded-[8px] px-[10px] pt-[10px] pb-[5px] flex flex-row items-center cursor-pointer'>
                                        {checkHome ? <FaRegDotCircle size={20} color='#00483D' /> : <BsCircle size={20} />}
                                        <span className='text-[13px]'>Nhận hàng tại nhà</span>
                                    </div>

                                    <div onClick={() => { if (!checkStore) { setCheckHome(state => !state); setCheckStore(state => !state) } }} className='w-[204px] h-[49px] border rounded-[8px] px-[10px] pt-[10px] pb-[5px] flex flex-row items-center cursor-pointer'>
                                        {checkStore ? <FaRegDotCircle size={20} color='#00483D' /> : <BsCircle size={20} />}
                                        <span className='text-[13px]'>Nhận hàng tại cửa hàng</span>
                                    </div>
                                </div>

                                {checkHome ? (
                                    <div className='w-full flex flex-col items-center gap-[15px]'>
                                        <div className='w-full flex flex-row justify-between'>
                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationCity} onChange={e => setLocationCity(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>Tỉnh/Thành phố *</option>
                                                    <option value={1}>Hà Nội</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>Hải Dương</option>
                                                    <option value={4}>Hải Phòng</option>
                                                    <option value={5}>Hưng Yên</option>
                                                </select>
                                            </div>

                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationDistrict} onChange={e => setLocationDistrict(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>Quận/Huyện</option>
                                                    <option value={1}>Hà Nội</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>Hải Dương</option>
                                                    <option value={4}>Hải Phòng</option>
                                                    <option value={5}>Hưng Yên</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='w-full h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px] '>
                                            <input
                                                type='tel'
                                                className='w-full bg-full-gray focus:outline-none py-[10px] text-[13px]'
                                                placeholder='Địa chỉ nhận hàng *'
                                                value={locatioRevice}
                                                onChange={(e) => setLocatioRevice(e.target.value)}
                                            />
                                        </div>

                                        <div className='w-full bg-full-gray rounded-[16px] flex justify-center items-center p-[10px]'>
                                            <textarea
                                                type="text"
                                                className='text-[13px] h-[200px] bg-full-gray w-full focus:outline-none'
                                                placeholder='Ghi chú'
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
                                                    <option>Tỉnh/Thành phố *</option>
                                                    <option value={1}>Hà Nội</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>Hải Dương</option>
                                                    <option value={4}>Hải Phòng</option>
                                                    <option value={5}>Hưng Yên</option>
                                                </select>
                                            </div>

                                            <div className='w-[204px] h-[37.6px] bg-full-gray rounded-[8px] flex items-center justify-center px-[12px]'>
                                                <select value={locationStore} onChange={e => setLocationStore(e.target.value)} className='text-[13px] bg-full-gray focus:outline-none w-full'>
                                                    <option>Cửa hàng</option>
                                                    <option value={1}>Hà Nội</option>
                                                    <option value={2}>TP HCM</option>
                                                    <option value={3}>Hải Dương</option>
                                                    <option value={4}>Hải Phòng</option>
                                                    <option value={5}>Hưng Yên</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='w-full bg-full-gray rounded-[16px] flex justify-center items-center p-[10px]'>
                                            <textarea
                                                type="text"
                                                className='text-[13px] h-[200px] bg-full-gray w-full focus:outline-none'
                                                placeholder='Ghi chú'
                                                value={notification}
                                                onChange={e => setNotification(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className='w-full flex flex-row justify-start items-center'>
                                    <input type="checkbox" id="checkRecipt" name="checkRecipt" defaultChecked={checkReceipt} onChange={() => setCheckReceipt(state => !state)} />
                                    <label for="checkRecipt" className='text-[13px]'>Yêu cầu xuất hoát đơn công ty (Vui lòng điền email để nhận hóa đơn VAT)</label><br></br>
                                </div>

                                <button className='w-[287.5px] h-[57.6px] bg-gradient-to-b from-[#009981] to-[#00483d] rounded-[16px]'>
                                    <span className='text-[15px] font-[700] text-white'>XÁC NHẬN VÀ ĐẶT HÀNG</span>
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