import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes';
import { store } from '../store/store';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App container">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
