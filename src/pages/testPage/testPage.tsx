import React from 'react'
// local imports
import styles from './testPage.module.css'
import { PtSettingForm } from '../../components'

export const TestPage: React.FC = () => {
  return (
    <div className={styles.testPageStage}>
      <PtSettingForm />
    </div>
  )
}
