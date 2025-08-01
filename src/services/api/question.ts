import { del, get, patch, post } from '../axios'
import { QuestionListParams, QuestionListResult } from './types'

export const getQuestionListApi = (params?: QuestionListParams) => {
  return get<QuestionListResult>('/api/question', params)
}

export const getQuestionDetailApi = (id: string | number) => {
  return get(`/api/question/${id}`)
}

export const createQuestionApi = (data: Record<string, any>) => {
  return post('/api/question', data)
}

export const updateQuestionApi = (id: string | number, data: Record<string, any>) => {
  return patch(`/api/question/${id}`, data)
}

export const duplicateQuestionApi = (id: string | number) => {
  return post(`/api/question/duplicate/${id}`)
}

export const deleteQuestionApi = (id: string | number) => {
  return del(`/api/question/${id}`)
}
