import React from 'react'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="min-h-screen bg-emerald-950 relative flex items-center justify-center p-4 overflow-hidden"> 
      {/* DECORATORS - ELEGANT LINES & RICH EMERALD GLOWS */} 
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#04785715_1px,transparent_1px),linear-gradient(to_bottom,#04785715_1px,transparent_1px)] bg-size-[30px_30px]" /> 
      <div className="absolute top-1/4 left-1/4 size-96 bg-emerald-500 opacity-10 blur-[120px] rounded-full" /> 
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-gold-500/5 opacity-10 blur-[100px] rounded-full" /> 
      
      <Outlet />
     </div>
  )
}

export default App
