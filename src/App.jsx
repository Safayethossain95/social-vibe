
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Homepage from './pages/Homepage';
function App() {
  

  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    


   

    </>
  )
}

export default App
