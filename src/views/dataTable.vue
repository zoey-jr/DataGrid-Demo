<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公司信息维护</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <el-card>
        <div slot="header">
          <span><i class="iconfont icon-biaoge"></i> 记录集</span>
          <span style="float: right;">
            <el-button type="text" style="padding:0 10px 0 0;" @click="changeCard">
              <i class="iconfont" :class="changeCardVal ? 'icon-cardview' : 'icon-custom-form'"></i>
            </el-button>
            <i :class="[openQueryBar?'iconfont icon-zhankai1':'iconfont icon-zhankai2']" style="font-size: 18px;" @click="toggleHeader()"></i>
          </span>
        </div>
        <el-row class="clear" style="margin-bottom: 15px;" v-if="openQueryBar">
          <div style="float: left;">
            <el-form :model="searchForm" label-width="70px" inline size="mini" class="searchForm">
              <el-form-item label="公司名称" prop="companyName" style="margin: 0 10px;">
                <el-input v-model="searchForm.companyName" @change="inputChange"></el-input>
              </el-form-item>
              <el-form-item label="成立日期" prop="createdDate" style="margin: 0 10px;">
                <el-date-picker
                  v-model="searchForm.createdDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="所在城市" prop="city" style="margin: 0 10px;">
                <el-input v-model="searchForm.city"></el-input>
              </el-form-item>
              <el-form-item style="margin: 0 10px;">
                <el-button type="primary" @click="queryData">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="float:right">
            <el-button type="primary" @click="clickAddBtn" size="mini" v-if="changeCardVal">新增</el-button>
            <!-- <el-button type="">取消</el-button> -->
            <el-button type="primary" size="mini" v-if="changeCardVal"  @click="clickSaveBtn">保存</el-button>
            <el-button type="primary" size="mini" v-if="changeCardVal"  @click="batchDelete">批量删除</el-button>
          </div>
        </el-row>
        <el-table :data="tableData" height="100%" stripe
                  highlight-current-row
                  :row-class-name="setRowClassName"
                  :cell-class-name="setCellClass"
                  :cell-style="setCellStyle"
                  @cell-click="cellClick"
                  @selection-change="selectionChange"
                  size="mini"
                  style="border: 1px solid #f0f2f5; border-radius: 5px;"
                  v-if="changeCardVal&&openQueryBar"
                  ref="table">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="公司代码" prop="companyCode" :filters="codeFilter" :filter-method="filterHandler">
            <template slot-scope="{ row }">
              <el-input
                v-if="row.index === cellIndex && cellProp === 'companyCode'"
                v-model="row.companyCode"
                size="mini"
                ref="elInput"
                autofocus
                @blur="inputBlur"
                @change="cellValueChange(row.companyCode, 'companyCode', row)">
              </el-input>
              <span v-else>{{row.companyCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="公司名称" prop="companyName" :filters="nameFilter" :filter-method="filterHandler">
             <template slot-scope="{ row }">
              <el-input
                v-if="row.index === cellIndex && cellProp === 'companyName'"
                v-model="row.companyName"
                size="mini"
                @blur="inputBlur"
                ref="elInput"
                autofocus
                @change="cellValueChange(row.companyName, 'companyName', row)">
              </el-input>
              <span v-else>{{row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="公司英文名" prop="companyEnName">
             <template slot-scope="{ row }">
              <el-input
                v-if="row.index === cellIndex && cellProp === 'companyEnName'"
                v-model="row.companyEnName"
                size="mini"
                @blur="inputBlur"
                ref="elInput"
                autofocus
                @change="cellValueChange(row.companyEnName, 'companyEnName', row)">
              </el-input>
              <span v-else>{{row.companyEnName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="成立日期" prop="createdDate" sortable>
            <template slot-scope="{ row }">
              <el-date-picker
                v-if="row.index === cellIndex && cellProp === 'createdDate'"
                v-model="row.createdDate"
                value-format="yyyyMMdd"
                type="date"
                placeholder="选择日期"
                size="mini"
                style="width: 200px;"
                @blur="inputBlur"
                ref="elInput"
                autofocus
                @change="cellValueChange(row.createdDate, 'createdDate', row)">
              </el-date-picker>
              <span v-else>{{row.createdDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否上市" prop="isToMarket">
            <template slot-scope="{row}">
              <el-switch v-model="row.isToMarket" 
                         active-color="#409eff" 
                         inactive-color="#e5effe" 
                         active-value="1" 
                         inactive-value="0"
                         ref="elInput">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="上市日期" prop="marketDate" sortable :filters="marketDateFilter" :filter-method="filterHandler">
            <template slot-scope="{ row }">
              <el-date-picker
                v-if="row.index === cellIndex && cellProp === 'marketDate'"
                v-model="row.marketDate"
                value-format="yyyyMMdd"
                type="date"
                placeholder="选择日期"
                size="mini"
                style="width: 200px;"
                @blur="inputBlur"
                ref="elInput"
                autofocus
                @change="cellValueChange(row.marketDate, 'marketDate', row)">
              </el-date-picker>
              <span v-else>{{row.marketDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册资金" prop="registerCaptial" sortable :filters="captialFilter" :filter-method="filterHandler">
            <template slot-scope="{ row }">
              <el-input
                v-if="row.index === cellIndex && cellProp === 'registerCaptial'"
                v-model="row.registerCaptial"
                size="mini"
                @blur="inputBlur"
                ref="elInput"
                autofocus
                @change="cellValueChange(row.registerCaptial, 'registerCaptial', row)">
              </el-input>
              <span v-else>{{row.registerCaptial}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所在城市" prop="city" :filters="cityFilter" :filter-method="filterHandler">
            <template slot-scope="{ row }">
              <el-input
                v-if="row.index === cellIndex && cellProp === 'city'"
                v-model="row.city"
                size="mini"
                @blur="inputBlur"
                ref="elInput"
                autofocus
                @change="cellValueChange(row.city, 'city', row)">
              </el-input>
              <span v-else>{{row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120">
            <template slot-scope="{row, $index}">
              <el-button type="primary" plain round size="mini" style="padding: 3px 13px;" @click="clickEditBtn(row)">
                <i class="iconfont icon-bianji"></i>
              </el-button>
              <el-button type="danger" plain round size="mini" style="padding: 3px 13px;" @click="clickDeleteBtn(row, $index)">
                <i class="iconfont icon-shanchu2"></i>
              </el-button>
              </template>
          </el-table-column>
        </el-table>
        <div class="cardShow" v-if="(!changeCardVal) && openQueryBar">
          <el-card 
          class="box-card cus-card" style="width:290px;float:left;"
          v-for="items in tableData" :key="items.id" shadow="hover"
          >
            <div slot="header" class="clearfix">
              <span>{{items.companyName}}</span>
              <span style="float:right;color:#000">{{items.isToMarket==='1'?'已上市':'未上市'}}</span>
            </div>
            <div class="text item clear" >
              <div class="companyDetail">
                <p>公司代码：{{items.companyCode}}</p>
                <p>公司英文名：{{items.companyEnName}}</p>
                <p>成立日期：{{items.createdDate}}</p>
                <p v-show="items.isToMarket==='1'">上市日期：{{items.marketDate}}</p>
                <p>注册资金：{{items.registerCaptial}}</p>
                <p>所在城市：{{items.city}}</p>
              </div>
              <div class="companyLogo">
                <img src="@/assets/baologo.png" alt="">
              </div>
            </div>
          </el-card>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize"
          style="margin-top: 10px;clear:both;"
          v-if="openQueryBar">
        </el-pagination>
      </el-card>
    </el-main>
    <el-dialog :visible.sync="dialogVisible" :title="formData.id ? '编辑公司信息' : '新增公司信息'">
      <el-form :model="formData" label-width="100px" inline>
        <el-form-item label="公司代码" prop="companyCode">
          <el-input v-model="formData.companyCode" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="formData.companyName" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="公司英文名" prop="companyEnName">
          <el-input v-model="formData.companyEnName" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="成立日期" prop="createdDate">
          <el-date-picker
            v-model="formData.createdDate"
            value-format="yyyyMMdd"
            type="date"
            placeholder="选择日期"
            style="width: 200px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否上市" prop="isToMarket">
          <el-switch v-model="formData.isToMarket" 
                     active-color="#409eff" 
                     inactive-color="#e5effe" 
                     active-value="1" 
                     inactive-value="0"
                     style="width: 200px;">
          </el-switch>
        </el-form-item>
        <el-form-item label="上市日期" prop="marketDate">
          <el-date-picker
            v-model="formData.marketDate"
            value-format="yyyyMMdd"
            type="date"
            placeholder="选择日期"
            style="width: 200px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="注册资金" prop="registerCaptial">
          <el-input v-model="formData.registerCaptial" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input v-model="formData.city" style="width: 200px;"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button @click="dialogVisible = false" type="primary">取消</el-button>
          <el-button @click="confirmForm" type="primary">确定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <div class="theme">
      <div class="theme-Config" :style="{backgroundColor: $store.state.baseColor}" @click="drawer = true">
        <i class="iconfont icon-shezhi"></i>
      </div>
      <el-drawer
      title="主题配置"
      :visible.sync="drawer"
      :with-header="false"
      size="300px">
        <span>主题色</span>
      </el-drawer>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ServiceData, JsonData } from '@/utils/tabledata.ts';
import { ElTable } from 'element-ui/types/table';
import $ from 'jquery';
// import { provinceAndCityData，CodeToText} from 'element-china-area-data'

@Component({
  name: 'dataTable'
})
export default class Home extends Vue {
  private destroyData: JsonData[] = [];
  private selectedTableRow: JsonData[] = [];
  private searchForm = {
    companyName: '',
    createdDate: '',
    city: ''
  };
  //查询后的数据
  private allSearchData: JsonData[] = [];
  private cellUpdated = {
    label: '',
    value: ''
  };
  private cellIsUpdated = false;
  private cellIndex = 0;
  private cellProp = '';
  private editRow!: JsonData;
  private formData = {
    id: 0,
    companyCode: '',
    companyName: '',
    companyEnName: '',
    createdDate: '',
    isToMarket: '',
    marketDate: '',
    registerCaptial: '',
    city: ''
  };
  private dialogVisible = false;
  private allCompanyData: JsonData[] = [];
  private tableData: JsonData[] = [];
  private pageSize = 10;
  private currentPage = 1;
  private totalSize = 0;
  // card切换
  private changeCardVal = true;
  // 打开查询header
  private openQueryBar = true;
  // 打开主题配置
  private drawer = false;
  get codeFilter() {
    const codeArr: string[] = [];
    const filterDate: {text: string; value: string}[] = [];
    this.tableData.forEach(item => {
      codeArr.push(item.companyCode);
    });
    [...new Set(codeArr)].forEach(item => {
      filterDate.push({
        text: item,
        value: item
      });
    });
    return filterDate;
  }
  get nameFilter() {
    const nameArr: string[] = [];
    const filterDate: {text: string; value: string}[] = [];
    this.tableData.forEach(item => {
      nameArr.push(item.companyName);
    });
    [...new Set(nameArr)].forEach(item => {
      filterDate.push({
        text: item,
        value: item
      });
    });
    return filterDate;
  }
  get marketDateFilter() {
    const marketDateArr: string[] = [];
    const filterDate: {text: string; value: string}[] = [];
    this.tableData.forEach(item => {
      marketDateArr.push(item.marketDate);
    });
    [...new Set(marketDateArr)].forEach(item => {
      filterDate.push({
        text: item,
        value: item
      });
    });
    return filterDate;
  }
  get captialFilter() {
    const captialArr: string[] = [];
    const filterDate: {text: string; value: string}[] = [];
    this.tableData.forEach(item => {
      captialArr.push(item.registerCaptial);
    });
    [...new Set(captialArr)].forEach(item => {
      filterDate.push({
        text: item,
        value: item
      });
    });
    return filterDate;
  }
  get cityFilter() {
    const cityArr: string[] = [];
    const filterDate: {text: string; value: string}[] = [];
    this.tableData.forEach(item => {
      cityArr.push(item.city);
    });
    [...new Set(cityArr)].forEach(city => {
      filterDate.push({
        text: city,
        value: city
      });
    });
    return filterDate;
  }
  mounted () {
    this.getTableData();
  }
  clickSaveBtn() {
    console.log('save', this.tableData);
    console.log('destroyData', this.destroyData);
    
    setTimeout(() => {
      this.destroyData = [];
    }, 100);
    this.allCompanyData.forEach(val => {
      if(!val.id){
        val.id = new Date().getTime();
        console.log('id',val);
    }
    })
    $(".isCreated").removeClass("isCreated");
    $(".isUpdated").removeClass("isUpdated");
    this.getList();
  }
  inputChange() {
    console.log('99999');
  }
  setCellStyle({row, column, rowIndex, columnIndex}: any) {
    // if (row.updatedProp) {
    //   const updCell = (row.updatedProp as string[]).filter(item => item === column.property);
    //   if (updCell.length) {
    //     row.updated = true;
    //     return 'border: 1px dashed #4484ee; border-radius: 5px;';
    //   } else {
    //     return 'background: none;'
    //   }
    // }
  }
  cellValueChange(value: string, prop: string, row: any) {
    // this.cellIsChange = true;
    // console.log(value, prop);
    this.cellUpdated.label = prop;
    this.cellUpdated.value = value;
    // console.log(ServiceData);
    const preRow = ServiceData.filter(item => item.id === row.id)[0];
    console.log('preRow', preRow);
    if (preRow[prop] !== value) {
      row.updated = true;
      row.updatedProp.push(prop);
    } else {
      const index = (row.updatedProp as string[]).findIndex(item => item === prop);
      if (index >= 0) {
        row.updatedProp.splice(index, 1);
      }
    }
    console.log('row', row);
  }
  inputBlur() {
    this.cellIndex = 0;
    this.cellProp = '';
  }
  cellClick(row: any, column: any) {
    this.cellIndex = row.index;
    this.cellProp = column.property;
    this.$nextTick(() => {
      if (this.$refs.elInput) {
        (this.$refs.elInput as HTMLElement).focus();
      }
    });
  }
  setRowClassName({ row, rowIndex }: any) {
    row.index = rowIndex;
    if (!row.id) {
      return 'isCreated';
    }
  }
  setCellClass({row, column, rowIndex, columnIndex}: any) {
    // if (!row.id) {
    //   return 'isCreated';
    // }
    if (row.updatedProp) {
      const updCell = (row.updatedProp as string[]).filter(item => item === column.property);
      if (updCell.length) {
        row.updated = true;
        return 'isUpdated';
      } else {
        return ''
      }
    }
  }
  clickAddBtn() {
    this.dialogVisible = true;
  }
  confirmForm() {
    // this.editRow = this.formData;
    if (this.formData.id) {
      console.log('修改前行数据', this.editRow);
      console.log('表单数据',  this.formData);
      const preRow = ServiceData.filter(item => item.id === this.formData.id)[0];
      for (const i in preRow)  {
        for (const j in this.formData) {
          if (i === j) {
            // ts-ignore
            if (preRow[i] !== this.formData[j]) {
              (this.editRow.updatedProp as string[]).push(i);
              this.editRow[i] = this.formData[j];
            } else {
              const index = (this.editRow.updatedProp as string[]).findIndex(item => item === i);
              if (index >= 0) {
                (this.editRow.updatedProp as string[]).splice(index, 1);
              }
              this.editRow[i] = this.formData[j];
            }
          }
        }
      }
      console.log('修改后后行数据', this.editRow);
    } else {
      this.allCompanyData.unshift({
        ...this.formData,
        created: true
      });
      this.getList();
    }
    this.dialogVisible = false;
  }
  selectionChange(selection: JsonData[]) {
    console.log('selection', selection);
    this.selectedTableRow = selection;
  }
  batchDelete() {
    this.allCompanyData.forEach((item, index) => {
      this.selectedTableRow.forEach(selectItem => {
        if (selectItem.id === item.id || selectItem.companyCode === item.companyCode) {
          this.allCompanyData.splice(index, 1);
          this.destroyData.push(item);
        }
      });
      // const condition = this.selectedTableRow.filter(selectItem => selectItem.id === item.id || selectItem.companyCode === item.companyCode);
      // if (condition.length) {
      //   item.destory = true;
      // }
    });
    this.getList();
    // this.tableData = this.tableData.filter((item, index) => index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1));
    // this.totalSize = this.tableData.length;
    console.log(this.tableData);
    console.log(this.allCompanyData);
  }
  clickDeleteBtn(row: any) {
    // console.log(index);
    // this.tableData.splice(index, 1);
    this.destroyData.push(row);
    const ind = this.allCompanyData.findIndex(item => item.companyCode === row.companyCode);
    this.allCompanyData.splice(ind, 1);
    this.getList();
    // row.destory = true;
  }
  clickEditBtn(row: any) {
    this.dialogVisible = true;
    // 保存修改前行数据
    this.editRow = row;
    this.formData = {...row};
  }
  getTableData() {
    this.allCompanyData = JSON.parse(JSON.stringify(ServiceData));
    // this.getList();
    this.queryData();
  }
  getList() {
    this.tableData = this.allSearchData.filter((item, index) => index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1));
    this.totalSize = this.allSearchData.length;
  }
  filterHandler(value: string, row: any, column: any) {
    const property = column['property'];
    return row[property] === value;
  }
  handleSizeChange(val: number) {
    this.pageSize = val;
    this.getList()
  }
  handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getList();
  }
  changeCard(){
    this.changeCardVal = !this.changeCardVal
  }
  toggleHeader(){
    this.openQueryBar = !this.openQueryBar;
  }
  queryData(){
    const {companyName, createdDate, city} = this.searchForm;
    const data: JsonData[] = [];
    const time = createdDate.split('-').join('');
    this.allCompanyData.forEach(item => {
      if(item.companyName.indexOf(companyName) !== -1 && item.createdDate.indexOf(time) !== -1 && item.city.indexOf(city) !== -1){
        data.push(item);
      }
    })
    this.allSearchData = data;
    this.getList();
  }
}
</script>
<style lang="scss">
.el-container {
  height: 100vh;
  background: $gary-bg;
  .el-header {
    height: 40px !important;
    line-height: 40px;
    background: $primary;
  }
  .el-breadcrumb {
    line-height: 40px !important;
    .el-breadcrumb__inner {
      color: #fff !important;
    }
  }
  .el-main {
    height: calc(100vh - 40px);
    overflow: auto;
  }
  .el-card__body {
    // height: calc(100% - 80px);
  }
  .el-icon-arrow-down:before {
    // content: '\e621';
  }
  .isCreated>td{
    border: 1px dashed #4484ee;
    border-left: 0;
    border-radius: 5px;
  }
  .el-table__row.isCreated>td:nth-child(1) {
    border-left: 1px dashed #4484ee !important;
  }
  
  .isUpdated {
    border: 1px dashed #4484ee; 
    border-radius: 5px;
  }
  // .row-destory {
  //   display: none;
  // }
  .el-card__header {
    // height: 50px;
    // line-height: 50px;
    // padding: 0 20px;
  }
  .searchForm {
    .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
      // line-height: 50px;
    }
  }
}
.cardShow{
  .cus-card{
    margin:0 12px;
    margin-bottom: 10px;
    font-size: 14px;
    &:hover{
      transform: translateY(-5px);
    }
    .el-card__header{
      height: 35px;
      box-sizing: border-box;
      padding:9px 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #fff;
      padding-left: 20px;
      background-image: linear-gradient(to right, #59a0f8, #bcdafb);
    }
    .el-card__body{
      padding:9px 15px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height:20px;
      background:rgb(250, 250, 250);
      &:hover{
        background: #fff;
      }
      .companyDetail{
        float: left;
      }
      .companyLogo{
        float: right;
        width:30%;
        img{
          width: 80%;
          margin:30px 0;
        }
      }
    }
  } 
}
.theme-Config{
  background: #409EFF;
  width: 36px;
  height: 36px;
  font-size: 12px !important;
  color: white;
  position: fixed;
  right: 0;
  top:50%;
  transform: translateY(-50%);
  text-align: center;
  border-radius: 5px 0 0 5px;
  i{
    display: inline-block;
    margin: auto;
    line-height: 36px;
  }
}

</style>
