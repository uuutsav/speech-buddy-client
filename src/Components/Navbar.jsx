import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar w-full h-[8vh] bg-gray-800 flex flex-col justify-center ">
            <div className='flex justify-between p-3 md:px-[23vw]'>
                <div className="navbar-logo md:text-2xl text-blue-500 font-semibold p-2 ">
                    SPEECH BUDDY
                </div>
                <div className="navbar-logo md:text-2xl text-blue-500 font-semibold border-2 border-blue-500 py-2 px-3 rounded-full duration-150 hover:scale-110 hover:bg-blue-500 hover:text-gray-800 ">
                    <a href="mailto:utsav.will.work@gmail.com?cc=21051903@kiit.ac.in&subject=Hiring%20Related%20Communication&">Hire The Developer</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar