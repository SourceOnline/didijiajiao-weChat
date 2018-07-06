//根据标签页获取不同弹窗列表
function getSelectValue(tp) {
  // id: '3',
  // name: '按钮1'
  // color: '#ff9900'
  // icon: 'search'
  var back = [];
  switch (tp) {
    case '0'://待处理订单
      back = [{
          id: 2,
          name: '服务已完成'
        },
        {
          id: 3,
          name: '撤销订单'
        },
        {
          id: 8,
          name: '返回'
        }
      ]
      break;
    case '1'://服务中订单
      back = [{
        id: 2,
        name: '服务已完成'
      },
      {
        id: 3,
        name: '撤销订单'
      },
      {
        id: 8,
        name: '返回'
      }
      ]
      break;
    case '2'://已完成订单
      break;
    case '3'://已撤销订单
      break;
    default:
      break;
  }
  return back;
}

module.exports = {
  getSelectValue: getSelectValue,
}