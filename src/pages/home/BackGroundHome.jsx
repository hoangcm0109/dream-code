import React from "react";
import "./style.scss";
import { useEffect } from "react";
import './main.js'

const BackGroundHome = () => {
  useEffect(() => {
    const event = new Event('rendered')
    document.dispatchEvent(event)
}, [])
  return (
    <div className="background">
      <h1>Welcome to!</h1>
      <h2>Compiler Code</h2>
      <canvas id="birthday"></canvas>
    </div>
  );
};

export default BackGroundHome;
