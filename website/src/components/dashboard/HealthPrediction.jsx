import React, { useState } from 'react';

const MLModel = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Replace with your actual ML model API endpoint
    const API_URL = 'https://your-ml-model-railway-app-url.com/predict';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch prediction');
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>ML Model Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input data"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h3>Prediction Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default MLModel;