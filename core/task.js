const https = require('https')
const config = require('../config')
const { scheduleCron, sendEmailFrom126, isExpired } = require('./utils')

const msgs = []

/**
 * @description cookie过期时先登录
 */
const login = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(config.login, async (res) => {
      msgs.push('<br>\n')
      msgs.push('开始尝试登录......<br>\n')
      const cookie = res.headers['set-cookie'].join(';')
      config.http.headers.Cookie = cookie

      res.setEncoding('utf8')
      let responseResult = ''
      res.on('data', (chunk) => {
        responseResult += chunk
      })
      res.on('end', () => {
        console.log('No more data in response.')
        msgs.push('登录成功<br>\n')
        msgs.push(`登录结果：${JSON.stringify(JSON.parse(responseResult))}<br>\n`)

        resolve(true)
      })
    })

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`)
      msgs.push(`登录失败:${e.message}<br>\n`)
      reject(false)
    })

    // 将数据写入请求正文
    req.write(config.formData);
    req.end()
  })

}

/**
 * @description 签到领流量任务
 */
const task = () => {
  const req = https.request(config.http, async (res) => {
    let isFirstTask = true
    msgs.push('\n<br>开始执行签到任务......<br>\n')

    if (isExpired(res)) {
      msgs.push('cookie已过期,重新登录中...<br>\n')
      const isLoginSucceed = await login()
      if (isLoginSucceed) {
        isFirstTask = false
        task()
      }
    }
    //重新执行任务之前取消先前的任务
    if (!isFirstTask) return
    let responseResult = ''

    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      responseResult += chunk
    })
    res.on('end', () => {
      responseResult = responseResult || '{}'
      console.log('No more data in response...')
      msgs.push(`签到结果：${JSON.stringify(JSON.parse(responseResult))} <br>\n`)
      sendEmailFrom126('自动签到领流量脚本', msgs.join(''))
    })
  })

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message} `)
    msgs.push(`problem with request: ${e.message} <br>\n`)
    sendEmailFrom126('自动签到领流量脚本', msgs.join(''))
  })

  // 将数据写入请求正文
  // req.write(postData);
  req.end()
}


module.exports = {
  task
}

//每日定时执行
// scheduleCron(task, { h: 8, m: 01, s: 55 })

