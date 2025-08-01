import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useImmer } from 'use-immer'
import { useRequest } from 'ahooks'
import { KEYWORD_KEY, PAGE_SIZE_VALUE } from '@/constant'
import {
  duplicateQuestionApi,
  getQuestionListApi,
  updateQuestionApi,
} from '@/services/api/question'
import { Divider, Empty, message, Spin, Typography } from 'antd'
import Search from '@/components/Search'
import QuestionCard from '@/components/QuestionCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import type { QuestionItem } from '@/services/api/types'

const ManageList: React.FunctionComponent = () => {
  const { Title } = Typography

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(KEYWORD_KEY) || ''

  const [page, setPage] = useState(1)
  const [list, updateList] = useImmer<QuestionItem[]>([])
  const [total, setTotal] = useState(0)

  const hasMore = total > list.length

  const { loading, run: loadMoreData } = useRequest(
    () => getQuestionListApi({ page, pageSize: PAGE_SIZE_VALUE, keyword }),
    {
      manual: true,
      onSuccess: result => {
        const { list: questionList, total } = result
        updateList(draft => {
          draft.push(...questionList)
        })
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const resetData = () => {
    updateList([])
    setTotal(0)
    setPage(1)
  }

  useEffect(() => {
    resetData()
  }, [searchParams])

  useEffect(() => {
    if (page === 1) {
      loadMoreData()
    }
  }, [page])

  // 删除问卷
  const deleteQuestion = async (id: string | number) => {
    await updateQuestionApi(id, { isDeleted: true })
    updateList(draft => {
      const index = draft.findIndex(item => item.id === id)
      draft.splice(index, 1)
    })
    message.success('删除成功！')
  }

  // 复制问卷
  const copyQuestion = async (id: string | number) => {
    await duplicateQuestionApi(id)
    message.success('复制成功！')
    navigate('/question/edit/' + id)
  }

  // 标星问卷
  const starQuestion = async (id: string | number) => {
    await updateQuestionApi(id, { isStar: true })
    updateList(draft => {
      const index = draft.findIndex(item => item.id === id)
      draft[index].isStar = true
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <Title level={4}>我的问卷</Title>
        <Search />
      </div>
      {loading && !list.length ? (
        <div className="flex justify-center">
          <Spin></Spin>
        </div>
      ) : list.length ? (
        <div id="scrollContainer" className="flex-1 overflow-y-auto">
          <InfiniteScroll
            scrollableTarget="scrollContainer"
            next={loadMoreData}
            hasMore={hasMore}
            dataLength={list.length}
            loader={
              <Spin tip="Loading">
                <div className="flex items-center justify-center pt-20"></div>
              </Spin>
            }
            endMessage={<Divider>没有更多数据～</Divider>}
          >
            <div className="flex flex-col gap-y-4 p-1">
              {list.map((item, index) => (
                <QuestionCard
                  key={item.id}
                  {...item}
                  index={index + 1}
                  onRemove={deleteQuestion}
                  onCopy={copyQuestion}
                  onStar={starQuestion}
                ></QuestionCard>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Empty description="暂无数据" />
        </div>
      )}
    </div>
  )
}

export default ManageList
