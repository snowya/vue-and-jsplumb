<template lang="pug">
  div.wrapper
    my-header(:on_show="this.on_show")
    div.container
      router-view(@on_click="show")

</template>

<script>
import MyHeader from './components/MyHeader'

export default {
  components: {
    MyHeader
  },
  data () {
    return {
      on_show: true
    }
  },
  methods: {
    show () {
      this.on_show = !this.on_show
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    flex-direction: column
    align-items: center
    background-color: #60d5fd
    .container
      width: 100%
</style>
