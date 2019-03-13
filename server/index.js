const path = require('path')
const express = require('express')
const db = require('./db')
const PORT = 8080
const app = express()
const morgan = require('morgan')

module.exports = app

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api'))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((req, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use((req, res, next) => {
  let err = new Error()
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

db.sync({force: true}).then(() => {
  console.log('db synced')
  app.listen(PORT, () => {
    console.log(`Time to study, buddy ${PORT}`)
  })
})
