import React from 'react'
// local imports
import styles from './testPage.module.css'
// import { PtSettingForm } from '../../components'
import { CountPointsPage } from '..'

export const TestPage: React.FC = () => {
  return (
    <div className={styles.testPageStage} style={{ padding: '10px' }}>
      <CountPointsPage />
    </div>
  )
}
