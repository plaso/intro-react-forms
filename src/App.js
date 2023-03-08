import Home from './views/Home/Home';
import Navbar from './components/misc/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container my-5">
        <Home />
      </div>
    </div>
  );
}

export default App;
