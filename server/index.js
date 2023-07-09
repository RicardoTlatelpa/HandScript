const express = require('express');
const PORT = 3001;
const app = express()
const multer = require('multer');
const fs= require('fs');
const svgtofont = require('svgtofont');
const path= require('path'); 
const fs_extra = require('fs-extra');
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.json());
// var temp = require('temp'),
//     fs   = require('fs'),
//     util = require('util'),

//     exec = require('child_process').exec;
 
// temp.track();

//Multer implementation
// var storage = multer.diskStorage(
//   {
//       destination: `./server/${directoryName}`,
//       filename: function ( req, file, cb ) {
//           //req.body is empty...
//           //How could I get the new_file_name property sent from client here?
//           cb( null, file.originalname+'-'+".svg");
//       }
//   }
// );

//var upload = multer();

app.get('/', (req,res)=>{
  res.send('Handscript server');
})

app.post('/handleLC',bodyParser.json(),(req,res)=>{  
  //const files = req.files.files;
  const jsonData = req.body  
  const directoryName = String(Date.now());
  const directoryPath = path.join(__dirname, directoryName);
  
  // 1.create temporary directory for svgtofont package
  fs.mkdir(directoryPath, (err) => {
    if(err) {
      console.error(err);      
      return;
    }      
  const shipment = jsonData.shipment
  // 2.retrieve files from client and put into appropriate destination
  let i = 0
  shipment.forEach(item=>{
    const fileName = `ex${i}.svg`;
    const fileContent = item
    const filePath = path.join(directoryPath, fileName)

    fs.writeFile(filePath,fileContent, (err)=>{
      if(err){
        console.error(err);
        return;
      }
      console.log('File created successfully');
    })
    i+=1;
  })
  
  // 3.convert svg to font files
  svgtofont({
    src: path.resolve(process.cwd(), `server/${directoryName}`), // svg path
    dist: path.resolve(process.cwd(), `server/${directoryName}/download`), // output path
    fontName: 'HandScripts', // font name
    css: false, // Create CSS files.
    startUnicode: 0x0041, // unicode start number
    svgicons2svgfont: {
      fontHeight:1000,
      normalize: true
    },
  }).then(() => {

    console.log('done!');
  });

  // 4.send appropriate font files to user
    
  // 5.delete any directories created
  // fs_extra.remove(directoryPath)
  // .then(()=>{
  //   console.log('Directory deleted successfully');
  // })
  // .catch((err)=>{
  //   console.error(err);
  //   res.sendStatus(500);
  //   return;
  // });
  
  });

  res.sendStatus(200);
})



app.listen(PORT,()=>{
  console.log(`Example app listening on port ${PORT}`)
});
