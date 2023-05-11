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

const image_types = [".png",".jpg",".gif","favicon.ico"]
app.get("/*",(req,res)=>{
    const file_request = req.params[0];
    const rs = path.join(BASE_DIR,file_request); 
    if(file_request.includes(".css"))                   return res.sendFile(path.join(BASE_DIR,'style.css'))
    if(image_types.some(it=>file_request.includes(it))) return res.send(readFileSync(rs))

    const is_index_file = file_request.includes('index.md')
    const is_md_file =file_request.includes(".md");
    const is_short_story = file_request.includes("shorts")&&!is_index_file

    cwd = rs //add index if no file extension found
    if(is_short_story)return PARSE_MD(cwd,res)
    else if (is_md_file) return transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
    else return res.sendFile(rs)
})

app.listen(port, () => {
    console.log("listening",port)
})
