<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    percent: { type: Number },
    busyWhileProgress: { type: Boolean }
  },
  setup(props, { emit }) {
    let temp = 0
    const percentage = computed({
      get() {
        return props.percent
      },
      set(val) {
        temp = val
        emit('update:percent', val)
      }
    })
    const ele = ref()
    const isBusy = ref(false)
    const store = useStore()

    function handler(ev) {
      if (ev.type === 'click' && ev.target) {
        percentage.value = (ev.offsetX / ev.target.offsetWidth) * 100
        emit('change', temp)
        return
      }

      if (ev.type === 'mousedown') {
        isBusy.value = true
      }
    }

    watch(isBusy, (val) => {
      if (props.busyWhileProgress) {
        store.state.player.isProgressBusy = val
      }
    })


    function handleMouseup() {
      if (isBusy.value) {
        emit('change', temp)
      }
      isBusy.value = false
    }

    function handleMousemove(ev) {
      if (isBusy.value) {
        const e = ele.value
        if (e) {
          const w = e.offsetWidth
          let x = ev.clientX - e.offsetLeft
          if (x < 0) x = 0
          if (x > w) x = w
          if (ev.target) {
            percentage.value = (x / w) * 100
            emit('progress', temp)
          }
        }
      }
    }

    onMounted(() => {
      document.addEventListener('mouseup', handleMouseup)
      document.addEventListener('mousemove', handleMousemove)
    })

    onUnmounted(() => {
      document.removeEventListener('mouseup', handleMouseup)
      document.removeEventListener('mousemove', handleMousemove)
    })

    return {
      ele,
      handler,
      percentage,
    }
  },
}
</script>

<template>
  <div class="progress-bar" ref="ele" @mousedown="handler" @click="handler">
    <div class="progress-bg">
      <div class="progress" :style="{ width: percentage + '%' }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    .progress::after {
      visibility: visible !important;
    }
    .progress-bg {
      height: 4px;
    }
  }
  & * {
    pointer-events: none;
  }
  .progress-bg {
    width: 100%;
    height: 3px;
    position: relative;
    background: var(--progress-bg);
  }
  .progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: var(--progress);
    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      z-index: 11111;
      background: var(--progress);
      box-shadow: 0px 0px 2px 1px #0008;
      visibility: hidden;
    }
  }
}
</style>
