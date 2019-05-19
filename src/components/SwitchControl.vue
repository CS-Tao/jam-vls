<template>
  <div class="wrapper">
    <div class="btn" :class="activedItem==='wuhan'?'actived':null" @click="switchExperiment(0)">实验一</div>
    <div class="btn" :class="activedItem==='chengdu'?'actived':null" @click="switchExperiment(1)">实验二</div>
  </div>
</template>

<script>
export default {
  computed: {
    activedItem () {
      return this.$store.getters.experiment
    }
  },
  methods: {
    switchExperiment (index) {
      this.$store.commit('SWITCH_EXPERIMENT', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.wrapper {
  position: fixed;
  top: calc(50vh - 150px);
  right: 0;
  width: 60px;
  height: 120px;
  border-radius: 4px 0 0 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: $panel-opacity;
  background-color: #333;
  color: $text-color-normal;
  .btn {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      background-color: #444;
    }
    &.actived {
      background-color: #444;
    }
    &:first-child {
      border-radius: inherit;
      border-bottom-left-radius: 0;
    }
    &:last-child {
      border-radius: inherit;
      border-top-left-radius: 0;
    }
  }
  z-index: 1;
}
</style>
