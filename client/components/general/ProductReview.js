import React, { useEffect, useLayoutEffect } from 'react';
import { useRef, useState } from 'react';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import {FaRegHeart, FaHeart} from 'react-icons/fa'

import Image from 'next/image';
import axiosConfig from '../../axiosConfig';

const ProductReview = ({ images }) => {
    const [click, setClick] = useState(0)
    const slider = useRef(null)
    // const [images,setImages] = useState([])

    const setting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }

    const handleClickNext = () => {

        if (click + 1 > images.length - 1) {
            slider.current.slickGoTo(0)
            setClick(0)
        }
        else {
            slider.current.slickGoTo(click + 1)
            setClick(i => i + 1)
        }
    }

    const handleClickPrev = () => {
        if (click - 1 < 0) {
            slider.current.slickGoTo(images.length - 1)
            setClick(3)
        }
        else {
            slider.current.slickGoTo(click - 1)
            setClick(i => i - 1)
        }
    }

    const handleSwipe = (direction) => {
        
        if(direction == 'left') {

            if (click + 1 > images.length - 1) {
                setClick(0)
            }
            else {
                setClick(i => i + 1)
            }
        }
        else if (direction == 'right')
        {
            if (click - 1 < 0) {
                setClick(images.length - 1)
            }
            else {
                setClick(i => i - 1)
            }
        }
    }

    const showListImg = () => {
        console.log(images)
        return images.map((item, i) => {
            return (
                <Image
                    src={item}
                    alt='img'
                    width={370}
                    height={370}
                    key={i}
                    className='w-full h-full object-contain'
                />
            )
        })
    }

    const showListSmallImg = () => {
        return images.map((item, i) => {
            return (
                <div key={i} onClick={() => {slider.current.slickGoTo(i); setClick(i)}} className={`w-[65px] h-[65px] p-[8px] cursor-pointer ${click == i ? '' : 'border-[0.5px] border-gray '}`}>
                    <img
                        src={item}
                        alt='img'
                        key={i}
                        className='w-[56px] h-[56px] object-contain'
                    />
                </div>
            )
        })
    }

    // useLayoutEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axiosConfig()({
    //             method: 'POST',
    //             url: 'api/v1/product/images',
    //             data: {imageId}
    //         })
    //         console.log(res.data.images)
    //         return res.data.images
    //     }

    //     try {
    //         setImages(fetchData())
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }, [])

    return (
        <div className='w-[370px] h-[470px] flex flex-col'>
            <div className='w-full h-[370px] relative'>
                <Slider ref={slider} {...setting} onSwipe={handleSwipe}>
                    {showListImg()}
                </Slider>

                <div onClick={handleClickPrev} className='absolute left-[10px] top-[50%] w-[46px] h-[46px] rounded-[50%] flex justify-center items-center bg-[#C2C2C273] hover:bg-[#E6E4E473] cursor-pointer'>
                    <AiFillCaretLeft color='white' size={20} />
                </div>

                <div onClick={handleClickNext} className='absolute right-[10px] top-[50%] w-[46px] h-[46px] rounded-[50%] flex justify-center items-center bg-[#C2C2C273] hover:bg-[#E6E4E473] cursor-pointer'>
                    <AiFillCaretRight color='white' size={20} />
                </div>

                <div className='absolute top-[8px] right-[8px] bg-white rounded-[16px] w-[40px] h-[40px] drop-shadow-primary flex justify-center items-center'>
                    <FaRegHeart color='red' size={25} />
                </div>
            </div>

            <div className='w-full h-[80px] bg-white rounded-[8px] drop-shadow-primary relative flex flex-row justify-center items-center gap-[4px]'>
                {showListSmallImg()}
            </div>
        </div>
    )
}

export default ProductReview