import React, { useState } from 'react';
import { CSSProperties } from 'react';

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
        `https://api.github.com/users/${username}/repos`
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
    justifyContent: 'center',
  };

  return (
    <div style={container}>
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

export default App;
