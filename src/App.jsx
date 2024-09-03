import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import Button from './Components/Button';
import Prompts from './Components/Prompts';
import { useSetRecoilState } from 'recoil';
import { promptsState } from './Atoms/promptsAtom';

const App = () => {
    const [isStart, setIsStart] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const setPrompts = useSetRecoilState(promptsState)

    const randomSentenceGenerator = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/text/generate")
            const data = response.data;
            console.log(data);
            setPrompts(e =>{
                const temp = [...e,
                    data.text
                ]
                return temp;
            })
            setIsStart(true);
            setIsResponse(false);
        } catch (error) {
            console.warn("Error making get request: ", error)
        }
    }

    return (
        <div className='App overflow-hidden h-[100vh] '>
            <Navbar />

            {/* Start Screen  */}
            <div className={` ${isStart ? "hidden" : "flex"} start z-50 h-[90vh] w-[100vw] flex flex-col justify-center items-center `}>
                <Button text={"Start"} onClickHandler={randomSentenceGenerator} className={`w-[80vw] h-[10vh]`} />
            </div>

            <div id='content' className="content px-3 h-[90vh] flex flex-col justify-between ">
                <div className="instruction text-center p-3 text-2xl font-semibold">
                    {"Speak this sentence"}
                </div>

                <div className={`p-2 border-2 border-gray-500 rounded-xl h-[70%] overflow-scroll`}>
                    <Prompts isResponse={isResponse} />
                    <Prompts isResponse={true} />
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
