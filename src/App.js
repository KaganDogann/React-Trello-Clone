import './App.css';
import Navi from './layouts/Navi';
import Dashboard from './layouts/Dashboard';

const myStyle={
  backgroundImage: "url(https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg)",
  height:'100vh',
  width:"100%",
  
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

function App() {
  return (
    <div style={myStyle} className="App " >
      <Navi></Navi>
      <Dashboard></Dashboard>
      <p>adasda</p>
    </div>
  );
}

export default App;
