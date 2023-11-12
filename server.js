const port=5000

const express=require('express');
require('dotenv').config();
const axios=require('axios');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const buildPath = path.join(__dirname, 'build')
app.use(express.static(buildPath))
app.use(express.json())
app.use(bodyParser.json());
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

const options = {
  method: 'GET',
  url: 'https://pexelsdimasv1.p.rapidapi.com/v1/search',
  params: {
    query: 'inspiration',
    locale: 'en-US',
    per_page: '1',
    page: '1'
  },
  headers: {
    Authorization: process.env.IMAGE_AUTH,
    'X-RapidAPI-Key': process.env.IMAGE_API_KEY,
    'X-RapidAPI-Host': 'PexelsdimasV1.p.rapidapi.com'
  }
};
  
 axios.request(options).then(response=>{
      res.json(response.data);
 }).catch((err)=>{
  console.error(err);
 })
      
})


app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})


app.post('/next_page',(req,res)=>{
  var nextPageLink = req.body.nextPage;

  const options = {
    method: 'GET',
    url: String(nextPageLink),
    headers: {
      Authorization: process.env.IMAGE_AUTH,
      'X-RapidAPI-Key': process.env.IMAGE_API_KEY,
      'X-RapidAPI-Host': 'PexelsdimasV1.p.rapidapi.com'
    }
  };
    
   axios.request(options).then(response=>{
        res.json(response.data);
   }).catch((err)=>{
    console.error(err);
   })
})

app.listen(port,()=>console.log(`Server running on ${port}`))