import React from 'react'
import { Empty, Pagination, PaginationProps, Spin, Typography } from 'antd'
import { useLoadQuestionList } from '@/hooks'
import QuestionCard from '@/components/QuestionCard'
import Search from '@/components/Search'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZE_VALUE } from '@/constant'

const ManageStart: React.FunctionComponent = () => {
  const { Title } = Typography

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [searchParams] = useSearchParams()
  const page = searchParams.get(PAGE_KEY) || 1
  const pageSize = searchParams.get(PAGE_SIZE_KEY) || PAGE_SIZE_VALUE

  const { loading, data } = useLoadQuestionList({ isStar: true })
  const { total, list: questionList } = data || { total: 0, list: [] }

  const handlePaginationChange: PaginationProps['onChange'] = (page, pageSize) => {
    navigate({
      pathname,
      search: `${PAGE_KEY}=${page}&${PAGE_SIZE_KEY}=${pageSize}`,
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <Title level={4}>星标问卷</Title>
        <Search />
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spin></Spin>
        </div>
      ) : questionList.length ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto pb-4">
            {questionList.map(item => (
              <QuestionCard key={item.id} {...item}></QuestionCard>
            ))}
          </div>
          <Pagination
            align="end"
            total={total}
            pageSize={+pageSize}
            current={+page}
            onChange={handlePaginationChange}
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Empty description="暂无数据" />
        </div>
      )}
    </div>
  )
}

export default ManageStart
