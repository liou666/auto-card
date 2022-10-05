const { EMAILPASSWORD, LOGINPASSWORD } = process.env;

/****** base config ****** */
const config = {
  http: {
    hostname: 'go.tofly.cyou',
    port: 443,
    path: '/user/checkin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: ``,
      // 'Content-Length': Buffer.byteLength(postData)
    },
  },
  login: {
    hostname: 'go.tofly.cyou',
    port: 443,
    path: '/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  },
  formData: `email=liou666%40126.com&passwd=${LOGINPASSWORD}&code=`,
  email: {
    126: {
      user: 'liou666@126.com',
      from: 'liou666@126.com',
      to: 'liou666@126.com',
      pass: EMAILPASSWORD,
    },
  },
}

module.exports = config
