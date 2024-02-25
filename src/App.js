import React, { useState } from 'react'
import { UseNavigate } from "react"
import { startStopRecording, blob } from './RecordAudio.mjs'
import axios from 'axios';
import './App.css';

const App = () => {
  const [result, updateResult] = useState(false)
  const [text, setText] = useState("Practice and improve your spoken ENGLISH");
  const revist = () => {
    let navigate = UseNavigate();
    let path = './index.js'
    navigate('/')
  }
  const [missStrings, setMissArr] = useState("")
  const [incorrectStrings, setIncorrectArr] = useState("")
  const [misslen, setmisslen] = useState(0);
  const [len, setlength] = useState(0)
  const handleParaGeneration = async () => {
    try {
      const response = await axios.get('/generatePara');
      console.log("Response: ", response.data)
      setText(response.data.text)
      setlength((response.data.text).length)
      setHide(true)
    } catch (error) {
      console.log("Error generating text: ", error);
    }
  }
  const [correct, setCorrArr] = useState([])
  const [hide, setHide] = useState(false)
  const handleSentenceGeneration = async () => {
    try {
      const response = await axios.get('/generateChuck');
      setText(response.data.text)
      setlength((response.data.text).length)
      setHide(true)
      console.log("Response: ", response.data)
    } catch (error) {
      console.log("Error generating text: ", error);
    }
  }
  // const handleSentenceSearchGeneration = async () => {
  //   try {
  //     const response = await axios.get('/generateChuckSearch');
  //     setText(response.data.text)
  //     setlength((response.data.text).length)
  //     setHide(true)
  //     console.log("Response: ", response.data)
  //   } catch (error) {
  //     console.log("Error generating text: ", error);
  //   }
  // }
  const [change, setChange] = useState(false)
  const [load, setLoad] = useState("welcome")
  const [help, setcolur] = useState("green")
  const handlemouseover = () => {
    setcolur("red")
  }
  const [audiolen, setnewlen] = useState(0)
  const handlemouseout = () => {
    setcolur("blue")
  }

  const [transcriptButtonText, setTranscriptButtonText] = useState("Analyse");
  var toggleTranscript = true;
  const handleTranscript = async () => {
    if (toggleTranscript) {
      toggleTranscript = false;
      setTranscriptButtonText("Analysing... Please wait");
    } else {
      toggleTranscript = true;
      setTranscriptButtonText("Analyse");
    }

    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');
    updateResult(true)
    // Send data to backend
    try {
      console.log(formData);
      const response = await axios.post('/transcribeAudio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // setTranscript(response.data.transcript); // Assuming backend sends transcript in data
      console.log("Backend Response: ", response.data)
      setMissArr(response.data.missedArr.toString())
      setIncorrectArr(response.data.incorrectArr.toString())
      setCorrArr(response.data.correctArr)
      setChange(true)
      setnewlen((response.data.correctArr).length)
      setmisslen((response.data.missedArr).length)

      setTranscriptButtonText("DONE");

    } catch (error) {
      console.error('Error uploading audio:', error);
      setTranscriptButtonText("RETRY");

    }

    // reader.readAsArrayBuffer(audioURL); // Start reading Blob data
  }

  const [recordingButtonText, setRecordingButtonText] = useState("Tap to Speak");
  var toggle = false;
  const handleRecording = () => {
    if (toggle) {
      toggle = false;
      setRecordingButtonText("Tap to Speak again")
    } else {
      toggle = true;
      setRecordingButtonText("Tap to stop Speaking")
    }
    startStopRecording();
    // console.log("out in freedom of mjs")
  }
  return (
    <div className='App'>
      <Nav />

      <div style={{
        display: "block",
        justifyContent: "center",
        margin: "auto",
        marginTop: "50px",
        height: "600px",
        backgroundcolor: "blue"
      }}>

        <div style={{
          backgroundColor: "PapayaWhip",
          width: "600px",
          margin: "auto",
          boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px"
        }}>
          <div className='main-text-div'>
            <h1>{text}</h1>
          </div>
          <div>
            <br /><br />

            <div style={{ paddingLeft: "10px" }}>{!hide ? <button onClick={handleSentenceGeneration} style={{
              width: "500px",
              height: "69px",
              fontSize: "23px",
              fontWeight: "600",
              color: "#fff",
              cursor: "pointer",
              margin: "20px",
              textAlign: "center",
              border: "none",
              backgroundSize: "300% 100%",

              borderRadius: "50px",
              MozTransition: "all .4s ease-in-out",
              OTransition: "all .4s ease-in-out",
              WebkitTransition: "all .4s ease-in-out",
              transition: "all .4s ease-in-out ", backgroundImage: " linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)",
              boxShadow: "0 4px 15px 0 rgba(49, 196, 190, 0.75)"
            }}>Generate small Sentence</button> : <div></div>}</div>
            <br></br><br></br></div>

          <div style={{ paddingLeft: "10px" }}>{!hide ? <button onClick={handleParaGeneration} style={{
            width: "460px",
            height: "69px",
            fontSize: "23px",
            fontWeight: "600",
            color: "#fff",
            cursor: "pointer",
            margin: "20px",
            textAlign: "center",
            border: "none",
            backgroundSize: "300% 100%",

            borderRadius: "50px",
            MozTransition: "all .4s ease-in-out",
            OTransition: "all .4s ease-in-out",
            WebkitTransition: "all .4s ease-in-out",
            transition: "all .4s ease-in-out ", backgroundImage: " linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)",
            boxShadow: "0 4px 15px 0 rgba(49, 196, 190, 0.75)"
          }}>Generate Big Paragraph</button> : <div></div>}</div>
          <br></br><br></br>

          <div style={{ display: "flex", justifyContent: "center" }}>{hide ?
            <button onClick={handleRecording} style={{
              width: "300px",
              fontSize: "23px",
              fontWeight: "600",
              color: "#fff",
              cursor: "pointer",
              margin: "20px",
              height: "69px",
              textAlign: "center",
              border: "none",
              backgroundSize: "300% 100%",

              borderRadius: "50px",
              MozTransition: "all .4s ease-in-out",
              OTransition: "all .4s ease-in-out",
              WebkitTransition: "all .4s ease-in-out",
              transition: "all .4s ease-in-out ",
              backgroundImage: " linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)",
              boxShadow: "0 4px 15px 0 rgba(49, 196, 190, 0.75)"
            }}> {recordingButtonText}</button> : null}</div> <br></br><br></br>

          <div style={{ display: "flex", justifyContent: "center" }}>{hide ?
            <button onMouseOver={handlemouseover} onMouseOut={handlemouseout} onClick={handleTranscript} style={{
              width: "230px",
              fontSize: "23px",
              fontWeight: "600",
              color: "#fff",
              cursor: "pointer",
              margin: "20px",
              height: "69px",
              textAlign: "center",
              border: "none",
              backgroundSize: "300% 100%",

              borderRadius: "50px",
              MozTransition: "all .4s ease-in-out",
              OTransition: "all .4s ease-in-out",
              WebkitTransition: "all .4s ease-in-out",
              transition: "all .4s ease-in-out ", backgroundImage: " linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)",
              boxShadow: "0 4px 15px 0 rgba(49, 196, 190, 0.75)"
            }}>{transcriptButtonText}</button> : null
          }</div><br></br><br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>{result ? <h2>{result}</h2> : null}</div>
          <br></br>
        </div>
        <br></br>

      </div>

      <div style={{
        position: "fixed",
        bottom: "0",
        margin: "0",
        width: "100%"
      }}>
        <div style={{
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
        }}>{change ?
          <h3 className='footer-text' style={{
            color: "#333333",
            fontFamily: "Audrey",
            margin: "11px"
          }}>You Scored {audiolen}/{audiolen + misslen} correct words</h3> : null}
        </div>

        <div style={{
          bottom: "0",
          width: "100%",
          display: "block",
          justifyContent: "center",
          backgroundColor: "#333333"
        }}>{change ?
          <h3 className='footer-text' style={{
            color: "#FF7F7F",
            fontFamily: "Audrey",
            margin: "11px"
          }}>Missed Words: {missStrings}</h3> : null
          }

          {change ?
            <h3 className='footer-text' style={{
              color: "#FF1107",
              fontFamily: "Audrey",
              margin: "0"
            }}>Incorrect Words: {incorrectStrings}</h3> : null
          }

        </div>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <img src="logo.png" alt="Logo" /> */}
        <h2 className='nav-logo'>SPEECH BUDDY</h2>
      </div>
    </nav>
  );
}

export default App
