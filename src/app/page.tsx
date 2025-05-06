'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [formData, setFormData] = useState({
    genre: '',
    description: '',
    tone: 'casual',
    length: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-caption', formData);
      setCaption(response.data.caption);
    } catch (error) {
      console.error('Error generating caption:', error);
      alert('Failed to generate caption. Please try again.');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Generator Caption Media Sosial AI</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
              <div>
                <label className="block text-sm font-medium mb-2">Genre/Platform</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="contoh: Instagram, LinkedIn, Twitter"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan isi post kamu..."
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gaya Bahasa</label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="casual">Santai</option>
                  <option value="professional">Formal</option>
                  <option value="humorous">Lucu</option>
                  <option value="inspirational">Inspiratif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Panjang Caption</label>
                <select
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="short">Pendek</option>
                  <option value="medium">Sedang</option>
                  <option value="long">Panjang</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Sedang Generate...' : 'Generate Caption'}
              </button>
            </form>

            {caption && (
              <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Caption yang dibuat</h2>
                <p className="whitespace-pre-wrap">{caption}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(caption)}
                  className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                  Salin ke Clipboard
                </button>
              </div>
            )}
          </div>

          
        </main>
        <footer className='text-center'>
            Made with 🍜 by Rama
          </footer>
      </main>
    </div>
  );
}
