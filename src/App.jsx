import { HashRouter, Routes, Route } from 'react-router-dom';
import TabBar from './components/layout/TabBar';
import Home from './pages/Home';
import Hot from './pages/Hot';
import Market from './pages/Market';
import Profile from './pages/Profile';
import './styles/global.scss';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hot" element={<Hot />} />
          <Route path="/market" element={<Market />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <TabBar />
      </div>
    </HashRouter>
  );
}

export default App;
