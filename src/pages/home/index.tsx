import React from 'react'
import { useNavigate } from 'react-router'
import { MANAGE_INDEX_PATHNAME } from '@/router/constant'
import { Button } from 'antd'

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-[calc(100vh-64px-69px)] flex-col items-center justify-center gap-y-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-center">
      <h4 className="text-3xl font-bold">问卷调查 | 在线投票</h4>
      <p className="">已累计创建问卷 1000 份，发布问卷 980 份，收到答卷 980 份</p>
      <Button type="primary" size="large" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
        开始使用
      </Button>
    </div>
  )
}

export default Home
