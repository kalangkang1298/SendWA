const express = require('express')
const app = express()
const port = process.env.port || 3000
const router = require("./Router/wa")
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use("/", router)

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})