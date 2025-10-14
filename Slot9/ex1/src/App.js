
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterPage from './pages/FooterPage';
import HomePage from './pages/HomePage.jsx';
import AppNavBar from './components/NavBar/NavBar.jsx';

function App() {
  return (
    <div>
      <AppNavBar />
      <HomePage />
      <FooterPage /> 
    </div>
  );
}

export default App;