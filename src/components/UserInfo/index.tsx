import { LOGIN_PATHNAME } from '@/router/constant'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router'

const UserInfo: React.FunctionComponent = () => {
  return (
    <Link to={LOGIN_PATHNAME}>
      <Button type="link">登录</Button>
    </Link>
  )
}

export default UserInfo
