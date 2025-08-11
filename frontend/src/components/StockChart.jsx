import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

function StockChart({ stockData }) {
  const chartRef = useRef(null);        // Canvas ref
  const chartInstanceRef = useRef(null); // Chart.js instance ref

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockData.map(d => d.date),
          datasets: [{
            label: "Closing Price",
            data: stockData.map(d => d.close),
            borderColor: "blue",
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio:false,
          plugins: {
            legend: { display: true }
          }
        }
      });
    }

    // Cleanup chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [stockData]);

  return <div style={{ height: "400px" }}>
  <canvas ref={chartRef}></canvas>
</div>
}

export default StockChart;
