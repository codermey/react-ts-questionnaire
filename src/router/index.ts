import { createBrowserRouter } from 'react-router'

import MainLayout from '@/layouts/Main'
import ManageLayout from '@/layouts/Manage'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Register from '@/pages/register'
import ManageList from '@/pages/manage/list'
import ManageStart from '@/pages/manage/start'
import NotFound from '@/pages/not-found'
import ManageTrash from '@/pages/manage/trash'
import Edit from '@/pages/question/edit'
import QuestionLayout from '@/layouts/Question'

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: 'manage',
        Component: ManageLayout,
        children: [
          {
            path: 'list',
            Component: ManageList,
          },
          {
            path: 'star',
            Component: ManageStart,
          },
          {
            path: 'trash',
            Component: ManageTrash,
          },
        ],
      },
      {
        path: 'question',
        Component: QuestionLayout,
        children: [
          {
            path: 'edit/:id',
            Component: Edit,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    Component: Login,
  },
  {
    path: 'register',
    Component: Register,
  },
  {
    path: '*',
    Component: NotFound,
  },
])

export default router
