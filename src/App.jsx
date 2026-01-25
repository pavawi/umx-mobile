import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import TabBar from './components/layout/TabBar';
import Home from './pages/Home';
import Hot from './pages/Hot';
import Market from './pages/Market';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import './styles/global.scss';

function AppContent() {
  const location = useLocation();
  // 详情页不显示底部导航栏
  const hideTabBar = location.pathname.startsWith('/detail');

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hot" element={<Hot />} />
        <Route path="/market" element={<Market />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      {!hideTabBar && <TabBar />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
