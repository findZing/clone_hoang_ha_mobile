
import React, {useState, useEffect} from "react";
import {FaFacebookF, FaYoutube, FaInstagram, FaTiktok} from "react-icons/fa"

function SocialMediaBox() {
    const [screenSize, setScreenSize] = useState(undefined)
    const [change, setChange] = useState(false)

    useEffect(() => {
        const handleScreenSize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleScreenSize)

        handleScreenSize()

        return () => {
            window.removeEventListener('resize', handleScreenSize)
        }
    }, [])

    useEffect(() => {
        if(screenSize < 550) setChange(true)
        else setChange(false)
        // console.log(screenSize)
    }, [screenSize])

    return (
        <div className={`${change ? ' fixed bottom-0 left-[10%] w-[80%] h-[60px] rounded-[20px] border bg-white p-[10px] flex flex-row justify-between items-center' : 
            'fixed w-[48px] h-[198px] rounded-[30px] bg-white drop-shadow-second left-[40px] top-[400px] flex flex-col items-center justify-between'}`}>
            <div className="w-[44px] h-[44px] border-[2px] border-[#3c5a99] rounded-[50%] flex justify-center items-center">
                <FaFacebookF size={30} color="#3c5a99"/>
            </div>

            <div className="w-[44px] h-[44px] border-[2px] border-[#f00] rounded-[50%] flex justify-center items-center">
                <FaYoutube size={30} color="#f00"/>
            </div>

            <div className="w-[44px] h-[44px] border-[2px] border-instagram rounded-[50%] flex justify-center items-center">
                <FaInstagram size={30} color="#f00" className="instagram"/>
            </div>

            <div className="w-[44px] h-[44px] border-[2px] border-[#000] rounded-[50%] flex justify-center items-center">
                <FaTiktok size={30} color="#000"/>
            </div>
        </div>
    )
}

export default SocialMediaBox