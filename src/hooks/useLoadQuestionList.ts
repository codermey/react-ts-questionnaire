import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router'
import { KEYWORD_KEY, PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZE_VALUE } from '@/constant'
import { getQuestionListApi } from '@/services/api/question'
import type { QuestionListParams } from '@/services/api/types'

export const useLoadQuestionList = (params: QuestionListParams = {}) => {
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(KEYWORD_KEY) || ''
      const page = parseInt(searchParams.get(PAGE_KEY) || '1')
      const pageSize = parseInt(searchParams.get(PAGE_SIZE_KEY) || String(PAGE_SIZE_VALUE))

      const data = await getQuestionListApi({ ...params, keyword, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return {
    data,
    loading,
    error,
    refresh,
  }
}
