const express = require('express');
const app = express()
const PORT = 3001;

app.get('/', (req,res)=>{
  res.send('Handscript server');
})

const svgtofont = require('svgtofont');
const path = require('path');
 
svgtofont({
  src: path.resolve(process.cwd(), 'SVGTEST'), // svg path
  dist: path.resolve(process.cwd(), 'fonts'), // output path
  fontName: 'svgtofont', // font name
  css: true, // Create CSS files.
}).then(() => {
  console.log('done!');
});

app.listen(PORT,()=>{
  console.log(`Example app listening on port ${PORT}`)
});
