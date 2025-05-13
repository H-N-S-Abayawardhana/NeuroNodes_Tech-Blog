import React, { Suspense } from 'react'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App