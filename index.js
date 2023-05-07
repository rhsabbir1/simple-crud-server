const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors= require('cors')


app.use(cors())
app.use(express.json())


app.get('/' , (req , res)=>{
    res.send('Server is running')
})

app.listen(port ,()=>{
    console.log(`server on running port ${port}`)
})