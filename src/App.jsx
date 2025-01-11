
import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import { tabsfr } from './data'

function App() {
  

  const [tabs, setTabs] = useState(tabsfr)

  return (
    <>
    <div className="container">

      <Sidebar tabs={tabs}/>
    </div>
    </>
  )
}

export default App
