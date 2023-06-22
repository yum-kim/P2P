//next.config.js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [`${process.env.NEXT_PUBLIC_IMG_URL}`]
  }
}