const { EMAILPASSWORD, LOGINPASSWORD, EMAIL, USERID } = process.env

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
    },
  },
  formData: `email=${USERID}&passwd=${LOGINPASSWORD}&code=`,
  email: {
    126: {
      user: EMAIL,
      from: EMAIL,
      to: EMAIL,
      pass: EMAILPASSWORD,
    },
  },
}

module.exports = config
