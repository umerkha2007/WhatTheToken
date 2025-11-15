import { useState } from 'react';
import { calculateEnergy, calculateCO2 } from './utils/energyCalculator';
import { EQUIVALENCES, calculateEquivalence, formatEquivalence, type EquivalenceResult } from './data/equivalences';
import { getModelById, getModelsByProvider } from './data/models';
import './App.css';

interface Results {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  energyKWh: number;
  energyWh: number;
  co2Grams: number;
  equivalences: EquivalenceResult[];
  modelParams?: number;
  modelName?: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);

  const modelsByProvider = getModelsByProvider();

  const handleCalculate = () => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const selectedModel = selectedModelId ? getModelById(selectedModelId) : undefined;
    const energyData = calculateEnergy(query, null, selectedModel);
    const co2 = calculateCO2(energyData.energyKWh);

    // Calculate equivalences for enabled items
    const equivalences = EQUIVALENCES
      .filter(eq => eq.enabled)
      .map(eq => ({
        ...eq,
        value: calculateEquivalence(energyData.energyWh, eq),
        formatted: formatEquivalence(
          calculateEquivalence(energyData.energyWh, eq),
          eq
        )
      }));

    setResults({
      ...energyData,
      co2Grams: co2 * 1000, // Convert to grams
      equivalences
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚡ WhatTheTokens</h1>
        <p className="subtitle">Understand the energy impact of your LLM queries</p>
      </header>

      <main className="App-main">
        <div className="input-section">
          <label htmlFor="query-input">
            <h2>Enter your LLM query:</h2>
          </label>
          <textarea
            id="query-input"
            className="query-input"
            placeholder="e.g., Write a Python function to calculate fibonacci numbers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={6}
          />

          <div className="model-selector">
            <label htmlFor="model-select">
              <strong>Model (optional):</strong>
              <span className="optional-label">Select for more accurate estimates</span>
            </label>
            <select
              id="model-select"
              className="model-select"
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
            >
              <option value="">Average Model (~7B parameters)</option>
              {Object.entries(modelsByProvider).map(([provider, models]) => (
                <optgroup key={provider} label={provider}>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.parameters}B params)
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <button 
            className="calculate-btn" 
            onClick={handleCalculate}
            disabled={!query.trim()}
          >
            Calculate Energy Impact
          </button>
        </div>

        {results && (
          <div className="results-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{results.inputTokens}</div>
                <div className="stat-label">Input Tokens</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{results.outputTokens}</div>
                <div className="stat-label">Est. Output Tokens</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{results.energyWh.toFixed(4)}</div>
                <div className="stat-label">Energy (Wh)</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{results.co2Grams.toFixed(2)}</div>
                <div className="stat-label">CO₂ (grams)</div>
              </div>
            </div>

            {results.modelName && (
              <div className="model-info">
                <p>
                  <strong>Model:</strong> {results.modelName} ({results.modelParams}B parameters)
                </p>
              </div>
            )}

            <div className="equivalences-section">
              <h3>🔌 Your query could power:</h3>
              <div className="equivalences-grid">
                {results.equivalences.map(eq => (
                  <div key={eq.id} className="equivalence-card">
                    <div className="equivalence-emoji">{eq.emoji}</div>
                    <div className="equivalence-value">{eq.formatted}</div>
                    <div className="equivalence-label">{eq.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-box">
              <p>
                <strong>💡 Did you know?</strong> This is an estimate based on {results.modelName ? 'the selected model\'s' : 'typical LLM'} energy consumption.
                Actual values vary by hardware, implementation, and datacenter efficiency.
              </p>
            </div>
          </div>
        )}

        {!results && (
          <div className="placeholder-section">
            <p>Enter a query above to see its estimated energy impact</p>
            <p className="hint">💡 Tip: Select a specific model for more accurate results</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>
          Made with 🌱 for sustainability awareness | 
          Based on research from <a href="https://ecologits.ai/" target="_blank" rel="noopener noreferrer">EcoLogits</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
