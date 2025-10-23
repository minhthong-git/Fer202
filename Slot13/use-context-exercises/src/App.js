//áp dụng ThemeProvider để bao bọc toàn bộ ứng dụng
import { ThemeProvider } from "./contexts/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
        <CounterComponent />
        <LightSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;
