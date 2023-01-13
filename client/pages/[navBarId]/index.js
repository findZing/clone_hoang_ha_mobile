import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SlHome } from 'react-icons/sl'
import { RiArrowRightSLine } from 'react-icons/ri'

import { navBarData } from '../../data/dummy'
import { formatVietnameseToString } from '../../ultils/formatVietnameseToString'
import CustomProduct from '../../components/general/CustomProduct'
import ListProduct from '../../components/general/ListProduct'
import Layout from '../../components/general/Layout'

import axiosConfig from '../../axiosConfig'
import More from '../../components/general/More'

const NavBarPage = ({err, data, productData }) => {
    // console.log(err)
    return err == 0 ? (
        <Layout>
        <div className='w-full flex flex-col my-[20px] gap-[20px]'>
            <section>
                <img
                    alt='img'
                    src='https://cdn.hoanghamobile.com/i/home/Uploads/2022/10/25/xor-02.jpg'
                    className='w-full h-[200px] object-contain'
                />
            </section>

            <div className='flex flex-row items-end'>
                <Link
                    href='/'
                    className='flex flex-row gap-[8px]'
                >
                    {<SlHome />}
                    <span className='text-[13px] font-[700]'>Trang chủ</span>
                </Link>
                <RiArrowRightSLine />
                <Link
                    href={`/${data.title}`}
                    className="flex flex-row"
                >
                    <span className='text-[13px] font-[700] text-hover'>{data.name}</span>
                </Link>
            </div>

            <section className='w-full '>
                <CustomProduct />
            </section>

            <section>
                {/* <ListProduct title={data.name} product={data.name} productData={productData}/> */}
                <ListProduct title={data.name} kindProduct={data.name} listProduct={productData}/>

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

export default NavBarPage

export const getStaticPaths = () => {

    const paths = navBarData[1].map((item) => {
        return {
            params: {
                navBarId: formatVietnameseToString(item),
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const { params } = context
    let name = ''
    let index
    for (let i = 0; i < navBarData[1].length; i++) {
        if (formatVietnameseToString(navBarData[1][i]) == params.navBarId) {
            name = navBarData[1][i]
            index = i
            break
        }
    }

    try {
        const res = await axiosConfig()({
          method: 'POST',
          url: 'api/v1/product/all'
        })
    
        console.log(name)
    
        return {
            props: {
                data: {
                    title: params.navBarId,
                    name,
                    index,
                },
                productData: res.data.products,
                err: 0
            },
            revalidate: 10,
        }
      } catch (err) {
        return {
            props: {
                data: {
                    title: params.navBarId,
                    name,
                    index,
                },
                productData: [],
                err: 1
            }
        }
      }
    

}