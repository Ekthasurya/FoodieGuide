import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Food Guide</h1>
      <p>
        Welcome to <strong>Food Guide</strong>, your personal voice assistant for discovering the best food near you! Our app helps you find top-rated dishes from nearby restaurants using voice commands.
      </p>

      <h2>How It Works</h2>
      <ul>
        <li>Click the <strong>Start Speaking*</strong> button.</li>
        <li>Say something like: <i>"Top 5 Food Items Nearby."</i></li>
        <li>The assistant will suggest the <strong>top 5 dishes</strong> from nearby restaurants.</li>
        <li>You will hear a response and see recommendations on the screen.</li>
      </ul>

      <h2>Features</h2>
      <ul>
        <li>🎤 <strong>Voice Recognition</strong> – Search for food with your voice.</li>
        <li>📍 <strong>Location-Based Recommendations</strong> – Finds the best dishes near you.</li>
        <li>🔊 <strong>Text-to-Speech Responses</strong> – The assistant talks back to you.</li>
      </ul>

      <h2>Get Started</h2>
      <p>Simply click <strong>Start Speaking</strong>, ask for food recommendations, and enjoy your meal!</p>
    </div>
  );
};

export default About;
