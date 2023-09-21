import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ICategories } from '~/types/users/users'
import http from '~/utils/axios'

interface IState {
  categories: ICategories[]
  loading: boolean
  editing: null | boolean
  obj:ICategories
  search: string
}
export const categoriesStore = defineStore('categories', {
  state: (): IState => ({
    categories:[],
    loading: false,
    search: '',
    editing: false,
    obj: {
      id:0,
      name:'',
      type:'',
      user:0
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

      async editSettings() {
        try {
          await http.mainAPI.put(`/categories/${this.obj.id}/`,
            {
              name:this.obj.name,
              type:this.obj.type === 'Кирим' ? 'IN' : 'OUT'
            }
          );
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
    
      async createSettings() {
        try {
          await http.mainAPI.post(`/categories/`, {
            name:this.obj.name,
            type:this.obj.type === 'Кирим' ? 'IN' : 'OUT'
          });
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
      async deleteData(id:number){
        try {
          await http.mainAPI.delete(`/categories/${id}/`);
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }
   
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(categoriesStore, import.meta.hot))
