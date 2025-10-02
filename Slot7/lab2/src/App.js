import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';


function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Menu />
      <OrderForm />

    </div>
  );
}

export default App;
