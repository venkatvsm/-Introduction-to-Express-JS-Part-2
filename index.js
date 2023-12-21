const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const app = express()

let db = null

const dbpath = path.join(__dirname, 'goodreads.db')

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server running at https://localhost:3000/')
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

initializeDbAndServer()

app.get('/books/', async (request, response) => {
  const query = `
  SELECT
    *
  FROM
    Book
  ORDER BY
    book_id;
  `
  bookqueryList = await db.all(query)
  response.send(bookqueryList)
})
