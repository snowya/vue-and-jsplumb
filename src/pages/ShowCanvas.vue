<template lang="pug">
div.wrap
  div.container
     .block(v-for="(item,index) in data" class="node" :id="index + 1" :key="index + 1"  :style="{position:'absolute', top:item.top, left:item.left}")
         p.title {{ item.title }}

</template>

<script>
import {jsPlumb} from 'jsplumb'

export default {
  data () {
    return {
      dataList: [
        {
          id: 1,
          left: '65px',
          top: '291px',
          title: 'item-1'
        },
        {
          id: 2,
          left: '285px',
          top: '291px',
          title: 'item-2'
        },
        {
          id: 3,
          left: '505px',
          top: '291px',
          title: 'item-3'
        },
        {
          id: 4,
          left: '725px',
          top: '291px',
          title: 'item-4'
        },
        {
          id: 5,
          left: '940px',
          top: '291px',
          title: 'item-5'
        },
        {
          id: 6,
          left: '725px',
          top: '157px',
          title: 'item-6'
        },
        {
          id: 7,
          left: '940px',
          top: '156px',
          title: 'item-7'
        },
        {
          id: 8,
          left: '940px',
          top: '21px',
          title: 'item-8'
        },
        {
          id: 9,
          left: '725px',
          top: '21px',
          title: 'item-9'
        },
        {
          id: 10,
          left: '505px',
          top: '21px',
          title: 'item-10'
        },
        {
          id: 11,
          left: '285px',
          top: '21px',
          title: 'item-11'
        },
        {
          id: 12,
          left: '65px',
          top: '21px',
          title: 'item-12'
        }
      ],
      data: []
    }
  },
  created () {
    if (this.$route.params.data) {
      for (let item of this.$route.params.data) {
        this.data.push({
          id: item.id,
          top: item.top,
          left: item.left,
          title: this.dataList[item.id - 1].title
        })
      }
    } else this.data = this.dataList
  },
  mounted () {
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

    plumbIns.ready(() => {
      for (let item of relations) {
        plumbIns.connect({source: item[0], target: item[1]}, defaultConfig)
      }
    })
  }
}
</script>

<style lang="sass" scoped>
  .wrap
    margin-left: 5%
    width: 90%
    .container
      background-color: #fff
      height: 470px
      position: relative
      .block
        width: 120px
        background-color: #caf1ff
        text-align: center
        .title
          padding: 10px
</style>
