import React, { useState, useEffect } from "react";

const VoiceInput = ({ onText }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = false;
      newRecognition.interimResults = false;
      newRecognition.lang = "en-US";

      newRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized text:", transcript);
        setRecognizedText(transcript);

        // Speak the recognized text
        speakText(`You said: ${transcript}`);

        // Speak "Waiting for response" after repeating
        setTimeout(() => {
          speakText("pleasep, Waiting for response.");
        }, 2000); // Delay for better user experience

        if (typeof onText === "function") {
          onText(transcript);
        } else {
          console.error("onText is not a function:", onText);
        }
        setIsListening(false);
      };

      newRecognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    } else {
      console.warn("Speech Recognition is not supported in this browser.");
    }
  }, [onText]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setRecognizedText("");
      recognition.start();
    } else {
      alert("Speech Recognition is not supported in this browser. Please use Google Chrome.");
    }
  };

  // Function to speak text
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <button onClick={startListening} disabled={isListening} style={{ padding: "10px", fontSize: "16px" }}>
        {isListening ? "Listening..." : "Start Voice Input"}
      </button>
      <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
        {recognizedText && `You said: "${recognizedText}"`}
      </p>
    </div>
  );
};

export default VoiceInput;
