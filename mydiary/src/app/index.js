import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState({});

  useEffect(() => {
    axios.get('/api/entries')
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching entries:', error));
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setEntry(entries[event.target.value] || '');
  };

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  const handleSave = () => {
    axios.post('/api/entries', { date: selectedDate, entry })
      .then(response => {
        setEntries(response.data);
        alert('Entry saved!');
      })
      .catch(error => console.error('Error saving entry:', error));
  };

  return (
    React.createElement('div', null,
      React.createElement(Head, null,
        React.createElement('title', null, 'Diary'),
        React.createElement('link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' })
      ),
      React.createElement('div', { className: 'container mx-auto px-4 mt-8 min-h-screen' },
        React.createElement('h1', { className: 'text-2xl font-bold mb-4' }, 'Diary'),
        React.createElement('input', { type: 'date', value: selectedDate, onChange: handleDateChange, className: 'mb-4 p-2 border rounded' }),
        React.createElement('textarea', { value: entry, onChange: handleEntryChange, className: 'w-full p-2 border rounded mb-4', rows: 10 }),
        React.createElement('button', { onClick: handleSave, className: 'bg-blue-500 text-white p-2 rounded' }, 'Save')
      )
    )
  );
}