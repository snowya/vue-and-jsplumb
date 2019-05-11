<template lang="pug">
  div.header-container
    p.title Visual Board
    el-button(class="button" size="mini" @click="newCanvas" :disabled="!on_show") 新建
</template>

<script>
export default {
  props: {
    on_show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    newCanvas () {
      this.$router.push('/newCanvas')
    }
  }
}
</script>

<style lang="sass" scoped>
  .header-container
    display: flex
    align-items: baseline
    margin-bottom: 20px
    background-color: #4bb4ff
    width: 100%
    height: 75px
    p
      color: white
      margin-left: 10px
    .title
      font-size: 25px
      margin-left: 30px
    .button
      margin-left: 30px
</style>
