const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
const {transform_to_md,PARSE_MD} = require("./mdx_parser");

const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));

app.get("/",(req,res)=>{
    const start_path = path.join(BASE_DIR,"index.html")
    readFile(start_path,"utf-8",(err,data)=>{
        res.send(data);
    })
})

app.get("/*",(req,res)=>{
    const file_request = req.params[0];
    if(file_request.includes(".css")) return res.sendFile(path.join(BASE_DIR,'style.css'))
    
    const is_md_file =file_request.includes(".md");
    const is_short_story = file_request.includes("shorts")
    const is_index_file = file_request.includes('index.md')
    const image_types = [".png",".jpg",".gif","favicon.ico"]
    const is_image = (image_types.some(it=>file_request.includes(it)))
    if(is_image){
        const rs = path.join(BASE_DIR,req.params[0]); 
        console.log("is image");
        res.send(readFileSync(rs));
        return
    }

    cwd = is_md_file?  path.join(BASE_DIR,req.params[0]) : //pass straight thorough
                        path.join(BASE_DIR,req.params[0],"index.md"); //add index if no file extension found
    
    is_short_story&&!is_index_file?PARSE_MD(cwd,res):transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
})

app.listen(port, () => {
    console.log("listening",port)
})
