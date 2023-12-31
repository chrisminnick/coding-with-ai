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

  const unusedVariable = 'I am not used anywhere';

  return (
      <div>
          <h1>
              {title}
          </h1>

          <p>
              You clicked
              {counter}

              {' '}
              times
          </p>

          <button onClick={incrementCounter()}>
              Click me
          </button>
      </div>
  );
}

function AnotherComponent(props) {
  const [count] = useState(0);
  useEffect(function persistForm() {
    let userData = localStorage.getItem('data'); // userData is assigned but never used
  });

  return (<div>
      {props.children}
          </div>);
}

export default App;
