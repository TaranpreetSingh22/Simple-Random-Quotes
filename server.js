const port=5000

const express=require('express');
require('dotenv').config();
const axios=require('axios');
const path=require('path');
const app=express();
const cors=require('cors');
app.use(cors())

app.get('/quotes',(req,res)=>{  

    const options = {
      method: 'GET',
      url: 'https://quotes15.p.rapidapi.com/quotes/random/',
      headers: {
        'X-RapidAPI-Key': process.env.QUOTE_API_KEY,
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
      }
    };
    
   axios.request(options).then(response=>{
        res.json(response.data);
   }).catch((err)=>{
    console.error(err);
   })
        
})

app.get('/images',(req,res)=>{  

  const options={
    method:'GET',
    url:'https://api.pexels.com/v1/search?query=inspiration&per_page=1',
    headers:{
      Authorization:process.env.AUTH_HEADER
    }
  }
  
 axios.request(options).then(response=>{
      res.json(response.data);
 }).catch((err)=>{
  console.error(err);
 })
      
})


const buildPath = path.join(__dirname, 'build')

app.use(express.static(buildPath))
app.use(express.json())
app.use(cors())

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(port,()=>console.log(`Server running on ${port}`))