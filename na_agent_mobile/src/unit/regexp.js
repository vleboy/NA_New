export const pattern = {
  positiveInteger: new RegExp(/^[0-9]*[1-9][0-9]*$/),  // 正整数
  url: new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/), // url验证
  digitalRange : new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/), // 数字范围验证 （0.00-100.00）
  positive : new RegExp(/^[0-9]+([.]{1}[0-9]{1,2})?$/), // 正数，保留两位小数点
  firstLetter: new RegExp(/^[a-zA-Z][a-zA-Z0-9]{7,15}$/), //必须包含字母,数字不含其它字符且长度大于8的正则表达式
  playerFirstLetter: new RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/), //必须包含字母,数字不含其它字符且长度大于6的正则表达式
  nickName : new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/) //中英文或者数字 2-10位
}

