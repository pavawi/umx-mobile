import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/base/ErrorBoundary';
import TabBar from './components/layout/TabBar';
import Home from './pages/Home';
import Hot from './pages/Hot';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import './styles/global.scss';

function AppContent() {
  const location = useLocation();
  // 详情页不显示底部导航栏
  const hideTabBar = location.pathname.startsWith('/detail');

  return (
    <div className="app">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Hot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </ErrorBoundary>
      {!hideTabBar && <TabBar />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
