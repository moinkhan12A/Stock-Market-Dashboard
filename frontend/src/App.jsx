import React, { useState, useEffect } from "react";
import CompanyList from "./components/CompanyList";
import StockChart from "./components/StockChart";
import SummaryBox from "./components/SummaryBox";
import "./index.css";

const API_BASE = "http://localhost:5000/api";

function App() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [stockData, setStockData] = useState([]);
    const [summary, setSummary] = useState(null);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/companies`)
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error(err));
    }, []);

    const loadCompanyData = async (symbol, name) => {
        setSelectedCompany({ symbol, name });
        setSummary(null);
        setPrediction(null);

        try {
            const [stockRes, summaryRes, predictRes] = await Promise.all([
                fetch(`${API_BASE}/stock/${symbol}`),
                fetch(`${API_BASE}/stock/${symbol}/summary`),
                fetch(`${API_BASE}/stock/${symbol}/predict`),
            ]);

            if (!stockRes.ok || !summaryRes.ok || !predictRes.ok) {
                throw new Error(`One or more API requests failed`);
            }

            const stockJson = await stockRes.json();
            const summaryJson = await summaryRes.json();
            const predictJson = await predictRes.json();

            setStockData(stockJson.prices);
            setSummary(summaryJson);
            setPrediction(predictJson.prediction);

        } catch (error) {
            console.error("Error loading company data:", error);
        }
    };

    return (
        <div className="container">
            <CompanyList companies={companies} onSelect={loadCompanyData} />
            <div className="main">
                {selectedCompany ? (
                    <>
                        <h2>
                            {selectedCompany.symbol} - {selectedCompany.name}
                        </h2>
                        <StockChart stockData={stockData} />
                        {summary && (
                            <SummaryBox summary={summary} prediction={prediction} />
                        )}
                    </>
                ) : (
                    <h2>Select a Company</h2>
                )}
            </div>
        </div>
    );
}

export default App;