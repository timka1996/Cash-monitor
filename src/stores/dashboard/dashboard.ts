import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ICategories } from '~/types/users/users'
import http from '~/utils/axios'
import useNotify from '~/composables/useNotify'
const notify = useNotify()

interface IState {
  categories: ICategories[]
  loading: boolean
  editing: null | boolean
  obj:ICategories
  search: string
  ordering:string
  category__type:string
  updatedDate: string
  date: any
}
export const dashboardStore = defineStore('dashboard', {
  state: (): IState => ({
    categories:[],
    loading: false,
    search: '',
    ordering: 'issued',
    category__type:'',
    updatedDate:'',
    date:{
      from:'',
      to:''
    },
    editing: false,
    obj: {
      id:0,
      name:'',
      type:'',
      user:0
    },
  }),
  actions: {
    async excel() {
      try {
        await http.mainAPI.get(`/actions/excel/`);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async fetchData() {
      if (this.loading)
        return
      this.loading = true
      try {
        const res = await http.mainAPI.get('/actions',
          {
            params: {
              page:1,
              search: this.search,
              category__type: this.category__type,
              date_before: this.date.to,
              date_after: this.date.from,
              ordering: this.ordering,
            },
          })
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
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(dashboardStore, import.meta.hot))
