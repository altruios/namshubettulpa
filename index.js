const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const util =require('util');
const {readFile } = require('fs')
const {EOL} = require('os');
const mdx_parser = require("./mdx_parser");

const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));

async function transform_to_md(cwd,callback){
    var re = /\[(.*?)\]/g
    var re2 = /\((.*?)\)/g
    return  await readFile(cwd,"utf-8",(err,data)=>{
        if(data==undefined||err){
            console.log(err,"is error, null is no file");
            callback("<h1>there is no file here</h1>",null);
            return;
        }
        const links = data?.match(/(\[(.*?)\]\(.*?\))/g) ||[]
        const headers = data?.match(/((?<atxlayer>#+)\s*(?<atxname>.+))|((?<setexname>[\w|\d|\s|-]+)\n(?<setexLayer>[-|=]{2,}))/g)||[]; // matches lines with # at start


        headers.forEach(head=>{
            const count = head.match(/^#+/)[0].length;
            const htext = head.replace(/^#+/,"");
            const replace = `<h${count} style="text-align: center;">${htext}</h${count}>`
            data=data.replace(head,replace);
        })

        links.forEach(link=>{
            const m1 = link.match(re2)[0].replace("(","").replace(")","");
            const m2 = link.match(re)[0].replace("]","").replace("[","");
            const replace = `<a href="${m1}">${m2}</a>`
            data=data.replace(link,replace)
        });
 
        const blocks =mdx_parser(data)
        if(blocks){

            console.log("Block is true!");
            const start=data.indexOf("{");
            const end = data.lastIndexOf("}");
            const start_str = data.slice(0,start);
            const end_str = data.slice(end+1);
            data= start_str+blocks+end_str
        }else{
            console.log("block is false");
            const paragraphs = data.split(EOL).filter(x=>x!=''&&x[0]!="{"&& !(x[1]=='h'&&x[0]=="<"));
            paragraphs.forEach(para=>{
                data=data.replace(para, `<p>${para}</p>`);
            })
        }
        data=`<html><body ${blocks? 'style="background-color:#6f6f6f"':''} >${data}</body></html>`
        const empty_para = "/([\<][\p][\>][\<][\/][\p][\>]/gm"
        while(data.match(empty_para)){
            data=data.replace(empty_para, "")
        }
        console.log(data);
        console.log("cwd",cwd);
        callback(null,data);
    })        
}
app.get("/*",(req,res)=>{
    const file_request = req.params[0];
    const is_md_file =file_request.includes(".md");
    cwd = is_md_file ?  path.join(BASE_DIR,req.params[0]) :
                        path.join(BASE_DIR,req.params[0],"index.md");
    transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })