import React from 'react'
import { Outlet } from 'react-router'
import { Layout } from 'antd'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'

const { Header, Footer, Content } = Layout

const MainLayout: React.FunctionComponent = () => {
  return (
    <div>
      <Header className="flex items-center justify-between">
        <Logo />
        <UserInfo />
      </Header>
      <Content className="min-h-[calc(100vh-64px-69px)]">
        <Outlet />
      </Content>
      <Footer className="text-center">仿问卷星 &copy; 2025 - present. Created by codermey</Footer>
    </div>
  )
}

export default MainLayout
