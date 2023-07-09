const express = require('express');
const PORT = 3001;
const app = express()
const fs= require('fs');
const svgtofont = require('svgtofont');
const path= require('path'); 
const fs_extra = require('fs-extra');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
  
  // 2.retrieve files from client and put into appropriate destination
  const shipment = jsonData.shipment
  shipment.forEach(item=>{
    const fileName = `${item[1]}.svg`;
    const fileContent = item[0]
    const filePath = path.join(directoryPath, fileName)

    fs.writeFile(filePath,fileContent, (err)=>{
      if(err){
        console.error(err);
        return;
      }
      console.log('File created successfully');
    })    
  })  
  // 3.convert svg to font files
  // STILL UNDER CONSTRUCTION, SVGTOFONT needs better unicode mapping
  svgtofont({
    src: path.resolve(process.cwd(), `server/${directoryName}`), // svg path
    dist: path.resolve(process.cwd(), `server/${directoryName}/download`), // output path
    fontName: 'HandScripts', // font name
    css: false, // Create CSS files.
    startUnicode: 0x0061,	
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true
    },
    useNameAsUnicode: false, // each file has their appropriate unicode mapping    
  }).then(() => {
    
    // 4.send appropriate font files to user
    const download = path.join(directoryPath, '/download/HandScripts.ttf');
    res.status(200);    
    // Set the headers for the TTF file
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="font.ttf"');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  
    res.sendFile(download);
    console.log('Finished');
    
    // 5.delete any directories created
    fs_extra.remove(directoryPath)
    .then(()=>{
      console.log('Directory deleted successfully');
    })
    .catch((err)=>{
      console.error(err);
      res.sendStatus(500);
      return;
    });
    
    }); 
  });
  
 
})

app.listen(PORT,()=>{
  console.log(`Example app listening on port ${PORT}`)
});
