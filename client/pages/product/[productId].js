import React from 'react'

import axiosConfig from '../../axiosConfig'
import { formatVietnameseToString } from '../../ultils/formatVietnameseToString'
import { dataLocation } from '../../data/dummy'

import Layout from '../../components/general/Layout'
import Link from 'next/link'
import ProductReview from '../../components/general/ProductReview'

import { SlHome } from 'react-icons/sl'
import {RiArrowRightSLine} from 'react-icons/ri'
import { CiDeliveryTruck } from 'react-icons/ci'
import { BsCartPlus } from 'react-icons/bs'
import { BiCheckShield } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { HiSearch } from 'react-icons/hi'
import { AiOutlineSend } from 'react-icons/ai'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import {SlEarphonesAlt} from 'react-icons/sl'

import { useDispatch } from 'react-redux'
import { setChangeAmountProduct } from '../../reducers/navbar'
import More from '../../components/general/More'

const ProductPage = ({ err, data }) => {
    const dispatch = useDispatch()

    const handleAddProduct = () => {
        dispatch(setChangeAmountProduct({product: data, amount: 1}))
    }

    const showLinkBreadCrumb = () => {
        const array = data.store
        // console.log(data.store)

        let result = []
        let link = '/'

        result.push((<Link
            href='/'
            className='flex flex-row gap-[8px]'
        >
            {<SlHome />}
            <span className='text-[13px] font-[700]'>Trang chủ</span>
        </Link>
        ))

        result.push(array.map((item, i) => {
            link = link + formatVietnameseToString(item) + '/'
            console.log(link)
            return (
                <div key={i} className='flex flex-row items-end'>
                    <RiArrowRightSLine />
                    <Link
                        href={link}
                        className="flex flex-row"
                        key={i}
                    >
                        <span className='text-[13px] font-[700]'>{item}</span>
                    </Link>
                </div>
            )
        }))

        result.push((<>
            <RiArrowRightSLine />
            <span className='text-[13px] font-[700] text-hover'>{data.name}</span>
        </>))
        return result
    }

    const showListLocation = () => {
        return dataLocation.map((item, i) => {
            return (
                <div className='flex flex-col items-start' key={i}>
                    <span className='text-[12px] flex flex-row items-center'><MdOutlineKeyboardArrowRight /> {item.location}</span>
                    <span className='text-[12px] flex flex-row items-center gap-[4px]'><SlEarphonesAlt /> <strong className='font-[600] text-hover'>{item.phone}</strong> - <CiLocationOn /> <strong className='font-[600]'> Chỉ đường</strong></span>
                </div>
            )
        })
    }

    return err == 0 ? (
        <Layout>
            <div className='w-full flex flex-col gap-[20px] my-[20px]'>
                <section className='flex flex-row flex-wap justify-start items-end'>
                    {showLinkBreadCrumb()}
                </section>

                <section className='flex flex-col items-between'>
                <h1 className='text-[20px] font-[700] mt-[20px] mb-[10px]'>{data.name}</h1>

                <div className='flex flex-row flex-wrap max-[900px]:flex-col max-[900px]:items-center justify-between gap-[10px]'>
                    <ProductReview images={data.images} />

                    <div className='flex flex-col max-w-[478px] w-full gap-[20px]'>
                        <p>
                            <strong className='text-[25px] text-price'>{data.price} <span className='underline'>đ</span></strong>
                            <i> | Giá đã bao gồm 10% VAT</i>
                        </p>

                        <p className='w-full h-[32px] bg-primary rounded-[8px] text-white flex flex-row justify-center items-center'>
                            <CiDeliveryTruck size={25} className='scale-x-[-1]' />
                            <span className='text-[13px]'>MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</span>
                        </p>

                        <div className='flex flex-col'>
                            <strong className='text-[13px]'>Lựa chọn màu và xem địa chỉ còn hàng</strong>
                            <div className='flex flex-row flex-wrap'>
                                <div className='w-[107.6px] h-[52.2px] p-[4px] flex flex-col items-start border-[2px] border-primary rounded-[4px]'>
                                    <p className='text-[13px]'>Trắng</p>
                                    <p className='text-[13px] text-price font-[700]'>{data.price} <span className='underline'>đ</span></p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-start'>
                            <p className='text-[14px] font-[700]'>KHUYẾN MÃI</p>
                            <div className='flex flex-col items-start'>
                                <span className='w-[26.26px] h-[20.4px] drop-shadow-primary rounded-[4px] bg-orange-yellow text-[11px] text-white px-[5px] py-[3px]'>KM</span>
                                <p className='text-[13px]'>Giảm thêm tới 600.000đ khi mở thẻ TP Bank EVO thành công. Không áp dụng đồng thời KM khác - <span className='font-[700] text-primary'>(Xem chi tiết)</span></p>
                            </div>
                            <div className='flex flex-col items-start'>
                                <span className='w-[26.26px] h-[20.4px] drop-shadow-primary rounded-[4px] bg-orange-yellow text-[11px] text-white px-[5px] py-[3px]'>KM</span>
                                <p className='text-[13px]'>Giảm 5% (Tối đa 100.000đ), khi thanh toán tại hệ thống qua ví điện tử Moca trên ứng dụng Grab [Nhập Mã HHMOCA11] - Không áp dụng cùng KM khác - Số lượng có hạn - <span className='font-[700] text-primary'>(Xem chi tiết)</span></p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center justify-between'>
                            <button className='w-[78%] h-[60px] bg-gradient-to-b from-[#fd475a] to-[#bf1e2d] hover:bg-gradient-to-t flex flex-col justify-center items-center'>
                                <strong className='text-[13px] font-[700] text-white'>MUA NGAY</strong>
                                <span className='text-[11px] text-white'> Giao tận nhà (COD) <br /> Hoặc Nhận tại cửa hàng </span>
                            </button>

                            <button onClick={handleAddProduct} className='w-[20%] h-[60px] bg-gradient-to-b from-[#ff990e] to-[#ff6801] hover:bg-gradient-to-t flex flex-col justify-center items-center'>
                                <BsCartPlus color='white' />
                                <span className='text-[11px] text-white'> Thêm giỏ hàng</span>
                            </button>
                        </div>
                    </div>

                    <div className='w-[312px] p-[15px] border rounded-[8px] bg-white flex flex-col items-center'>
                        <h4 className='text-[13px] font-[700]'>THÔNG TIN BẢO HÀNH</h4>

                        <p className='flex flex-row'><BiCheckShield color='#00483D' /> <span className='text-[12px] font-[500]'>Bảo hành 12 tháng</span></p>
                        <p className='flex flex-row'><BiCheckShield color='#00483D' /> <span className='text-[12px] font-[500]'>Bao xài 1 đổi 1 trong 30 ngày </span></p>

                        <p className='text-[13px] font-[700] uppercase'>Chọn màu và xem địa chỉ còn hàng</p>

                        <button className='w-[270px] h-[30px] border rounded-[4px] flex flex-row items-center justify-center'>
                            <CiLocationOn />
                            <span className='text-[13px] font-[700]'>Hà Nội</span>
                        </button>

                        <p className='text-[13px]'>Có <span className='font-[600]'>10</span> cửa hàng còn sản phẩm</p>

                        <div className='w-[270px] h-[270px] p-[10px] border rounded-[8px] overflow-y-auto flex flex-col gap-[10px] scroll-bar-location'>
                            {showListLocation()}
                        </div>
                    </div>
                </div>
            </section>

            <section className='flex flex-col w-full bg-white rounded-[16px] drop-shadow-primary'>
                <div className='flex flex-row flex-wrap gap-[15px] justify-center px-[30px] py-[20px]'>
                    <h3 className='text-[20px] font-[700]'>So sánh sản phẩm tương tự</h3>

                    <div className='w-[400px] h-[40px] drop-shadow-primary bg-full-gray rounded-[10px] px-[10px] py-[5px] relative'>
                        <input
                            type='text'
                            className='focus:outline-none w-full h-full text-[14px] font-[500] bg-full-gray'
                            placeholder='Nhập tên sản phẩm cần so sánh'
                        />
                        <button className='w-[42px] h-[42px] py-[6px] bg-primary rounded-[17px] absolute right-[8px] bottom-[8px] bg-gradient-to-b from-[#00917a] to-[#00483d] flex justify-center items-center'>
                            <HiSearch color='white' size={20} />
                        </button>
                    </div>
                </div>
            </section>

            <section className='w-full bg-white rounded-[16px] drop-shadow-primary'>
                <div className='w-full flex flex-col px-[50px] py-[20px] gap-[10px]'>
                    <h3 className='text-[20px] font-[700]'>Bình luận về {data.name}</h3>

                    <div className='flex flex-row flex-wrap justify-between items-center gap-[10px]'>
                        <div className='w-[330px] h-[40px] px-[12px] py-[10px] rounded-[8px] bg-full-gray flex items-center'>
                            <input
                                type='text'
                                className='focus:outline-none w-full h-full text-[12px] text-gray-500 font-[500] bg-full-gray'
                                placeholder='Họ tên *'
                            />
                        </div>

                        <div className='w-[330px] h-[40px] px-[12px] py-[10px] rounded-[8px] bg-full-gray flex items-center'>
                            <input
                                type='text'
                                className='focus:outline-none w-full h-full text-[12px] text-gray-500 font-[500] bg-full-gray'
                                placeholder='Điện thoại'
                            />
                        </div>

                        <div className='w-[330px] h-[40px] px-[12px] py-[10px] rounded-[8px] bg-full-gray flex items-center'>
                            <input
                                type='text'
                                className='focus:outline-none w-full h-full text-[12px] text-gray-500 font-[500] bg-full-gray'
                                placeholder='Email'
                            />
                        </div>
                    </div>

                    <div className='bg-full-gray w-full px-[12px] py-[10px] rounded-[16px]'>
                        <textarea
                            type="text"
                            className='w-full focus:outline-none bg-full-gray text-[12px] text-gray-500'
                            placeholder='Nội dung. Tối thiểu 15 ký tự *'
                        />
                    </div>

                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-[12px] text-primary italic'>Để gửi bình luận, bạn cần nhập tối thiểu trường họ tên và nội dung</p>
                        <button className='flex flex-row items-center justify-center bg-gradient-to-b from-[#008d77] to-[#00483d] w-[275px] h-[32px] rounded-[8px] gap-[4px]'>
                            <AiOutlineSend size={20} color='white'/>
                            <span className='text-[13px] text-white uppercase font-[500]'>Gửi bình luận</span>
                        </button>
                    </div>
                </div>
            </section>

            <More />
            </div>
        </Layout>
    )
        :
        (
            <Layout>
                Error
            </Layout>
        )
}

export default ProductPage

export const getStaticPaths = () => {

    return {
        paths: [
            { params: { productId: '10' } },
            { params: { productId: '11' } },
            { params: { productId: '13' } }

        ],
        fallback: 'blocking'
    }
}

export const getStaticProps = async (context) => {
    const { params } = context
    console.log(params)
    try {
        const resProduct = await axiosConfig()({
            method: 'POST',
            url: `api/v1/product/get?productId=${params.productId}`
        })

        
        return {
            props: {
                err: 0,
                data: resProduct.data.product
            },
            revalidate: 10,
        }
    } catch (err) {
        return {
            props: {
                err: 1,
                data: [],
            },
            revalidate: 10,
        }
    }
}