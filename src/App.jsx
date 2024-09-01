import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import Button from './Components/Button';
import Prompts from './Components/Prompts';

const App = () => {
    const [isStart, setIsStart] = useState(true)
    const [isResponse, setIsResponse] = useState(false)

    return (
        <div className='App overflow-hidden h-[100vh] '>
            <Navbar />
            <div id='content' className="content px-3 h-[90vh] flex flex-col justify-between ">
                <div className={` ${isStart ? "hidden" : "flex"} start z-50 h-[90vh] w-[100vw] flex flex-col justify-center items-center `}>
                    <Button text={"Start"} className={`w-[80vw] h-[10vh]`} />
                </div>


                <div className="instruction text-center p-3 text-2xl font-semibold">
                    {"Speak this sentence"}
                </div>
                
                <div className={`p-2 border-2 border-gray-500 rounded-xl h-[70%] overflow-scroll`}>
                    <Prompts isResponse={isResponse}/>
                    <Prompts isResponse={true}/>
                </div>

                <div className="buttons">
                    <Button text={"Tap to Speak"} />
                    <Button text={"Skip"} />
                </div>
            </div>

        </div>
    )
}

export default App
