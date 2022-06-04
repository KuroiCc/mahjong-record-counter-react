import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// local imports
import logo from './assets/logo.svg'
import styles from './App.module.css'
import { TestPage, CountPointsPage } from './pages'

function App() {
  const templateHome = (
    <header className={styles['App-header']}>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <p>
        Here is the home page <br />
        Click following link to other page
      </p>
      <Link className={styles['App-link']} to="/test">
        Test Page
      </Link>
      <Link className={styles['App-link']} to="/countPoints">
        Count Points Page
      </Link>
    </header>
  )
  return (
    <div className={styles.App}>
      <BrowserRouter basename="/count_points">
        <Routes>
          <Route path="/" element={templateHome} />
          <Route path="/countPoints" element={<CountPointsPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
