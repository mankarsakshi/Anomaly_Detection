import { useState } from "react";

function PredictionForm({ onResult }) {
    const [formData, setFormData] = useState({
        pressure: '',
        flow_rate: '',
        temperature: '',
        vibration: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            onResult(data);
        } catch (err) {
            setError('Failed to fetch prediction. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-cyan-400 p-4 rounded-xl shadow-lg space-y-3 backdrop-blur">
          <h2 className="text-cyan-400 font-semibold">🔍 Test Anomaly Prediction</h2>
          
          {['pressure', 'flow_rate', 'temperature', 'vibration'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-white/80 capitalize">{field}</label>
              <input
                type="number"
                step="any"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded-md bg-black/30 border border-white/20 text-white"
              />
            </div>
          ))}
    
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black px-4 py-2 rounded-md font-bold"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
    
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </form>
      );
}
    
export default PredictionForm;