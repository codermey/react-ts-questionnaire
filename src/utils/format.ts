import dayjs from 'dayjs'

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  template = 'YYYY-MM-DD hh:mm:ss'
) => {
  return dayjs(date).format(template)
}
