import React from 'react'
import styles from './index.module.scss'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { Button, message, Space } from 'antd'
import { DeleteOutlined, FileOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import {
  MANAGE_INDEX_PATHNAME,
  MANAGE_STAR_PATHNAME,
  MANAGE_TRASH_PATHNAME,
} from '@/router/constant'
import { createQuestionApi } from '@/services/api/question'
import { useRequest } from 'ahooks'

const ManageLayout: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: handleQuestionCreate } = useRequest(() => createQuestionApi({}), {
    manual: true,
    onSuccess: ({ id }) => {
      if (id) {
        navigate(`/question/edit/${id}`)
        message.success('创建成功')
      }
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            className="mb-10"
            type="primary"
            icon={<PlusOutlined />}
            disabled={loading}
            onClick={() => handleQuestionCreate()}
          >
            新建问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_INDEX_PATHNAME) ? 'default' : 'text'}
            icon={<FileOutlined />}
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_STAR_PATHNAME) ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_TRASH_PATHNAME) ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
