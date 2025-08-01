import React from 'react'
import { Outlet } from 'react-router'

const QuestionLayout: React.FunctionComponent = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default QuestionLayout
