import React from 'react'
import classNames from 'classnames'
import { formatDate, isUndefined } from '@/utils'
import {
  BarChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  FormOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Divider, Popconfirm, Tag } from 'antd'

import styles from './index.module.scss'

interface IQuestionCardProps {
  index?: number
  id: string | number
  title: string
  isPublished: boolean
  isStar?: boolean
  answerCount: number
  createdAt: string
  onRemove?: (id: string | number) => void
  onStar?: (id: string | number) => void
  onCopy?: (id: string | number) => void
}

const QuestionCard: React.FunctionComponent<IQuestionCardProps> = props => {
  const {
    id,
    title,
    isPublished,
    answerCount,
    createdAt,
    index,
    isStar,
    onStar,
    onCopy,
    onRemove,
  } = props

  return (
    <div className="rounded-md bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-500">
          {!isUndefined(index) && `${String(index).padStart(2, '0')}-`}
          {title}
        </div>
        <div className="flex items-center gap-x-4 text-xs">
          <Tag color={isPublished ? 'success' : 'error'}>{isPublished ? '已发布' : '未发布'}</Tag>
          <div className="">
            <span>答卷:</span>
            <span>{answerCount}</span>
          </div>
          <div className="text-gray-500">{formatDate(createdAt, 'YYYY年MM月DD日 hh:mm')}</div>
        </div>
      </div>

      <Divider size="middle" />

      <div className="flex gap-x-4 text-xs">
        <div className={styles['icon']}>
          <FormOutlined />
          编辑问卷
        </div>
        <div className={styles['icon']}>
          <BarChartOutlined />
          数据统计
        </div>
        <div className={classNames(styles['icon'], 'ml-auto')} onClick={() => onStar && onStar(id)}>
          {isStar ? <StarFilled className={'text-red-500'} /> : <StarOutlined />}
          {isStar ? '取消标星' : '标星'}
        </div>
        <div className={styles['icon']} onClick={() => onCopy && onCopy(id)}>
          <CopyOutlined />
          复制
        </div>
        <Popconfirm
          title="提示"
          description="您确定要删除该问卷吗?"
          onConfirm={() => onRemove && onRemove(id)}
          okText="确定"
          cancelText="取消"
        >
          <div className={styles['icon']}>
            <DeleteOutlined />
            删除
          </div>
        </Popconfirm>
      </div>
    </div>
  )
}

export default QuestionCard
