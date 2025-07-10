const express = require('express')

const app = express()
const port = 80

app.get('/', (req, res)=>{
    res.json({message:'This is main route'})
})

app.get('/health', (req, res)=>{
    res.json({message:'Health checked'})
})

app.listen(port, ()=>console.log('Server running on port:', port))