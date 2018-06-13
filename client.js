require('dotenv').config()
const fs = require('fs')
const clientEnv = require('react-scripts/config/env.js')(process.env.REACT_APP_VCAP_SERVICES || 'not-found')
console.log("GOT CLIENT ENV: " + clientEnv)

const pathToWrite='./public'
const fileToWrite = `${pathToWrite}/client-env.js`
const globalVarName = '_env_'
const content = `window.${globalVarName} = ${JSON.stringify(clientEnv.raw)}`

try {
  fs.writeFileSync(fileToWrite, content, 'utf8')
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('Error while writing client-env file:', err.message)
  process.exit(1)
}

