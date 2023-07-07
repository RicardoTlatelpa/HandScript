const express = require('express');
const PORT = 3001;
const app = express()
const multer = require('multer');

var storage = multer.diskStorage(
  {
      destination: 'fonts/',
      filename: function ( req, file, cb ) {
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
          cb( null, file.originalname+ '-' + Date.now()+".svg");
      }
  }
);

var upload = multer( { storage: storage } );

app.get('/', (req,res)=>{
  res.send('Handscript server');
})

app.post('/handleLC',upload.single('file'),(req,res)=>{  
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
