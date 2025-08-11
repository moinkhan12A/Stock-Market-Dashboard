import React from "react";

// Receive 'prediction' as a prop in addition to 'summary'
function SummaryBox({ summary, prediction }) {
  return (
    <div className="summary-box">
      <p>
        <strong>52-Week High:</strong> ₹{summary.high}
      </p>
      <p>
        <strong>52-Week Low:</strong> ₹{summary.low}
      </p>
      <p>
        <strong>Average Volume:</strong> {summary.avgVolume}
      </p>
      <p>
        <strong>SMA(20):</strong> ₹{summary.sma20}
      </p>

      {/* --- ADDED: Display the prediction if it exists --- */}
      {prediction && (
        <p>
          <strong>🤖 AI Predicted Next Price:</strong> ₹{prediction}
        </p>
      )}
    </div>
  );
}

export default SummaryBox;