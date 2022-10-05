
const nodemailer = require('nodemailer')

const config = require('../config')

/**
 * @description send email from 126
 * @param {string} subject 
 * @param {sting} html 
 * @returns 
 */
const sendEmailFrom126 = async (subject, html) => {
  let cfg = config.email['126']
  if (!cfg || !cfg.user || !cfg.pass) return``
  const transporter = nodemailer.createTransport({
    service: '126',
    port: 465,
    secure: true,
    auth: { user: cfg.user, pass: cfg.pass },
  })
  transporter.sendMail(
    {
      from: cfg.from,
      to: cfg.to,
      subject: subject,
      html: html,
    },
    (err, info) => {
      if (err) return console.log(`发送邮件失败：${err}`, true)
      console.log('发送邮件成功', info)
    }
  )
}

/**
 * 定时执行任务
 * @param {Function} task 
 * @param {object} param1 
 */
const scheduleCron = (task, { h = 8, m = 00, s = 00 }) => {
  setInterval(function () {
    const refreshHours = new Date().getHours()
    const refreshMin = new Date().getMinutes()
    const refreshSec = new Date().getSeconds()
    if (refreshHours === h && refreshMin === m && refreshSec === s) {
      task()
    }
  }, 1000)
}

const isExpired = (res) => {
  return +res.headers['content-length'] > 0 ? false : true
}

module.exports = {
  isExpired,
  scheduleCron,
  sendEmailFrom126
}
