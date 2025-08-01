import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZE_VALUE } from '@/constant'
import { formatDate } from '@/utils'
import { useLoadQuestionList } from '@/hooks'
import { QuestionItem } from '@/services/api/types'
import { Button, Table, TableColumnType, TableProps, Tag } from 'antd'
import { useRequest } from 'ahooks'
import { updateQuestionApi } from '@/services/api/question'

const ManageTrash: React.FunctionComponent = () => {
  const columns: TableColumnType<QuestionItem>[] = [
    {
      title: '问卷标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="success">已发布</Tag> : <Tag color="error">未发布</Tag>
      },
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return formatDate(createdAt)
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                console.log(record)
              }}
            >
              恢复
            </Button>
            <Button
              danger
              type="link"
              onClick={() => {
                console.log(record)
              }}
            >
              切底删除
            </Button>
          </>
        )
      },
    },
  ]

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [searchParams] = useSearchParams()
  const page = searchParams.get(PAGE_KEY) || 1
  const pageSize = searchParams.get(PAGE_SIZE_KEY) || PAGE_SIZE_VALUE

  const { loading, data } = useLoadQuestionList({ isDeleted: true })
  const { total, list: questionList } = data || { total: 0, list: [] }

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys as Array<string | number>)
  }

  const handleChange: TableProps<QuestionItem>['onChange'] = pagination => {
    const { current = 1, pageSize = 10 } = pagination
    navigate({
      pathname,
      search: `${PAGE_KEY}=${current}&${PAGE_SIZE_KEY}=${pageSize}`,
    })
  }

  // 恢复问卷
  const { run: recover } = useRequest(
    async () => {
      const promises = selectedRowKeys.map(key => {
        return updateQuestionApi(key, { isDeleted: false })
      })
      return await Promise.all(promises)
    },
    {
      manual: true,
      onSuccess: () => {
        console.log('恢复成功')
      },
    }
  )

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center gap-x-4">
        <Button type="primary" onClick={recover} disabled={selectedRowKeys.length === 0}>
          恢复
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => {
            console.log('切底删除')
          }}
          disabled={selectedRowKeys.length === 0}
        >
          切底删除
        </Button>
      </div>
      <Table<QuestionItem>
        rowKey="id"
        loading={loading}
        rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: onSelectChange }}
        dataSource={questionList}
        columns={columns}
        pagination={{ total, current: +page, pageSize: +pageSize }}
        scroll={{ y: 55 * 7 }}
        onChange={handleChange}
      />
    </div>
  )
}

export default ManageTrash
