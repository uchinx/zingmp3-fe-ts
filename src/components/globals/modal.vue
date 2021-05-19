<script lang="ts">
export default {
  props: {
    modelValue: { type: Boolean },
    title: { type: String },
  },
  setup({}, { emit }) {
    function handleClose() {
      emit('update:modelValue', false)
    }
    return {
      handleClose,
    }
  },
}
</script>

<template>
  <teleport to=".default-layout" v-if="modelValue">
    <div class="wrapper-modal" @click="handleClose">
      <div class="modal" @click.stop>
        <div class="top-right">
          <button class="btn" @click="handleClose">
            <i class="icon ic-close"></i>
          </button>
        </div>
        <h2 v-if="title" class="title">{{ title }}</h2>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.wrapper-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 111111;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0008;
  .modal {
    width: 70vw;
    max-width: 900px;
    background: var(--background);
    border-radius: 8px;
    position: relative;
    padding: 15px 30px;
    .top-right {
      position: absolute;
      top: 10px;
      right: 15px;
      .btn {
        background: transparent !important;
        i.icon {
          font-size: 25px;
        }
      }
    }
    h2.title {
      font-weight: bold;
      padding-bottom: 15px;
      font-size: 26px;
    }
    .content {
      padding-bottom: 15px;
    }
  }
}
</style>
