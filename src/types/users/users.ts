export interface ICategories {
  id: number
  name: string
  type:string
  user:number
}

export interface ISpendings {
  type:string
  category: number | string,
  issuer: string,
  amount_dollar: number,
  amount_sum: number,
  description: string,
  dolar_price: number,
  issued: any
}

