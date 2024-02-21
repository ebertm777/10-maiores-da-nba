const projectName = require('./package.json').name

const Defaults = {
  s3URL: `https://deoliyp60f2gq.cloudfront.net/${projectName}`,
}

module.exports = { Defaults }
