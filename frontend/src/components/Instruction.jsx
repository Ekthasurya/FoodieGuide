import React from "react";
import "../css/Instruction.css";

const Instruction = () => {
  return (
    <div className="instructions-container">
      <h1>How to Use Food Guide</h1>
      <p>
        Follow these steps to get the best food recommendations using our voice assistant.
      </p>

      <h2>📌 Steps to Use</h2>
      <ol>
        <li>Click the **"Start Voice Input"** button.</li>
        <li>Say something like: <i>"Find the best burgers near me."</i></li>
        <li>Wait for the assistant to process your request.</li>
        <li>Listen to the response as the assistant speaks back.</li>
        <li>View the **top 5 recommended dishes** on the screen.</li>
      </ol>

      <h2>🔊 Voice Commands You Can Use</h2>
      <ul>
        <li>👉 "Find the best food near me."</li>
        <li>👉 "Suggest top 5 food."</li>
        <li>👉 "Show me popular Indian food nearby."</li>
        
      </ul>

      <h2>⚠️ Troubleshooting</h2>
      <p>
        If the voice assistant does not work, try these:
      </p>
      <ul>
        <li>Ensure your microphone is enabled.</li>
        <li>Use **Google Chrome** for better compatibility.</li>
        <li>Check your **internet connection**.</li>
        <li>Speak clearly and loudly.</li>
      </ul>

      <h2>🚀 Ready to Find Your Next Meal?</h2>
      <p>Click **Start Speaking** and let the Food Guide assistant help you!</p>
    </div>
  );
};

export default Instruction;
