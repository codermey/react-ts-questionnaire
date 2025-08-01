export interface ListResult<T = any> {
  total: number
  list: T[]
}

export interface ListParams {
  page?: number
  pageSize?: number
}

export interface QuestionListParams extends ListParams {
  keyword?: string
  isStar?: boolean
  isDeleted?: boolean
}

export interface QuestionItem {
  id: string | number
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

export type QuestionListResult = ListResult<QuestionItem>
