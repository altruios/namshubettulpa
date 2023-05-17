const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
const {transform_to_md,PARSE_MD} = require("./mdx_parser");
const {MDX_PARSER} = require("./mdx_parser2");
console.log(MDX_PARSER,"is parser")
const BASE_DIR = path.join(__dirname, 'public');;
const image_types = [".png",".jpg",".gif","favicon.ico"]
let cwd = BASE_DIR;
const PARSER = new MDX_PARSER("Martha");
app.set('public', path.join(__dirname, 'public'));
app.get("/",(_,res)=>readFile(path.join(BASE_DIR,"index.html"),"utf-8",(err,data)=>res.send(data)))
app.get("/*",(req,res)=>{
    const file_request = req.params[0];
    const rs = path.join(BASE_DIR,file_request); 
    const is_image = image_types.some(it=>file_request.includes(it)); 
    const is_index_file = file_request.endsWith('index.md')
    const is_md_file =file_request.endsWith(".md");
    const is_short_story = file_request.includes("shorts")&&!is_index_file
    cwd = rs

    console.log({rs})
    if(file_request.includes(".css"))   return res.sendFile(path.join(BASE_DIR,'style.css'))
    if(is_image)                        return res.send(readFileSync(rs))
    if(is_short_story)                  return PARSER.PARSE_MD(cwd,res)
    else if (is_md_file)                return PARSER.Parse(cwd,(err,r)=>err?res.send(err):res.send(r))
    else                                return res.sendFile(rs, null,(e)=>e?res.send(`<h2> ${e.stack}</h2>`):console.log("sent"))
    
})
app.listen(port, () =>console.log("listening",port))