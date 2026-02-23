import React, { useState } from 'react';

// Historical Context Assessment Tool
export const buildPriority = (row) => {
  const toNum = (v) => {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? 0 : Math.max(0, Math.min(3, n));
  };

  const impact = toNum(row.impact);
  const likelihood = toNum(row.likelihood);
  const relevance = toNum(row.relevance);

  const score = impact + likelihood + relevance;
  const hasValues = impact + likelihood + relevance > 0;

  if (!hasValues) {
    return { score: '—', label: 'No scores', className: 'risk-low', action: 'Enter scores to compute priority.' };
  }

  if (score >= 7) {
    return { score, label: 'Critical', className: 'risk-critical', action: 'Immediate mitigation before deployment.' };
  }
  if (score >= 5) {
    return { score, label: 'High', className: 'risk-high', action: 'Mitigation required and ongoing monitoring.' };
  }
  if (score >= 3) {
    return { score, label: 'Medium', className: 'risk-medium', action: 'Monitor and review periodically.' };
  }
  return { score, label: 'Low', className: 'risk-low', action: 'Document and keep under observation.' };
};

export const RiskMatrix = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 3 }).map(() => ({
      pattern: '',
      impact: '',
      likelihood: '',
      relevance: '',
      mitigation: '',
    }))
  );

  const updateRow = (idx, key, value) => {
    setRows((prev) => prev.map((row, rIdx) => (rIdx === idx ? { ...row, [key]: value } : row)));
  };

  const addRow = () => {
    setRows((prev) => [...prev, { pattern: '', impact: '', likelihood: '', relevance: '', mitigation: '' }]);
  };

  return (
    <>
      <div className="controls-row">
        <button type="button" onClick={addRow}>
          + Add row
        </button>
      </div>
      <div className="table-card">
        <div className="table-scroll">
          <table className="risk-matrix">
            <thead>
              <tr>
                <th>Historical Pattern</th>
                <th>Impact Severity (1–3)</th>
                <th>Occurrence Likelihood (1–3)</th>
                <th>System Relevance (1–3)</th>
                <th>Risk Priority Score</th>
                <th>Mitigation / Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const priority = buildPriority(row);
                return (
                  <tr key={idx}>
                    <td>
                      <textarea
                        className="matrix-notes"
                        aria-label={`Historical pattern row ${idx + 1}`}
                        value={row.pattern}
                        onChange={(e) => updateRow(idx, 'pattern', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        className="matrix-number"
                        aria-label={`Impact severity row ${idx + 1}`}
                        value={row.impact}
                        onChange={(e) => updateRow(idx, 'impact', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        className="matrix-number"
                        aria-label={`Occurrence likelihood row ${idx + 1}`}
                        value={row.likelihood}
                        onChange={(e) => updateRow(idx, 'likelihood', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        className="matrix-number"
                        aria-label={`System relevance row ${idx + 1}`}
                        value={row.relevance}
                        onChange={(e) => updateRow(idx, 'relevance', e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="risk-score-cell">
                        <span className={`risk-pill ${priority.className}`}>
                          <span>{priority.score}</span>
                          <span>{priority.label}</span>
                        </span>
                        <span className="risk-action">{priority.action}</span>
                      </div>
                    </td>
                    <td>
                      <textarea
                        className="matrix-notes"
                        aria-label={`Mitigation notes row ${idx + 1}`}
                        value={row.mitigation}
                        onChange={(e) => updateRow(idx, 'mitigation', e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Bias Source Identification Tool
export const PriorityTable = () => {
  const weights = {
    severity: 0.3,
    scope: 0.2,
    persistence: 0.2,
    historical: 0.2,
    feasibility: 0.1,
  };

  const normalize = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.min(5, Math.max(1, n));
  };

  const scoreRow = (row) => {
    const severity = normalize(row.severity);
    const scope = normalize(row.scope);
    const persistence = normalize(row.persistence);
    const historical = normalize(row.historical);
    const feasibility = normalize(row.feasibility);

    const score = Number(
      (
        severity * weights.severity +
        scope * weights.scope +
        persistence * weights.persistence +
        historical * weights.historical +
        feasibility * weights.feasibility
      ).toFixed(2)
    );

    if (score >= 4) return { score, label: 'High', className: 'priority-high', action: 'Mitigate immediately and monitor.' };
    if (score >= 3) return { score, label: 'Medium', className: 'priority-medium', action: 'Plan mitigation and track.' };
    return { score, label: 'Low', className: 'priority-low', action: 'Document and observe.' };
  };

  const createRow = () => ({
    name: '',
    owner: '',
    severity: 1,
    scope: 1,
    persistence: 1,
    historical: 1,
    feasibility: 1,
  });

  const [rows, setRows] = useState(Array.from({ length: 4 }).map(() => createRow()));

  const updateRow = (idx, key, value) => {
    setRows((current) => current.map((row, rIdx) => (rIdx === idx ? { ...row, [key]: value } : row)));
  };

  const addRow = () => setRows((current) => [...current, createRow()]);
  const clearRows = () => setRows(Array.from({ length: 4 }).map(() => createRow()));

  return (
    <div className="table-card">
      <div className="controls-row">
        <button type="button" onClick={addRow}>
          + Add row
        </button>
        <button type="button" onClick={clearRows}>
          Clear
        </button>
      </div>
      <div className="table-scroll">
        <table className="priority-table">
          <thead>
            <tr>
              <th>Bias source</th>
              <th>Owner</th>
              <th>Severity (1–5)</th>
              <th>Scope (1–5)</th>
              <th>Persistence (1–5)</th>
              <th>Historical align. (1–5)</th>
              <th>Intervention feasibility (1–5)</th>
              <th>Score</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const priority = scoreRow(row);
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="text"
                      aria-label={`Bias source row ${idx + 1}`}
                      value={row.name}
                      onChange={(e) => updateRow(idx, 'name', e.target.value)}
                      className="full-width-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      aria-label={`Owner row ${idx + 1}`}
                      value={row.owner}
                      onChange={(e) => updateRow(idx, 'owner', e.target.value)}
                      className="full-width-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="priority-number"
                      aria-label={`Severity row ${idx + 1}`}
                      value={row.severity}
                      onChange={(e) => updateRow(idx, 'severity', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="priority-number"
                      aria-label={`Scope row ${idx + 1}`}
                      value={row.scope}
                      onChange={(e) => updateRow(idx, 'scope', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="priority-number"
                      aria-label={`Persistence row ${idx + 1}`}
                      value={row.persistence}
                      onChange={(e) => updateRow(idx, 'persistence', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="priority-number"
                      aria-label={`Historical alignment row ${idx + 1}`}
                      value={row.historical}
                      onChange={(e) => updateRow(idx, 'historical', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="priority-number"
                      aria-label={`Intervention feasibility row ${idx + 1}`}
                      value={row.feasibility}
                      onChange={(e) => updateRow(idx, 'feasibility', e.target.value)}
                    />
                  </td>
                  <td>
                    <div className="priority-score">
                      <span className="priority-score-value">{priority.score}</span>
                    </div>
                  </td>
                  <td>
                    <div className="priority-score-cell">
                      <span className={`priority-pill ${priority.className}`}>
                        <span>{priority.score}</span>
                        <span>{priority.label}</span>
                      </span>
                      <span className="priority-action">{priority.action}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DetectNote = ({ id, label, children }) => {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const noteLabel = label || `Notes for ${id}`;

  const lowRelevance = rating > 0 && rating <= 2;
  const showNotes = rating >= 3;
  const statusText = rating === 0 ? 'Not marked' : lowRelevance ? 'Marked low relevance' : 'Marked relevant';
  const statusClass = rating === 0 ? 'detect-note-status' : lowRelevance ? 'detect-note-status detect-note-status--low' : 'detect-note-status';

  const renderStar = (value) => {
    const active = rating >= value;
    const starClass = active ? 'detect-note-star detect-note-star--active' : 'detect-note-star';
    return (
      <button
        key={value}
        type="button"
        aria-label={`${value} star${value > 1 ? 's' : ''} relevance`}
        onClick={() => setRating(value)}
        className={starClass}
      >
        {active ? '★' : '☆'}
      </button>
    );
  };

  const wrapperClass = lowRelevance ? 'detect-note detect-note--low' : 'detect-note';

  return (
    <div className={wrapperClass}>
      <div className="detect-note-header">
        <div className="detect-note-meta">
          <span className="detect-note-label">Relevance for your application</span>
          <div role="radiogroup" aria-label={`Relevance rating for ${id}`} className="detect-note-stars">
            {Array.from({ length: 5 }).map((_, idx) => renderStar(idx + 1))}
            <span className="detect-note-score">{rating ? `${rating}/5` : 'Not set'}</span>
            <span className={statusClass}>{statusText}</span>
          </div>
        </div>
      </div>

      <div className={lowRelevance ? 'detect-note-body detect-note-body--muted' : 'detect-note-body'}>
        {children}
        {showNotes ? (
          <div className="detect-note-notes">
            <label className="detect-note-notes-label">
              {noteLabel}
            </label>
            <textarea
              rows={3}
              className="note-area"
              aria-label={`${noteLabel} notes`}
              placeholder="Capture signals, tests, owners, and mitigation ideas."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
