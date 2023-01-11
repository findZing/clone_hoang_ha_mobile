import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

const BoxNavbar = ({ change, content }) => {
  const dispatch = useDispatch()
  // console.log(content)

  const showListContent = (list) => {
    let result = []
    let a = []

    list.map((item, i) => {
      a.push(item)
      if (i !== 0 && i % 5 == 0 && list.length / 6 > 1) {
        result.push([...a])
        a = []
      }
      else if (i + 1 == list.length) {
        result.push([...a])
      }
    })

    return result.map((item, i) => {
      // console.log(item)  
      return (
        <div className='flex flex-col items-start' key={i}>
          {
            item.map((item, i) => {
              return (
                <span key={i} className='text-[13px]'>
                  {item}
                </span>
              )
            })
          }
        </div>
      )
    })
  }

  const showContent = () => {
    return (
      <div className='w-full h-full flex flex-row justify-start items-start gap-[30px]' >
        {
          content.map((item, i) => {
            return (
              <div className='flex flex-col items-start gap-[15px]' key={i}>
                <h3 className='text-[13px] font-[700]'>{item.title}</h3>

                <div className='flex flex-row gap-[20px]'>
                  {
                    showListContent(item.list)
                  }
                </div>
                {

                  // item.list.map((item, i) => (
                  //   <Link href='/'>
                  //     {item}
                  //   </Link>
                  // ))
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className={`absolute h-[10px] z-100 left-0 right-0 flex flex-row justify-center ${change ? 'top-[20px]' : 'top-[50px]'}`} onClick={(e) => e.stopPropagation()}>
      <div className='pt-[20px] max-w-window w-full'>
        <div
          className='max-w-window w-full bg-white drop-shadow-box rounded-[8px] p-[25px] flex flex-row'
        >
          {showContent()}
        </div>
      </div>
    </div>
  )
}

export default BoxNavbar