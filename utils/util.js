function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// star 处理
function calcStars(star)
{
    star /= 10;
    let arr = [];
    for (let i = 0; i < 5; i++)
    {
        if (parseInt(star) != star && i == parseInt(star)) {
            arr.push(0.5);
            continue;
        }
        i <= star - 1 ? arr.push(1) : arr.push(0);
    }
    return arr;
}
// http 请求
function http(url, callBack)
{
    wx.request
    ({
        url: url,
        header:
        {
            'content-type': 'json' //小程序里默认的 JSON 方式无法请求，此方案解决。
        },
        success: function(res)
        {
            if (callBack) callBack(res.data);
        }
    })
}

// 开放接口
export {
    formatTime,
    calcStars,
    http
};
