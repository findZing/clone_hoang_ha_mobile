import React from 'react'

const InputForm = ({value, setValue, placeholder, type, widthChange, onKeyUp=(e) => {}}) => {

    return (
        <div className={`${widthChange ? `w-[${widthChange}px]` : 'w-full'} h-[40px] bg-full-gray rounded-[20px] flex items-center justify-center px-[12px] border border-gray-400`}>
            <input
                type={type}
                className='w-full bg-full-gray focus:outline-none py-[8px] text-[13px]'
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={onKeyUp}
            />
        </div>
    )
}

export default InputForm