import React from 'react';
import { WORKFLOW_STEPS } from '../data/productsData';

export default function ProcessSteps() {
  return (
    <div className="process-grid">
      {WORKFLOW_STEPS.map((step) => (
        <div key={step.step} className="process-card">
          <div className="process-number">{step.step}</div>
          <h3 className="process-title">{step.title}</h3>
          <p className="process-desc">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
