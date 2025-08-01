// 响应结构
export interface ResponseStructure<T = any> {
  code: number
  data?: T
  msg: string
}
