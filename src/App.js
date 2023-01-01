import { Provider } from 'react-redux';
import './App.css';

import { store } from './Redux/Store';
import Posts from './Component/Posts';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
       <Posts/>
      </Provider>
    </div>
  );
}

export default App;
