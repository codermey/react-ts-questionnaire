import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { KEYWORD_KEY } from '@/constant'
import { Input } from 'antd'

const Search: React.FunctionComponent = () => {
  const { Search } = Input

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')

  useEffect(() => {
    const keyword = searchParams.get(KEYWORD_KEY) || ''
    setValue(keyword)
  }, [searchParams])

  const onSearch = (value: string) => {
    navigate({
      pathname,
      search: `${KEYWORD_KEY}=${value}`,
    })
  }

  return (
    <Search
      placeholder="请输入问卷名进行搜索"
      style={{ width: 240 }}
      allowClear
      value={value}
      onChange={e => setValue(e.target.value)}
      onSearch={onSearch}
    />
  )
}

export default Search
