
import Link from 'next/link'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'

// import { contentFooter } from '../data/dummy'

import logoVisa from '../../public/logo-visa.png'
import logoMaster from '../../public/logo-master.png'
import logoJcb from '../../public/logo-jcb.png'
import logoSamsung from '../../public/logo-samsungpay.png'
import logoAtm from '../../public/logo-atm.png'
import logoVnpay from '../../public/logo-vnpay.png'
import logoNhattin from '../../public/nhattin.jpg'
import logoVnpost from '../../public/vnpost.jpg'
import logoBct from '../../public/logo-bct.png'

const Footer = () => {

    const contentFooter = [
        {
            title: 'Hỗ Trợ - Dịch Vụ',
            list: ['Mua hàng trả góp', 'Hướng dẫn đặt hàng và thanh toán', 'Tra cứu đơn hàng', 'Chính sách bảo hành', 'Phạm vi, điều khoản gói bảo hành mở rộng', 'Chính sách bảo mật', 'Chính sách giải quyết khiếu nại', 'Điều khoản mua bán hàng hóa', 'Câu hỏi thường gặp']
        },
        {
            title: 'Thông Tin Liên Hệ',
            list: ['Bán hàng Online', 'Chăm sóc Khách Hàng', 'Hỗ Trợ Kỹ thuật', 'Hỗ trợ Bảo hành & Sửa chữa', 'Liên hệ khối văn phòng']
        },
        {
            title: 'Hệ thống 124 siêu thị trên toàn quốc',
            list: ['Danh sách 124 siêu thị trên toàn quốc']
        },
    
    ]

    const showListContent = () => {
        return contentFooter.map((item, i) => {
            return (
                <div  key={i} className='flex flex-col w-[220px] max-[450px]:w-[150px]'>
                    <p className='text-[15px] text-[#DDDDDD] font-[700]'>{item.title}</p>
                    {
                        item.list.map((itemList, i) => {
                            return (
                                <Link
                                    key={i}
                                    href='/'
                                    className='text-[13px] text-[#DDDDDD]'
                                >
                                    {itemList}
                                </Link>
                            )
                        })
                    }
                </div>
            )
        })
    }


    return (
        <div className='bg-primary px-[20px] py-[10px] rounded-[16px] flex flex-col gap-[15px]'>
            <div className='flex flex-row min-[900px]:justify-around gap-[20px] max-[900px]:flex-col'>
                <div className='flex flex-row flex-wrap justify-between gap-[16px]'>
                    {showListContent()}
                </div>

                <div className='flex flex-row flex-wrap justify-between max-[900px]:gap-[8px] min-[900px]:gap-[20px]'>
                    <div className='flex flex-col gap-[10px]'>
                        <p className='text-[15px] text-[#DDDDDD] font-[700]'>Tổng đài</p>
                        <div className='bg-white h-[30px] rounded-[8px] flex justify-center items-center px-[10px] py-[6px]'>
                            <span className='text-[18px] font-[800] text-primary'>1900.2091</span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[10px]'>
                        <p className='text-[15px] text-[#DDDDDD] font-[700]'>Thanh toán miễn phí</p>
                        
                        <div className='flex flex-col items-center gap-[10px]'>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <Image 
                                    alt='img'
                                    src={logoVisa}
                                    className='w-[77px] h-[30px]'
                                />
                                <Image 
                                    alt='img'
                                    src={logoMaster}
                                    className='w-[77px] h-[30px]'
                                />
                            </div>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <Image 
                                    alt='img'
                                    src={logoJcb}
                                    className='w-[77px] h-[30px]'
                                />
                                <Image 
                                    alt='img'
                                    src={logoSamsung}
                                    className='w-[77px] h-[30px]'
                                />
                            </div>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <Image 
                                    alt='img'
                                    src={logoAtm}
                                    className='w-[77px] h-[30px]'
                                />
                                <Image 
                                    alt='img'
                                    src={logoVnpay}
                                    className='w-[77px] h-[30px]'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[10px]'>
                        <p className='text-[15px] text-[#DDDDDD] font-[700]'>Hình thức vận chuyển</p>
                        
                        <div className='flex flex-col items-center gap-[10px] max-[900px]:flex-row'>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <Image 
                                    alt='img'
                                    src={logoNhattin}
                                    className='w-[77px] h-[30px]'
                                />
                                <Image 
                                    alt='img'
                                    src={logoVnpost}
                                    className='w-[77px] h-[30px]'
                                />
                            </div>
                            
                            <Image 
                            alt='img'
                            src={logoBct}
                            className='w-[160px] h-[61px]'
                            />
                        </div>
                    </div>
                </div>


            </div>

            <div className='flex flex-col items-center gap-[10px]'>
                <p className='text-[12px] text-white'>© 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ. MST: 0106713191. (Đăng ký lần đầu: Ngày 15 tháng 12 năm 2014, Đăng ký thay đổi ngày 29/12/2020)</p>
                <p className='text-[12px] text-white font-[700]'>GP số 426/GP-TTĐT do sở TTTT Hà Nội cấp ngày 22/01/2021</p>
                <p className='text-[12px] text-white'>Địa chỉ: 89 Tam Trinh, P. Mai Động, Q. Hoàng Mai, Thành phố Hà Nội. Điện thoại: 1900.2091. Chịu trách nhiệm nội dung: <span className='font-[700]'>Hoàng Ngọc Chiến</span>.</p>
            </div>
        </div>
    )
}

export default Footer