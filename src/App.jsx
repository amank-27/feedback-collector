import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './components/Footer';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light'); // For theme toggling

  // Toggle Theme Handler
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('All fields are required!');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://feedbackcollector-backend.onrender.com/api/submit-feedback', {
        name,
        email,
        message,
      });
      setName('');
      setEmail('');
      setMessage('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://feedbackcollector-backend.onrender.com/api/feedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      alert('Error fetching feedbacks');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Feedback Collector</h1>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Feedback Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {/* View Submitted Feedback Button */}
      <button
        onClick={fetchFeedbacks}
        className="mt-6 bg-gray-800 text-white py-2 px-4 rounded"
      >
        View Submitted Feedback
      </button>

      {/* Display Submitted Feedback */}
      <div className="mt-6 w-full max-w-md">
        {feedbacks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">All Feedback</h2>
            <ul>
              {feedbacks.map((feedback, index) => (
                <li key={index} className="mt-4 p-4 border border-gray-300 rounded">
                  <h3 className="font-semibold">{feedback.name}</h3>
                  <p>{feedback.message}</p>
                  <p className="text-sm text-gray-500">Submitted on {new Date(feedback.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
