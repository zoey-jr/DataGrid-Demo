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
            <el-button type="text" style="padding-right:10px;" @click="changeCard">切换</el-button>
            <i class="iconfont icon-zhankai1" style="font-size: 18px;"></i>
          </span>
        </div>
        <el-row style="margin-bottom: 15px;">
          <el-button type="primary" @click="clickAddBtn" size="mini" v-if="this.changeCardVal">新增</el-button>
          <!-- <el-button type="">取消</el-button> -->
          <el-button type="success" size="mini" v-if="this.changeCardVal">保存</el-button>
          <el-button type="danger" size="mini" v-if="this.changeCardVal">批量删除</el-button>
          <div style="float: right;">
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
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
        <el-table :data="tableData" height="100%" stripe
                  highlight-current-row
                  :row-class-name="rowClassName"
                  :cell-class-name="setCellClass"
                  :cell-style="setCellStyle"
                  @cell-click="cellClick"
                  size="mini"
                  style="border: 1px solid #f0f2f5; border-radius: 5px;"
                  v-if="this.changeCardVal">
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
                         active-color="#13ce66" 
                         inactive-color="#ff4949" 
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

        <div class="cardShow" v-if="!this.changeCardVal">
          <el-card 
          class="box-card cus-card" style="width:290px;float:left;"
          v-for="items in tableData" :key="items.id"
          >
            <div slot="header" class="clearfix">
              <span>{{items.companyName}}</span>
            </div>
            <div class="text item" >
              <p>公司代码：{{items.companyCode}}</p>
              <p>公司英文名：{{items.companyEnName}}</p>
              <p>成立日期：{{items.createdDate}}</p>
              <p>是否上市：{{items.isToMarket}}</p>
              <p>上市日期：{{items.marketDate}}</p>
              <p>注册资金：{{items.registerCaptial}}</p>
              <p>所在城市：{{items.city}}</p>
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
          style="margin-top: 10px;clear:both;">
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
                     active-color="#13ce66" 
                     inactive-color="#ff4949" 
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
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="confirmForm" type="primary">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ServiceData, JsonData } from '@/utils/tabledata.ts';
// import { provinceAndCityData，CodeToText} from 'element-china-area-data'

@Component({
  name: 'dataTable'
})
export default class Home extends Vue {
  private searchForm = {
    companyName: '',
    isToMarket: '',
    city: ''
  };
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
  inputChange() {
    console.log('99999');
  }
  setCellStyle({row, column, rowIndex, columnIndex}: any) {
    if (row.updatedProp) {
      const updCell = (row.updatedProp as string[]).filter(item => item === column.property);
      if (updCell.length) {
        row.updated = true;
        return 'background: rgba(50, 134, 230, 0.452);';
      } else {
        // console.log('还原了');
        return 'background: none;'
      }
    }
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
      (this.$refs.elInput as HTMLElement).focus();
    });
  }
  rowClassName({ row, rowIndex }: any) {
    row.index = rowIndex;
  }
  setCellClass({row, column, rowIndex, columnIndex}: any) {
    if (!row.id) {
      return 'isCreated';
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
      // this.editRow.companyCode = this.formData.companyCode;
      // this.editRow.companyName = this.formData.companyName;
      // this.editRow.companyEnName = this.formData.companyEnName;
      // this.editRow.createdDate = this.formData.createdDate;
      // this.editRow.isToMarket = this.formData.isToMarket;
      // this.editRow.marketDate = this.formData.marketDate;
      // this.editRow.registerCaptial = this.formData.registerCaptial;
      // this.editRow.city = this.formData.city;
    } else {
      this.tableData.unshift({
        ...this.formData,
        created: true
      });
    }
    this.dialogVisible = false;
  }
  clickDeleteBtn(row: any, index: number) {
    console.log(index);
    this.tableData.splice(index, 1);
  }
  clickEditBtn(row: any) {
    this.dialogVisible = true;
    // 保存修改前行数据
    this.editRow = row;
    this.formData = {...row};
  }
  getTableData() {
    this.allCompanyData = JSON.parse(JSON.stringify(ServiceData));
    this.getList();
  }
  getList() {
    this.tableData = this.allCompanyData.filter((item, index) => index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1));
    this.totalSize = this.allCompanyData.length;
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
  .isCreated {
    background: rgb(186, 241, 239);
  }
  .isUpdated {
    background: none;
  }
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
    margin-right: 20px;
    margin-bottom: 10px;
    font-size: 14px;
    .el-card__header{
      padding:9px 10px;
    }
    .el-card__body{
      padding:9px 10px;
      line-height:16px;
    }
  } 
}

</style>
