const path = require('path')
const express = require('express')
const db = require('./db')
const PORT = 8080
const app = express()
module.exports = app

app.use(express.static(path.join(__dirname, '../public')))
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

app.use(err => {
  console.error(error)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

db.sync().then(() => {
  console.log('db synced')
  app.listen(PORT, () => {
    console.log(`Time to study, buddy ${PORT}`)
  })
})
