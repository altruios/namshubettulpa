const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
const {EOL} = require('os');
const mdx_parser = require("./mdx_parser");
const { resolveMx } = require('dns');

const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));




async function transform_to_md(cwd,callback){
    var re = /\[(.*?)\]/g
    var re2 = /\((.*?)\)/g
    var re3 = /\{(.*?)\}/g
    return  await readFile(cwd,"utf-8",(err,data)=>{
        if(data==undefined||err){
            console.log(err,"is error, null is no file");
            callback("<h1>there is no file here</h1>",null);
            return;
        }
        const links = data?.match(/[^!](\[(.*?)\]\(.*?\))/g) ||[]
        const images = data?.match(/[!](\[(.*?)\]\(.*?\)\{?.*?\})/g) ||[]
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
        images.forEach(img=>{
            
            if(cwd.includes("/public/index.md")){

            }
            console.log("image detected",img);
            const urlandhover = img.match(re2)[0].replace("(","").replace(")","");
            const style = img.match(re3)[0]?.replace("{","")?.replace("}","");
            const url = urlandhover.slice(0,urlandhover.indexOf(" "))
            const altText = img.match(re)[0].replace("]","").replace("[","");
            
            const replace = `<img src="${url}" alt="${altText}" style="${style}"/>`
            console.log(url, altText, replace);
            data=data.replace(img,replace)
        })
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
            const lines = data.split(EOL).filter(x=>x!=''&&x[0]!="{"&& !(x[1]=='h'&&x[0]=="<"));
        
            lines.forEach((line,i,arr)=>{
                if('123456789'.includes(line[0])){
                    const stripped_line = line.replace(line.match(/[0-9]+\.\s/gm),"")
                    if(line[0]=="1"&&line[1]=="."&&line[2]==" "){
                        data=data.replace(line,`<ol><li>${stripped_line}</li>`)
                    }
                    else if(!'123456789'.includes(arr[i+1][0])){
                        console.log(arr[i+1],"does not include number, ending list")
                        data=data.replace(line,`<li>${stripped_line}</li></ol>`)
                    }else{
                    data=data.replace(line,`<li>${stripped_line}</li>`)
                    }
                }else{

                    data=data.replace(line, `<p>${line}</p>`);
                }
            })
        }
        data=`<html><body ${blocks? 'style="background-color:#6f6f6f; font-size:3vh;"':''} >${data}</body></html>`
        data=data.replace(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
        //console.log(data);
        console.log("cwd",cwd);
        callback(null,data);
    })        
}
app.get("/*",(req,res)=>{
    const file_request = req.params[0];
    const is_md_file =file_request.includes(".md");

    const image_types = [".png",".jpg",".gif","favicon.ico"]
    const is_image = (image_types.some(it=>file_request.includes(it)))
    console.log("1got - ", cwd,is_image,is_md_file,"is bools",cwd,"is cwd",req.params[0])
    if(is_image){
        const rs = path.join(BASE_DIR,req.params[0]);
        console.log(rs,"is responce to image");
        
        res.send(readFileSync(rs));
        return
    }

    cwd = is_md_file?  path.join(BASE_DIR,req.params[0]) :
                        path.join(BASE_DIR,req.params[0],"index.md");
    console.log("got - ", cwd)
    transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })