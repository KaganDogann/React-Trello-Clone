import './App.css';
import Navi from './layouts/Navi';
import Dashboard from './layouts/Dashboard';


function App() {
  return (
    <div style={{backgroundImage:"../pexels-photo-2042108.jpeg"}} className="App">
      <Navi></Navi>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
