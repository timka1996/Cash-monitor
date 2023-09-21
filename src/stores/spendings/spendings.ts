import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ICategories, ISpendings } from '~/types/users/users'
import http from '~/utils/axios'

interface IState {
  categories: ICategories[]
  chosenCategories:any
  loading: boolean
  editing: null | boolean
  obj:ISpendings
  search: string
}
export const spendingsStore = defineStore('spendings', {
  state: (): IState => ({
    categories:[],
    chosenCategories:[],
    loading: false,
    search: '',
    editing: false,
    obj: {
      type:'',
      category: '',
      issuer: "",
      amount_dollar: 0,
      amount_sum: 0,
      description: "",
      dolar_price: 0,
      issued: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString().slice(0,16).replace('T', ' '),
    },
  }),
  actions: {
    async fetchData() {
      if (this.loading)
        return
      this.loading = true
      try {
        const res = await http.mainAPI.get('/categories' )
        let data = res.data.results
        this.categories = data.map((item:any) => {
          if (item.type === 'IN') {
            item.type = 'Кирим';
          } else if (item.type === 'OUT') {
            item.type = 'Чиким';
          }
          return item;
        });

      }
      catch (error) {
        return Promise.reject(error)
      }
      finally {
        this.loading = false
      }
    },
    
      async createSpendings() {
        try {
          await http.mainAPI.post(`/actions/`, {
            category: this.obj.category,
            issuer: this.obj.issuer,
            amount_dollar: this.obj.amount_dollar,
            amount_sum: this.obj.amount_sum,
            description: this.obj.description,
            dolar_price: this.obj.dolar_price,
            issued: new Date(new Date(this.obj.issued).getTime() + 0 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' '),
          });
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(spendingsStore, import.meta.hot))
