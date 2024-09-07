export const initializeSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    if (!recognition){
        console.warn("Recognition not supported by browser")
        return;
    }
    console.log("Web Speech API supported by browser (May produce false positive result");
    recognition.continuous = false; // this interface made no sense. Turning it on made results funny on android browsers. Shutting it off still gives the contineous results but fixes the problems.`
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    return recognition;
}