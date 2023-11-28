import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CSSProperties } from 'react';

import './index.css';

interface Repository {
  id: number;
  name: string;
}

function App() {
  const [githubUser, setGitHubUser] = useState<string>('');
  const [repos, setRepos] = useState<Repository[]>([]);

  const fetchRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUser}/repos`
      );
      const data: Repository[] = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setRepos([]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRepos();
  };

  const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  return (
    <div style={container}>
      <h1>GitHub Repository Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={githubUser}
          onChange={(e) => setGitHubUser(e.target.value)}
          placeholder="GitHub Username"
        />
        <button type="submit">Get Repositories</button>
      </form>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
