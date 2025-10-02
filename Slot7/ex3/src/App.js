import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Exercise4 from './components/Exercise4';
import Exercise5 from './components/Exercise5';

function App() {
  return (
    <div>
      {/* Bài 3 */}
      <Banner />
      <Navbar />

      {/* Bài 4 */}
      <Exercise4 />

      {/* Bài 5 */}
      <Exercise5 />
    </div>
  );
}

export default App;
