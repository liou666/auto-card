require('dotenv').config();
const { task } = require('./core/task');
const { scheduleCron } = require('./core/utils')

//每日定时执行
scheduleCron(task, { h: 8, m: 01, s: 55 })

