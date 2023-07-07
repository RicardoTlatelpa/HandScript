const express = require('express');
const bodyParser = require('body-parser'); // decoding data from user requests
const PORT = 3001;
const app = express()

app.use(bodyParser.json());
app.get('/', (req,res)=>{
  res.send('Handscript server');
})

app.post('/handleLC',(req,res)=>{
  console.log(req.body);
  res.sendStatus(200);
} )

// const svgtofont = require('svgtofont');
// const path = require('path');
 
// svgtofont({
//   src: path.resolve(process.cwd(), 'SVGTEST'), // svg path
//   dist: path.resolve(process.cwd(), 'fonts'), // output path
//   fontName: 'svgtofont', // font name
//   css: true, // Create CSS files.
//   startUnicode: 0x0030, // unicode start number
//   svgicons2svgfont: {
//     fontHeight:1000,
//     normalize: true
//   },
// }).then(() => {

//   console.log('done!');
// });

app.listen(PORT,()=>{
  console.log(`Example app listening on port ${PORT}`)
});
