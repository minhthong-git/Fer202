import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBankPlus from './components/QuestionBankPlus';

function App() {
  return (
    <div>
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <SignUpForm />
      <QuestionBank />
      <QuestionBankPlus />
    </div>
  );
}

export default App;