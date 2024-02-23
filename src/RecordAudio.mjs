let mediaRecorder, chunks = [], audioURL = ''
let blob;

// / mediaRecorder setup for audio
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('mediaDevices supported..')

  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then(stream => {
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      blob = new Blob(chunks, { 'type': 'audio/webm' })
      chunks = []
      audioURL = window.URL.createObjectURL(blob)
      console.log(audioURL);
    }
  }).catch(error => {
    console.log('Following error has occured : ', error)
  })
} else {
  // stateIndex = ''
  // application(stateIndex)
}

// console.log("Hehe?")

let recording = false;

export const startStopRecording = () => {
  // console.log(recording)

  if (recording) {
    mediaRecorder.stop()
    recording = false;
    console.log("Recording Stopped, URL: " + audioURL)
  } else {
    // addMessage('Recording...')
    mediaRecorder.start()
    recording = true;
    console.log("Recording Started")
  }
}

console.log("URL from RecordAudio.mjs: ", audioURL)
export {audioURL};
export {blob};