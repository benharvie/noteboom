const express = require('express')
const mongodb = require('mongodb')
const body_parser = require('body-parser')
const api = require('./api')

const app = express()
app.use(express.json())
app.use(body_parser.urlencoded({ extended: false }))

const { MongoClient } = mongodb
MongoClient.connect('mongodb://localhost:27017').then((client) => {
  const db = client.db('noteboom')
  app.use(api(db))
})

module.exports = app
