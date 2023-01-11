
import React, {Suspense} from 'react';
import SocialMediaBox from './SocialMediaBox';
import Footer from './Footer';
import Navbar from './Navbar';
import ModalSearch from './ModalSearch';

import { useSelector } from 'react-redux';
import { useEventScroll, useEventWidth } from '../../useHook';

function Layout({ children }) {
    const {openModalSearch} = useSelector(state => state.navbar)

    const {changeScroll, changeWidth} = useSelector(state => state.app)

    useEventScroll()
    useEventWidth()

    
    return (
        <div className='bg-window flex flex-col'>
            
            <Navbar />
            <div className={`max-w-window w-full mx-auto flex flex-col gap-[15px] ${changeWidth > 900 ? 'my-[30px]' : 'mt-[116px]'}`}>
                {/* <Suspense fallback={<h1>Loading...</h1>}> */}
                    {children}

                {/* </Suspense> */}
                
                <Footer />    
            </div>
            
            {openModalSearch && <ModalSearch />}

            <SocialMediaBox />
        </div>
    )
}

export default Layout