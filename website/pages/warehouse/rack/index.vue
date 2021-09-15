<template>
  <div>
    货架
    <RackHeader :rack-number="rackNumber" :rack-count="rackCount" />
    <a-layout-content>
      <div class="box-content">
        <RackBox v-for="box in boxs" :key="box.id" :box="box" />
      </div>
    </a-layout-content>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RackHeader from './components/header.vue'
import RackBox from './components/box.vue'
import { useRouter } from "vue-router"
import { findBoxPageData, findBoxRackCount } from "api/warehouse/meterial";

export default defineComponent ({
  name: 'Rack',
  components: { RackHeader, RackBox },
  computed: {
    rackNumber () {
      const router = useRouter();
      return router.currentRoute.value.params.id
    }
  },
  data () {
    return {
      boxs: [],
      params: {
        currentPage: 1,
        pageSize: 20,
        rackNumber: useRouter().currentRoute.value.params.id
      },
      rackCount: {
        materialInStockNum: '',
        boxInStockNum: ''
      }
    }
  },
  created () {
    this.initRackBox()
    this.initRackCount()
  },
  methods: {
    initRackBox () {
      findBoxPageData(this.params).then(({ data }) => {
        this.boxs.push(...data.content)
        if (this.boxs.length >= data.totalNum) {
          // ...
        }
      })
    },
    initRackCount () {
      findBoxRackCount({ rackNumber: this.params.rackNumber }).then(({ data }) => {
        this.rackCount = data
      })
    }
  }
})
</script>

<style scoped lang="less">
.box {
  &-content {
    padding: 4.06% 6.25%;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-gap: 24px;
  }
}
</style>