import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router'
import { HOME_PATHNAME } from '@/router/constant'

const Logo: React.FunctionComponent = () => {
  return (
    <>
      <Link to={HOME_PATHNAME} className="flex h-full items-center">
        <img className={styles.logo} src="/logo.png" alt="logo" />
      </Link>
    </>
  )
}

export default Logo
