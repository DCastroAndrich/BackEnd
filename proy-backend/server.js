const express = require('express')
require("./db/mongoose.db.js")

const app = express()
app.use(express.json())

const port = process.env.PORT

app.listen(port, ()=>{ console.log(`Server escuchado en puerto ` + port) })
