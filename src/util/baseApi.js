import axios from 'axios'
// post 新增  get 拉取  put  delete 删除 patch 更新
// 添加有ajax请求就显示模态框

function request(url, method, data) {
  // var json=JSON.stringify(data)
  return new Promise((resolve, reject)=>{
    axios({
      headers: {
        'Content-Type': 'application/json',
        'openId': 'ocz_9s85KT-EWnDBUKXBe3AisXw0_demin'
      },
      method: method,
      url: url,
      data: data
    })
      .then(res => {
        if(res.status === 200) {
          // if(res.data.code == 401 || res.data.code == 402 || sessionId == null) {
          //   localStorage.clear()
          //   // if(window.location.href.indexOf('login') !== -1) return;
          //   // window.location.href = `/spms/static/home/index.html#/login?next=${window.location.href}`
          //   window.location.href = `/spms/static/home/index.html#/login?next=${encodeURIComponent(window.location.href)}`
          // }
          resolve(res.data)
        }
      })
      .catch((res) => {
        reject(res)
      });
  })
}

// post 新增  get 拉取  put  delete 删除 patch 更新

export const getFn = (url, data = true) => request(url, 'get', data)
export const postFn = (url, data = true) => request(url, 'post', data)
