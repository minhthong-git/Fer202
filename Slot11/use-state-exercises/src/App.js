import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import CounterComponent from './components/CouterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div>
      <CounterComponent />
      <LightSwitch />
      <LoginForm /> 
      <LoginForm2 /> 
      <SearchItem /> 
      <SearchAccount />
      <RegistrationForm />
    </div>
  );
}

export default App;
