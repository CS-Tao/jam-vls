<template>
  <div class="wrapper">
    <div class="btn" @click="switchExperiment(1)">实验一</div>
    <div class="btn" @click="switchExperiment(2)">实验二</div>
  </div>
</template>

<script>
export default {
  methods: {
    switchExperiment (index) {
      this.$emit('switchExperiment', index)
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
    border-radius: inherit;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      background-color: #444;
    }
  }
  z-index: 1;
}
</style>
