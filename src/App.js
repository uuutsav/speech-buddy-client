import React, { useState } from 'react'
import { startStopRecording, audioURL, blob } from './RecordAudio.mjs'
import axios from 'axios';

const App = () => {
  // fetch data from backend (as JSON)
  const fetchData = async () => {
    const resp = await axios.get("/api");
  }

  const handleParaGeneration = async () => {
    try {
      const response = await axios.get('/generatePara');
      console.log("Response: ", response.data)
    } catch (error){
      console.log("Error generating text: ", error);
    }
  }
  const handleSentenceGeneration = async () => {
    try {
      const response = await axios.get('/generateChuck');
      console.log("Response: ", response.data)
    } catch (error){
      console.log("Error generating text: ", error);
    }
  }
  const handleSentenceSearchGeneration = async () => {
    try {
      const response = await axios.get('/generateChuckSearch');
      console.log("Response: ", response.data)
    } catch (error){
      console.log("Error generating text: ", error);
    }
  }

  const handleTranscript = async () => {

    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');

    // Send data to backend
    try {
      console.log(formData);
      const response = await axios.post('/transcribeAudio', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      // setTranscript(response.data.transcript); // Assuming backend sends transcript in data
      console.log("Backend Response: ",response.data)
    } catch (error) {
      console.error('Error uploading audio:', error);
    }

    // reader.readAsArrayBuffer(audioURL); // Start reading Blob data
  }

  const handleRecording = () => {
    startStopRecording();
    // console.log("out in freedom of mjs")
  }
  return (
    <div>
      <h1>Hehe</h1>
      <button onClick={handleSentenceGeneration}>Generate Small Sentence</button><br></br><br></br>
      <button onClick={handleSentenceSearchGeneration}>Generate Small Sentence with a word in it</button><br></br><br></br>
      <button onClick={handleParaGeneration}>Generate Big Para</button> <br></br><br></br>
      <button onClick={handleRecording}>Start/Stop</button><br></br><br></br>
      <button onClick={handleTranscript}>Transcript</button><br></br><br></br>
    </div>
  )
}

export default App
