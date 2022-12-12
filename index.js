const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
//const {EOL} = require('os');
var os = require('os');
var qrcode = require('qrcode-terminal');
var networkInterfaces = os.networkInterfaces();
const MDXP = require("./mdxparser2");
const parser = new MDXP();

//console.log(mdx_parser,"is parser")
const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));


app.get("/*",(req,res)=>{

    const file_request = req.params[0];
    const is_md_file =file_request.includes(".md");

    const image_types = [".png",".jpg",".gif","favicon.ico"]
    const is_image = (image_types.some(it=>file_request.includes(it)))
    if(is_image){
        const rs = path.join(BASE_DIR,req.params[0]); 
        console.log("is image");
        res.send(readFileSync(rs));
        return
    }

    cwd = is_md_file?  path.join(BASE_DIR,req.params[0]) :
                        path.join(BASE_DIR,req.params[0],"index.md");
    
    readFile(cwd,"utf-8",(err,text)=>{
        if(text==undefined||err){
            console.log("hit error")
            res.send("<h1>there is no file here</h1>",null);
            return;
        }
        console.log("parsing")
        console.log("cwd:",cwd)
        const rval = parser.parse(cwd,text);
        console.log("past parsing");
        res.send(rval);
    
    });
})

app.listen(port, () => {
    //console.log(networkInterfaces)
    Object.values(networkInterfaces).forEach(network=>{
        network.forEach(entry=>{
            if((entry.family==4||entry.family=="IPv4")&&entry.address!="127.0.0.1"){
                console.log(`Namshub et'tuple is ready to read at ${entry.address}:${port}`)
                qrcode.generate(`http://${entry.address}:${port}`,{small:true});
            }
        })
    });
    console.log("listening",port)
})

