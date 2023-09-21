<script setup lang="ts">
import { useVariablesStore } from '~/stores/variables'
const router = useRouter()
const variablesStore = useVariablesStore()


onMounted(() => {
  variablesStore.pageTitle = 'Bosh sahifa'
  router.push('/dashboard')
})
</script>

<template>
  <div class="container_">
    <span class="header_title"></span>
   
  </div>
</template>

<style scoped>
.container_ {
  width: 90%;
  margin: 0 auto;
}

.left_ {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.header_title {
  font-size: 25px;
  font-family: sans-serif;
  color: #303030;
  font-weight: 900;
}
.sub_header_title {
  font-weight: 600;
  font-size: 16px;
}
.date_title {
  font-weight: 500;
  color: gray;
  font-size: 12px;
  margin-left: 5px;
}

.version_body1 {
  font-size: 14px;
  font-family: sans-serif;
  color: #404040;
  font-weight: 500;
  background: #f5f5f56b;
  margin-top: 10px;
  padding: 0 8px;
  width: 100%;
}

@media (max-width: 1400px) {
  .header_title {
    font-size: 20px;
  }
  .sub_header_title {
    font-size: 16px;
  }
  .date_title {
    font-size: 12px;
  }
  .left_ {
    width: 160px;
  }
  .version_body1 {
    font-size: 12px;
  }
}
</style>
