import React from "react";

function CompanyList({ companies, onSelect }) {
  return (
    <div className="sidebar">
      <h2>Companies</h2>
      <ul>
        {companies.map(c => (
          <li key={c.symbol} onClick={() => onSelect(c.symbol, c.name)}>
            {c.symbol} - {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
