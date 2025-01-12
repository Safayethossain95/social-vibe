
import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import { tabsfr } from './data'
import MainContent from './Components/MainContent';

function App() {
  

  const [tabs, setTabs] = useState(tabsfr)
  
  return (
    <>
    {/* <div className="container"> */}
    <div className="grid container gap-4  xl:grid-cols-[2.3fr_7.4fr_2.3fr] grid-cols-[3fr_9fr] lg:grid-cols-[2.3fr_7.4fr_2.3fr]">

      <Sidebar tabs={tabs}/>
      <MainContent/>
      
    </div> 

 {/* </div> */}

   

    </>
  )
}

export default App
