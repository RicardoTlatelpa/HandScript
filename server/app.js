const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const PORT = 3001;

app.use(bodyParser.json());
app.get('/', (req,res)=>{
  res.send('Handscript server');
})

app.post('/api/svgArray', (req, res) => {
  const svgArray = req.body.theSVGArray;
  res.send("Recieved array");
  console.log(svgArray[0]);
});


app.listen(PORT,()=>{
  console.log(`Example app listening on port ${PORT}`)
});

