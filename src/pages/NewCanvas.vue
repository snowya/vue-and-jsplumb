<template lang="pug">
 div.wrap
   div.left
      .block(v-for="(item,index) in dataList" class="node" :id="index + 1")
         p.title {{ item.title }}
   div.right
      div.canvas(id="canvas")
      div.step
        el-button(class="button" size="mini" @click="save()") 保存
        el-button(class="button" size="mini" @click="clear()") 清空
        el-button(class="button" size="mini" @click="back()") 返回

</template>

<script>
import {jsPlumb} from 'jsplumb'
import $ from 'jquery'
// jquery-ui引入的时候，直接写 import juqery-ui 没有效果，只能直接写到具体的方法
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'
import 'jquery-ui/ui/widgets/resizable'
import {CreateModel} from '../vendor/Model'

export default {
  data () {
    return {
      id: '',
      dataList: [
        {
          title: 'item-1'
        },
        {
          title: 'item-2'
        },
        {
          title: 'item-3'
        },
        {
          title: 'item-4'
        },
        {
          title: 'item-5'
        },
        {
          title: 'item-6'
        },
        {
          title: 'item-7'
        },
        {
          title: 'item-8'
        },
        {
          title: 'item-9'
        },
        {
          title: 'item-10'
        },
        {
          title: 'item-11'
        },
        {
          title: 'item-12'
        }
      ],
      position_data: [],
      id_group: []// 储存已经进入canvas的id
    }
  },
  created () {
    this.$emit('on_click')
  },
  mounted () {
    plumbIns.repaintEverything()
    let plumbIns = jsPlumb.getInstance()
    let defaultConfig = {
      // 对应基本概念
      anchor: ['Left', 'Right', 'Top', 'Bottom', [0.3, 0, 0, -1], [0.7, 0, 0, -1], [0.3, 1, 0, 1], [0.7, 1, 0, 1]],
      connector: ['Straight'],
      DragOptions: {cursor: 'move'},
      endpoint: 'Blank',
      // 添加样式
      paintStyle: {stroke: '#909399', strokeWidth: 2}, // connector
      // endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 } // endpoint
      // 添加 overlay，如箭头
      overlays: [['Arrow', {width: 8, length: 8, location: 1}]] // overlay
    }

    let relations = [
      ['1', '2'],
      ['2', '3'],
      ['3', '4'],
      ['4', '5'],
      ['5', '7'],
      ['6', '7'],
      ['7', '8'],
      ['8', '9'],
      ['9', '10'],
      ['10', '11'],
      ['11', '12']
    ]

    let that = this
    plumbIns.ready(() => {
      $('.node').draggable({
        revert: 'invalid',
        cursor: 'move',
        grid: [45, 45],
        scope: 'flag'
      })
      $('.canvas').droppable({
        scope: 'flag',
        drop (event, ui) {
          CreateModel(ui, $(this))
          let id = $(ui.draggable).attr('id')
          plumbIns.setContainer('canvas')
          plumbIns.draggable(id, {containment: 'parent', grid: [45, 45]})
          if (that.id_group.indexOf(id) === -1) {
            that.id_group.push(id)
            for (let item of relations) {
              if (item[1] === id && that.id_group.indexOf(item[1]) !== -1 && that.id_group.indexOf(item[0]) !== -1) {
                plumbIns.connect({
                  source: item[0],
                  target: item[1]
                }, defaultConfig)
              }
            }
          }
        }
      })
    })
  },
  methods: {
    save () {
      for (let item of this.id_group) {
        let top = $('#' + item).css('top')
        let left = $('#' + item).css('left')
        this.position_data.push({id: item, top: top, left: left})
      }
      this.$router.push({name: 'Home', params: {data: this.position_data}})
      this.$emit('on_click')
    },
    clear () {
      this.$router.go(0)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrap
    width: 100%
    display: flex
    flex-direction: row
    overflow-y: hidden
    overflow-x: hidden
    .left
      width: 160px
      height: 470px
      display: flex
      flex-direction: column
      border: 1px solid #ccc
      .block
        width: 120px
        background-color: #caf1ff
        text-align: center
        margin: 2px
        .title
          padding: 10px
    .right
      width: 90%
      height: 470px
      .canvas
        width: 100%
        height: 90%
        border: 1px solid #ccc
        position: relative
        .block
          width: 120px
          background-color: #caf1ff
          text-align: center
        .title
          padding: 10px
      .step
        width: 100%
        height: 10%
        display: flex
        align-items: center
        justify-content: center
        .button
          margin: auto 50px
</style>
