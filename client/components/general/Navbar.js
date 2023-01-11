import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import InputForm from './InputForm'
import ItemNavbar from './ItemNavbar'

import { TbTruckDelivery } from 'react-icons/tb'
import { GrCart } from 'react-icons/gr'
import { AiFillCaretLeft } from 'react-icons/ai'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

import { useDispatch, useSelector } from 'react-redux'
import { setOpenMenuNavbar } from '../../reducers/navbar'

import logo from '../../public/logo-text.png'
import { navBarData } from '../../data/dummy'
import { contentItemNavbar } from '../../data/dummy'
import MenuNavbar from './MenuNavbar'

// import axiosConfig from '../../axiosConfig'

const Navbar = () => {
  const dispatch = useDispatch()

  const { changeWidth, changeScroll } = useSelector(state => state.app)
  const {openMenuNavbar, amountTotal} = useSelector(state => state.navbar)
  const [changeNavbar, setChangeNavbar] = useState(false)

  // const  [search, setSearch] = useState('')
  // const [loading, setLoading] = useState(false)
  // const [listResult, setListResult] = useState([])

  // console.log(listResult)
  // console.log(changeScroll)

  const showListContent = () => {
    return ['Bản mobile', 'Giới thiệu', 'Sản phẩm đã xem', 'Trung tâm bảo hành', 'Hệ thống 124 siêu thị', 'Tuyển dụng', 'Tra cứu đơn hàng', 'Đăng nhập'].map((item, i) => {
      return (
        <div key={i} className='text-white text-[13px] hover:text-hover'>
          {item}
        </div>
      )
    })
  }

  const showListContentNavbar = () => {
    const arrayIcon = navBarData[0]

    return arrayIcon.map((item, i) => {
      return <ItemNavbar key={i} text={navBarData[1][i]} icon={() => item()} change={changeNavbar} changeDesktop={changeWidth > 900 ? true : false} content={contentItemNavbar[i]}/>
    })
  }

  // const fetchData = async () => {
  //   setLoading(true)
  //   try {
  //     const res = await axiosConfig()({
  //       method: 'POST',
  //       url: `api/v1/product/search?name=${search}`
  //     })

  //     console.log(res.data.response)
  //     setLoading(false)
  //     setListResult(res.data.response)

  //   }
  //   catch (err){
  //     console.log(err)
  //   }
  //   setLoading(false)
    
  // }

  // useEffect(() => {
  //   if(search !== ''){
  //     setListResult([])
  //     fetchData()
  //   }
  //   else if(search === '')
  //   {
  //     setListResult([])
  //   }
  // }, [search])

  useEffect(() => {
    if(changeScroll >= 183 && !changeNavbar) setChangeNavbar(true)
    else if(changeScroll < 183 && changeNavbar) setChangeNavbar(false)
  }, [changeScroll])

  const NavbarDesktop = () => {
    return (
      <div className='w-full flex flex-col bg-white'>
        <div className='w-full bg-primary h-[30px]'>
          <div className='max-w-window w-full h-[30px] mx-auto flex flex-row justify-end gap-[12px] py-[6px]'>
            {showListContent()}
          </div>
        </div>

        <div className='max-w-window w-full mx-auto h-[90px] py-[20px] flex flex-row items-center justify-between'>
          <Link href='/' className='w-[256px] h-[37px] cursor-pointer'>
            <Image
              src={logo}
              alt='img'
              className='w-full h-full object-contain'
            />
          </Link>

          <InputForm />

          <Link
            className='w-[126px] h-[44px] bg-primary hover:bg-hover rounded-[10px] px-[8px] py-[6px] flex flex-row items-center justify-center gap-[8px] text-white drop-shadow-primary'
            href='/order/check'
          >
            <TbTruckDelivery size={40} />
            <span className='text-[12px]'>
              Kiểm tra đơn hàng
            </span>
          </Link>

          <Link href='/gio-hang' className='flex flex-row'>
            <GrCart size={40} color='#00483D' />

            <label className='flex flex-row justify-between items-center gap-0'>
              <AiFillCaretLeft color='#FF6801' />
              <span className='w-[24px] h-[24px] bg-orange p-[6px] text-[12px] text-white rounded-[4px] flex justify-center items-center ml-[-5px]'>
                {amountTotal}
              </span>
            </label>
          </Link>
        </div>

        <div className='max-w-window w-full mx-auto bg-primary h-[63px] rounded-[8px] drop-shadow-primary relative
                            flex flex-row items-center justify-center z-10'>
            {showListContentNavbar()}
        </div>

        {changeNavbar && (<div className='flex flex-row items-center justify-center z-30 bg-primary h-[37px] fixed top-0 right-0 left-0 '>
          {showListContentNavbar()}
          
        </div>)}
      </div>
    )
  }

  const NavbarMobile = () => {
    return (
      <div className = 'w-full flex flex-col items-center gap-[12px] fixed top-0 left-0 right-0 z-30 bg-white px-[15px] pb-[20px]' >
        <div className='w-full flex flex-row items-center justify-between px-[10px] py-[10px] '>
          <HiOutlineMenuAlt2 size={24} className='cursor-pointer' color='#00483d' onClick={() => dispatch(setOpenMenuNavbar({open: true}))}/>

          <Link href='/' className='w-[156px] h-[22.4px] cursor-pointer'>
            <Image
              src={logo}
              alt='img'
              className='w-full h-full object-contain'
            />
          </Link>

          <Link href='/gio-hang' className='flex flex-row relative'>
            <GrCart size={24} color='#00483d'/>

            <label className='flex flex-row justify-between items-center gap-0 absolute bottom-0 right-[-5px]'>
              {/* <AiFillCaretLeft color='#FF6801' /> */}
              <span className='w-[15px] h-[15px] bg-orange p-[6px] text-[10px] text-white rounded-[4px] flex justify-center items-center ml-[-5px]'>
                {amountTotal}
              </span>
            </label>
          </Link>
        </div>

        <InputForm border={true} />
        {openMenuNavbar && <MenuNavbar />}
    </div >
    )
  }

  

return changeWidth > 900 ? <NavbarDesktop /> : <NavbarMobile />
}

export default Navbar