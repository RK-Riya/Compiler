import axios from 'axios';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };

    setLoading(true);
    setOutput(''); // Clear previous output

    try {
      const { data } = await axios.post('http://localhost:5000/run', payload);
      setOutput(data.output || 'No output received.');
    } catch (error) {
      const errMsg =
        error?.response?.data?.err?.stderr ||
        error?.response?.data?.err?.message ||
        'An unknown error occurred during code execution.';
      setOutput(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <p>Welcome to the online code compiler. You can write and execute your code here.</p>
      <br />

      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>

      <br />
      <textarea
        rows="20"
        cols="70"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Running...' : 'Run Code'}
      </button>

      {output && (
        <div>
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
