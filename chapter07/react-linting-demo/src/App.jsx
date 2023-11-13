import React, { useState, useEffect } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  let title = 'Hello World';

  useEffect(() => {
    document.title = `You clicked ${counter} times`;
  });

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1>{title}</h1>

      <p>
        You clicked
        {counter} times
      </p>

      <button onClick={incrementCounter} type="button">
        Click me
      </button>
    </div>
  );
}

export default App;
