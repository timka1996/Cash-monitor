export interface IUser {
  id: string
  fullname: string
  username: string
  password?: string
  age?: number
}
interface IPracticeDay {
  id: number
  date: string
}
interface IPracticeMonth {
  year: number | string
  month_humanize: string
}
export interface IUserInfo {
  id: number
  username: string
  fullname: string
  phone?: string
  organization_id?: number | any
  organization?: string
  organization_print_name?: string
  office?: boolean
  position_id?: number | any
  position?: string
  active?: boolean
  last_login?: string
  practice_day: IPracticeDay
  practice_month: IPracticeMonth
  rules?: any
  settings?: any
  prizma_status?: boolean
}
export interface IUserShortInfo {
  id: number | any
  fullname: string
}
