import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import MainContent from '../Components/MainContent'
import { tabsfr } from '../data'

const Homepage = () => {
    
      const [tabs, setTabs] = useState(tabsfr)
  return (
    <>
    <div className="grid container gap-4  xl:grid-cols-[2.3fr_7.4fr_2.3fr] grid-cols-[3fr_9fr] lg:grid-cols-[2.3fr_7.4fr_2.3fr]">

<Sidebar tabs={tabs}/>
<MainContent/>

</div> 
    </>
  )
}

export default Homepage