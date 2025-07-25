import React from 'react';
import './RightPanel.css';

export default function RightPanel() {
  return (
    <aside className="right-panel">
      <div className="panel-content">
        <div className="contact-info">
          <span className="phone-number">+90 533 826 09 83</span>
          <div className="phone-icon"></div>
        </div>
        
        <div className="illustration">
          <img 
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/Bi7Qvn1Uh7.png" 
            alt="Login illustration"
            className="illustration-image"
          />
        </div>
        
        <div className="panel-text">
          <h2 className="panel-title">Sign in to VBT</h2>
          <p className="panel-subtitle">Lorem Ipsum is simply</p>
        </div>
      </div>
    </aside>
  );
}
