<template>
  <div class="rack-box">
    <!-- 状态 -->
    <div class="rack-mark" :class="statusFormat(box.status).className">{{ statusFormat(box.status).text }}</div>
    <!-- 备注 -->
    <a-tooltip placement="bottom">
      <template #title>
        <span>{{ box.remark }}</span>
      </template>
      <div v-if="box.remark" class="rack-remark">
        注
      </div>
    </a-tooltip>
    <!-- 内容 -->
    <div class="rack-content">
      <p class="rack-label">
        <span>{{ box.boxName }}</span>
      </p>
      <span class="rack-number">
        ({{ box.materialRemainNumber }}/{{ box.materialTotalNumber }})
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { findBoxInfoDistinct } from 'api/warehouse/meterial';

export default defineComponent({
  name: 'RackBox',
  props: {
    box: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      distinct: {}
    }
  },
  methods: {
    statusFormat (status) {
      const choices = {
        2: { className: 'rack-out', text: '出' },
        3: { className: 'rack-waiting', text: '待' }
      }
      return choices[status] || ''
    },
    initBoxInfoDistinct () {
      findBoxInfoDistinct({ boxCode: this.box.boxCode }).then(({ data }) => {
        this.distinct = data
      })
    }
  }
})
</script>

<style scoped lang="less">
.rack {
  &-box {
    position: relative;
    width: 13.02vw;
    height: 8.8536vw;
    background-image: url('assets/bg_box.png');
    background-size: 100% 100%;
    margin-bottom: 6.25vw;
    cursor: pointer;

    &:hover {
      background-image: url('assets/bg_box_hover.png');
    }
  }

  &-mark {
    position: absolute;
    top: 2.5vw;
    left: 2.5vw;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
  }

  &-remark {
    position: absolute;
    top: 2.5vw;
    right: 0.83vw;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F08E3A;
    font-size: 12px;
    border: 1px solid #F08E3A;
    background-color: #fff;
  }

  &-waiting {
    background-color: #F08E3A;
  }

  &-out {
    background-color: #FF6061;
  }

  &-content {
    position: absolute;
    top: 4.16vw;
    // left: 4.58vw;
    left: 4vw;
    text-align: center;
  }

  &-label {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 5.72vw;
    height: 1.67vw;
    padding: 0 8px;
    background-color: #00C44A;
    font-size: 16px;

    span {
      white-space: nowrap;
    }
  }

  &-number {
    color: #FF6061;
  }
}
@media screen and (max-width: 1440px) {
  .rack-label {
    span {
      font-size: 12px;
    }
  }
}
</style>