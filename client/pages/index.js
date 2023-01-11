import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import axiosConfig from '../axiosConfig'

import ImageCarousel from '../components/general/ImageCarousel'
import Layout from '../components/general/Layout'
import ListProduct from '../components/general/ListProduct'
import More from '../components/general/More'
import ProductCarousel from '../components/general/ProductCarousel'

import content1 from '../public/content1.png'
import content2 from '../public/content2.jpg'
import content3 from '../public/content3.jpg'
import content4 from '../public/content4.jpg'

import {FaPaperPlane} from 'react-icons/fa'

export default function Home({err, listProduct}) {
  
  return err == 0 ? (
    <Layout>
      <Head>
        <title>Hoàng Hà Mobile - Hệ thống bán lẻ thiết bị di động và công nghệ chính hãng giá tốt</title>
      </Head>
      <ImageCarousel/>

      <div className='w-full flex flex-row items-center justify-between overflow-x-scroll no-scroll-bar gap-[10px] mt-[20px] mb-[30px]'>
          <div className='w-[292.5px] h-[153.73px]'>
            <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content1}
              width={292.5}
              height={153.73}
              className='w-[292.5px] h-[153.73px] object-cover rounded-[4px]'
            />
            </div>
          </div>

          <div className='w-[292.5px] h-[153.73px]'>
            <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content2}
              width={292.5}
              height={153.73}
              className='w-[292.5px] h-[153.73px] object-cover rounded-[4px]'
            />
            </div>
          </div>

          <div className='w-[292.5px] h-[153.73px]'>
            <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content3}
              width={292.5}
              height={153.73}
              className='w-[292.5px] h-[153.73px] object-cover rounded-[4px]'
            />
            </div>
          </div>

          <div className='w-[292.5px] h-[153.73px]'>
            <div className='w-[292.5px] h-[153.73px]'>
            <Image
              src={content4}
              width={292.5}
              height={153.73}
              className='w-[292.5px] h-[153.73px] object-cover rounded-[4px]'
            />
            </div>
          </div>

          
        </div>

      <ProductCarousel  productData={listProduct} kindProduct='Laptop'/>
      <ListProduct title='APPLE AUTHORISED RESELLER' kindProduct='Apple' listProduct={listProduct}/>
      <ListProduct title='ĐIỆN THOẠI NỔI BẬT' kindProduct='Điện thoại' listProduct={listProduct}/>
      <ListProduct title='ĐỒNG HỒ THÔNG MINH' kindProduct='Đồng hồ' listProduct={listProduct}/>
      <ListProduct title='LAPTOP NỔI BẬT' kindProduct='Laptop' listProduct={listProduct}/>
      <ListProduct title='MÀN HÌNH NỔI BẬT' kindProduct='Màn hình' listProduct={listProduct}/>
      <ListProduct title='SMART TV NỔI BẬT' kindProduct='Smart Tv' listProduct={listProduct}/>
      <ListProduct title='TABLET' kindProduct='Tablet' listProduct={listProduct}/>
      <ListProduct title='LOA - TAI NGHE NỔI BẬT' kindProduct='Âm thanh' listProduct={listProduct}/>
      <ListProduct title='SMART HOME' kindProduct='Smart home' listProduct={listProduct}/>

      <More />

      <div className='w-full h-[100px] m-[10px] max-[900px]:px-[10px] px-[50px] bg-white flex flex-row'>
        <div className='w-[105px] h-[100px]'>
        <Image
          alt='img'
          width={105}
          height={100}
          src='https://hoanghamobile.com/Content/web/img/sub-logo.png'
          className='w-full h-full object-contain'
        />
        </div>

        <div className='w-full flex max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-[10px] gap-[30px] max-[900px]:justify-center flex-row items-center justify-around '>
          <h4 className='text-[13px] font-[700]'>Đăng ký nhận tin khuyến mãi</h4>

          <div className='max-[900px]:w-[230px] w-[300px] h-[43px] bg-full-gray flex flex-row items-center rounded-[16px] p-[10px] relative'>
            <input
              className='text-[13px] bg-full-gray focus:outline-none'
              placeholder='Nhập E-mail của bạn'
            />

            <button className='w-[61px] h-[43px] bg-primary top-0 right-0 absolute rounded-[16px] flex justify-center items-center'>
                <FaPaperPlane color='white' size={30}/>
            </button>

          </div>
        </div>

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

export async function getStaticProps() {
  try {
    const res = await axiosConfig()({
      method: 'POST',
      url: 'api/v1/product/all'
    })

    console.log(res.data.products)

    const data = [] 
    
    res.data.products.map((item, i) => {
      if(i > 0 && item.name !== res.data.products[i-1].name){
           data.push(item)
      }   
      else if(i == 0){
        data.push(item)
      }
    })

    console.log(data)
    return {
      props: {
        err: 0,
        listProduct: data
      }
    }

  } catch (err) {
    return {
      props: {
        err: 1,
        listProduct: []
      }
    }
  }
}