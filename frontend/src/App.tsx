import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Board from './pages/Board'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import { SprintProvider } from './context/SprintContext'

function App() {
  return (
    <ThemeProvider>
      <SprintProvider>
        <Router>
          <ScrollToTop />
          <div className="app-container">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/boards" element={<Board />} />
              </Routes>
            </main>
            <footer className="container" style={{
              padding: '64px 0',
              borderTop: '1px solid var(--glass-border)',
              marginTop: '120px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              <p>© {new Date().getFullYear()} Your Name Here.</p>
            </footer>
          </div>
        </Router>
      </SprintProvider>
    </ThemeProvider>
  )
}

export default App
