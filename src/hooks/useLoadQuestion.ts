import { useRequest } from 'ahooks'
import { getQuestionDetailApi } from '@/services/api/question'
import { useParams } from 'react-router'

export const useLoadQuestion = () => {
  const { id = '' } = useParams()
  const { data, loading } = useRequest(() => getQuestionDetailApi(id))

  return { data, loading }
}
