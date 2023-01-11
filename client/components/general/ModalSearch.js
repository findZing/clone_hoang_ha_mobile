import React from 'react'
import { useDispatch } from 'react-redux'
import { setOpenModalSearch } from '../../reducers/navBar'

const ModalSearch = () => {
    const dispatch = useDispatch()

    return (
        <div onClick={() => {dispatch(setOpenModalSearch({open:false}))}} className='fixed top-0 right-0 bottom-0 left-0 bg-contain-modal z-20'>
            
        </div>
    )
}

export default ModalSearch