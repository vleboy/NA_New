<template>
  <div class="agent_click-list">
    <div class="-list-wrap" v-for="item of agentList">
      <div class="-list-item">
        <span class="-name" @click="agentDetail(item)">代理 {{item.displayName}}</span>
        <span class="-btn" @click="delAgent(item)"><img src="../assets/img/del.png"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'agent-click-list',
  data () {
    return {
    }
  },
  computed: {
    agentList () {
      return this.$store.state.storageAgentList
    }
  },
  methods: {
    agentDetail (item) {
      console.log(item)
      this.$store.commit({
        type: 'agentInfo_storageAgentItem',
        data: item
      })
      this.$emit('getNewAgentTop',item)
    },
    delAgent (item) {
      this.$store.commit({
        type: 'agentInfo_storageAgentList',
        data: item,
        state: 0
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .agent_click-list{
    background: #89d6f3;
    color: #fff;

    .-list-wrap{
      display: inline-block;
      height: 60px;
      width: 44%;
      padding: 0 20px;

      span{
        display: inline-block;
        line-height: 60px;
        font-size: 30px;
      }

      .-name {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .-btn{
        display: inline-block;
        text-align: center;
        line-height: 76px;
        width: 20%;

        img{
          width:50%;
        }
      }
      .-list-item{
        display: flex;
        justify-content: space-between;
        height: 60px;
      }
    }
  }
</style>
