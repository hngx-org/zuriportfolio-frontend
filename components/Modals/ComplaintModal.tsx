import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-4 container">
      <h1 className="text-2xl font-bold">Submit a Complaint</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-brand-green-primary text-white-100 rounded-md hover:bg-green-100 hover:text-brand-green-primary "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
