import React from 'react'
import { useLoadQuestion } from '@/hooks/useLoadQuestion'

const Edit: React.FunctionComponent = () => {
  const { data, loading } = useLoadQuestion()

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">编辑问题</div>
      </div>

      <div>{loading ? '加载中...' : JSON.stringify(data)}</div>
    </>
  )
}

export default Edit
