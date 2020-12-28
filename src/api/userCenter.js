import request from '@/utils/request'

//获取客户列表
export function findListCountByCondition(data) {
  return request({
    url: '/finance-tool/customer/findListCountByCondition',
    method: 'post',
    data
  })
}
//获取客户查询客户下付款人
export function findPayeeListByCustomerId(functionId) {
  return request({
    url: `/finance-tool/customer/findPayeeListByCustomerId/${functionId}`,
    method: 'get',
  })
}
//导出客户信息
export function exportExcel(data) {
  return request({
    url: `/finance-tool/customer/exportExcel`,
    method: 'post',
    data,
    responseType: "arraybuffer",
  })
}
//导入客户信息 
export function importExcel(data) {
  return request({
    url: `/finance-tool/customer/importExcel`,
    method: 'post',
  })
}
//删除客户/finance-tool/customer/delCustomerById/{id}
export function delCustomerById(id) {
  return request({
    url: `/finance-tool/customer/delCustomerById/${id}`,
    method: 'get',
  })
}
//添加收款人
export function addPayeea(data) {
  return request({
    url: `/finance-tool/customer/addPayee`,
    method: 'Post',
    data
  })
}
//编辑付款人
export function updaPayeea(data) {
  return request({
    url: `/finance-tool/customer/updPayee`,
    method: 'Post',
    data
  })
}
//删除付款人
export function delPayeeById(id) {
  return request({
    url: `/finance-tool/customer/delPayeeById/${id}`,
    method: 'get',
  })
}
// 发票明细111111111111111111111

//查询发票明细data
export function findListAntSummeryByCondition(data) {
  return request({
    url: `/finance-tool/invoice/findListAntSummeryByCondition`,
    method: 'post',
    data
  })
}
//发票删除
export function delInvoiceById(invoiceId) {
  return request({
    url: `/finance-tool/invoice/delInvoiceById/${invoiceId}`,
    method: 'get',
  })
}
//导出发票信息
export function exportExcelfa(data) {
  return request({
    url: `/finance-tool/invoice/exportExcel`,
    method: 'post',
    data,
    responseType: "arraybuffer",
  })
}


//修改合伙人
export function iUpdatePartner(data) {
  return request({
    url: `/finance-tool/invoice/updatePartner`,
    method: 'post',
    data,
  })
}
//收款明细！！！！！！！！！！！！！！！！！！！！！！！


// 查询收款列表
export function MfindListAntSummeryByCondition(data) {
  return request({
    url: `/finance-tool/makeAmount/findListAntSummeryByCondition`,
    method: 'post',
    data,
  })
}
//查询首款下付款记录
export function findPayListByMakeAmountId(id) {
  return request({
    url: `/finance-tool/makeAmount/findPayListByMakeAmountId/${id}`,
    method: 'get',
  })
}
//删除收款
export function delMakeAmountById(id) {
  return request({
    url: `/finance-tool/makeAmount/delMakeAmountById/${id}`,
    method: 'get',
  })
}
//删除付款
export function delMakeAmountDetailById(id) {
  return request({
    url: `/finance-tool/makeAmount/delMakeAmountDetailById/${id}`,
    method: 'get',
  })
}
//导出收款信息
export function MexportExcel(data) {
  return request({
    url: `/finance-tool/makeAmount/exportExcel`,
    method: 'post',
    data,
    responseType: "arraybuffer",
  })
}
// 发票核销明细~~~~~~~~~~~~~~~~~~~~~~~~~~

//列表
export function findInvoiceWriteOffPage(data) {
  return request({
    url: `/finance-tool/invoice/findInvoiceWriteOffPage`,
    method: 'post',
    data,
  })
}
//跟新数据
export function doUpdate() {
  return request({
    url: `/finance-tool/invoice/doUpdate`,
    method: 'get',
  })
}

//修改备注
export function updWriteOffRemark(data) {
  return request({
    url: `/finance-tool/invoice/updWriteOffRemark`,
    method: 'post',
    data
  })
}
// 导出发票核销信息
export function exportWriteOffExcel(data) {
  return request({
    url: `/finance-tool/invoice/exportWriteOffExcel`,
    method: 'post',
    data,
    responseType: "arraybuffer",
  })
}
//修改合伙人
export function updatePartner(data) {
  return request({
    url: `/finance-tool/makeAmount/updatePartner`,
    method: 'post',
    data,
  })
}

//模板下载~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1，导入客户模板下载
export function customertemplate() {
  return request({
    url: `/finance-tool/customer/template`,
    method: 'get',
    responseType: "arraybuffer",

  })
}
//发票明细模板 
export function invoicetemplate() {
  return request({
    url: `/finance-tool/invoice/template`,
    method: 'get',
    responseType: "arraybuffer",

  })
}

//收款明细模板 
export function makeAmounttemplate() {
  return request({
    url: `/finance-tool/makeAmount/template`,
    method: 'get',
    responseType: "arraybuffer",

  })
}
// 导入付款的模板
export function payeeTemplate() {
  return request({
    url: `/finance-tool/makeAmount/payeeTemplate`,
    method: 'get',
    responseType: "arraybuffer",

  })
}

//查询数据是否更新
export function findUpdateStatus() {
  return request({
    url: `/finance-tool/invoice/findUpdateStatus`,
    method: 'get',
  })
}

//源数据管理
export function findQueryList(params) {
  return request({
    url: `/source/page/${params.page}/${params.lim}`,
    method: 'get',
  })
}
//删除数据
export function deleteList(data) {
  return request({
    url: `/delete`,
    method: 'post',
    data
  })
}
//获取导入的记录
export function recordList(params) {
  return request({
    url: `/source/batch/${params.page}/${params.lim}`,
    method: 'get',
  })
}