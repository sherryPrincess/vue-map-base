<template>
  <div class="tableAction-wrap">
    <div class="tableAction-wrap-left">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @select="select"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableAction-wrap-right">
      <span @click="eventClick('insert')">新增</span>
      <span @click="eventClick('deletefun')">删除</span>
      <span @click="eventClick('shiftUp')">上移</span>
      <span @click="eventClick('shiftDown')">下移</span>
    </div>
  </div>
</template>
<style lang="scss">
  .tableAction-wrap{
    width: 100%;
    height: 100%;
    .tableAction-wrap-left{
      width: calc(100% - 80px);
      height: 100%;
      float: left;
    }
    .tableAction-wrap-right{
      width: 80px;
      height:100%;
      float: left;
      span{
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: block;
        cursor: pointer;
        text-align: center;
        &:hover{
          width: calc(100% - 2px);
          border: 78px;
          border: 1px #1b9de8 solid;
          text-align: center;
        }
      }
    }
  }
</style>
<script>
  import {commaSplit} from '../../service/https'
  export default{
    props: {},
    data () {
      return {
        tableData3: [
          {
            id: '1',
            date: '2016-05-03',
            name: '测试1',
            address: '测试1'
          },
          {
            id: '2',
            date: '2016-05-02',
            name: '测试2',
            address: '测试2'
          },
          {
            id: '3',
            date: '2016-05-04',
            name: '测试3',
            address: '测试3'
          },
          {
            id: '4',
            date: '2016-05-04',
            name: '测试4',
            address: '测试4'
          },
          {
            id: '5',
            date: '2016-05-04',
            name: '测试5',
            address: '测试5'
          },
          {
            id: '6',
            date: '2016-05-04',
            name: '测试6',
            address: '测试6'
          },
          {
            id: '7',
            date: '2016-05-04',
            name: '测试7',
            address: '测试7'
          },
          {
            id: '8',
            date: '2016-05-04',
            name: '测试8',
            address: '测试8'
          },
          {
            id: '9',
            date: '2016-05-04',
            name: '测试9',
            address: '测试9'
          }
        ],
        selectIds: '',
        handleSelectionChange () {
        }
      }
    },
    watch: {
      selectIds () {
      }
    },
    methods: {
      eventClick (alias) {
        switch (alias) {
          case 'insert':
            this.insert()
            break
          case 'deletefun':
            this.deletefun('id')
            break
          case 'shiftUp':
            this.shiftUp('id')
            break
          case 'shiftDown':
            this.shiftDown('id')
            break
        }
      },
      insert () {
        let obj = {
          id: '10',
          date: '2017.925',
          name: '测试',
          address: '北京市海淀区北五村路'
        }
        this.tableData3.push(obj)
      },
      select (rows) {
        if (rows) {
          this.selectIds = commaSplit(rows)
        }
      },
      deletefun (alias) {
        let ids = this.selectIds.split(',')
        let listData = this.tableData3
        let attr = alias != null ? alias : 'id'
        debugger
        for (let i = 0; i < listData.length; i++) {
          for (let j = 0; j < ids.length; j++) {
            if (listData[i][attr] === ids[j]) {
              listData.splice(i, 1)
            }
          }
        }
        this.tableData3 = listData
      },
      shiftUp (alias) {
        let listData = this.tableData3
        if (this.selectIds === listData[0][alias]) {
          return false
        } else {
          let ids = this.selectIds.split(',')
          let attr = alias != null ? alias : 'id'
          for (let i = 0; i < listData.length; i++) {
            for (let j = 0; j < ids.length; j++) {
              if (listData[i][attr] === ids[j]) {
                listData.splice(i - 1, 0, listData[i])
                listData.splice(i + 1, 1)
              }
            }
          }
          this.tableData3 = listData
        }
      },
      shiftDown (alias) {
        if (this.selectIds === this.tableData3[this.tableData3.length - 1]) {
          return false
        } else {
          let temp = null
          let ids = this.selectIds.split(',')
          let listData = this.tableData3
          let attr = alias != null ? alias : 'id'
          for (let i = 0; i < listData.length; i++) {
            for (let j = 0; j < ids.length; j++) {
              if (listData[i][attr] === ids[j]) {
                temp = listData[i]
                listData.splice(i, 1)
                listData.splice(i + 1, 0, temp)
              }
            }
          }
          this.tableData3 = listData
        }
      }
    },
    components: {}
  }
</script>
