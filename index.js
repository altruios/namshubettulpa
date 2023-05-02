const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
const {EOL} = require('os');
const mdx_parser = require("./mdx_parser");

const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));


const bg_colors=["#248bc5","#b5b5ba","#af80af","#b58782","#6f6f6f"] //blue // grey // red / greyred //dg
const fg_colors=["#fafafa","#000070"] //magenta//green

async function transform_to_md(cwd,callback){
    var re = /\[(.*?)\]/g
    var re2 = /\((.*?)\)/g
    var re3 = /\{(.*?)\}/g
    return  readFile(cwd,"utf-8",(err,data)=>{
        if(data==undefined||err){
            console.log("got this - ",data,err,cwd);
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
            const urlandhover = img.match(re2)[0].replace("(","").replace(")","");
            const style = img.match(re3)[0]?.replace("{","")?.replace("}","");
            const url = urlandhover.slice(0,urlandhover.indexOf(" "))
            const altText = img.match(re)[0].replace("]","").replace("[","");
            
            const replace = `<img src="${url}" alt="${altText}" style="${style}"/>`
            data=data.replace(img,replace)
        })
        const script_bypass={data:""}
        const script = data.match(/<script[^>]*>[\s\S]*?<\/script>/gim)
        script_bypass.data=script?script[0]:"";``
        data=data.replaceAll(script,"");
        const blocks =mdx_parser(data)
        if(blocks){

            const start=data.indexOf("{");
            const end = data.lastIndexOf("}");
            const start_str = data.slice(0,start);
            const end_str = data.slice(end+1);
            data= start_str+blocks+end_str
        }else{
            const lines = data.split(EOL).filter(x=>x!=''&&x[0]!="{"&& !(x[1]=='h'&&x[0]=="<"));
        
            lines.forEach((line,i,arr)=>{
                if('123456789'.includes(line[0])){
                    const stripped_line = line.replace(line.match(/[0-9]+\.\s/gm),"")
                    const data_line = stripped_line.slice(stripped_line.indexOf(".")+1);
                    if(line[0]=="1"&&line[1]=="."){

                        data=data.replace(line,`<ol style="font-size:5vh; margin-left:2vw" ><li >${data_line}</li>`)
                    }
                    else if(!arr[i+1] || !'123456789'.includes(arr[i+1][0])){
                        data=data.replace(line,`<li>${data_line}</li></ol>`)
                    }else{
                    data=data.replace(line,`<li>${data_line}</li>`)
                    }
                }else{

                    data=data.replace(line, `<p style="font-size:5vh;">${line}</p>`);
                }
            })
        }
        data=`<html><meta charset="UTF-8"><meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      /><style>

        .cursor {
            animation: 2s linear infinite b;
          }
          
          @keyframes b {
            0% {
              visibility: hidden;
            }
            50% {
              visibility: hidden;
            }
            100% {
              visibility: visible;
            }
          }</style><body style="background-color:${bg_colors[4]}; ${blocks? `font-size:3vh;display:flex;flex-flow:column nowrap;"`:''} >${data}</body>${script_bypass.data}</html>`
        data=data.replace(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
        callback(null,data);
    })        
}
app.get("/",(req,res)=>{
    console.log(req.params[0], "basic request");
    const start_path = path.join(BASE_DIR,"index.html")
    console.log("start path heard")
    readFile(start_path,"utf-8",(err,data)=>{
        console.log("data,ere",err,data);
        res.send(data);
    })
})

app.get("/*",(req,res)=>{

    const file_request = req.params[0];
    const is_html_file = file_request.includes(".html")
    const is_md_file =file_request.includes(".md");
    const is_short_story = file_request.includes("shorts")
    const is_index_file = file_request.includes('index.md')
    const image_types = [".png",".jpg",".gif","favicon.ico"]
    const is_image = (image_types.some(it=>file_request.includes(it)))
    console.log(file_request,"file request")
    const code_types=['.cpp','.js','.ts','.c','.go']
    const is_code = (code_types.some(it=>file_request.includes(it)))
    if(is_html_file){
        console.log("is html",file_request)
        return res.send(path.join(BASE_DIR,file_request))
    }
    if(is_image||is_code){
        const rs = path.join(BASE_DIR,req.params[0]);
        
        res.send(readFileSync(rs));
        return
    }

    cwd = is_md_file?  path.join(BASE_DIR,req.params[0]) : //pass straight thorough
                        path.join(BASE_DIR,req.params[0],"index.md"); //add index if no file extension found
    
    is_short_story&&!is_index_file?readFile(cwd,"utf-8",(err,data)=>{
        const script_bypass={data:""}
        const script = data.match(/<script[^>]*>[\s\S]*?<\/script>/gim)
        script_bypass.data=script?script[0]:"";``
        data=data.replaceAll(script,"");
        data=escapeHtml(data)
        data=data.replaceAll(/\`\`\`(.*)\`\`\`/gm,'<code>$1</code>')
        data=data.replaceAll(/####(.*)/gm,'<h4>$1</h4>')
        data=data.replaceAll(/###(.*)/gm,'<h3>$1</h3>')
        data=data.replaceAll("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        console.log(data);
        data=`<html><meta charset="UTF-8"><meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      /><body style="background-color:${bg_colors[4]};white-space: pre-wrap;" ><p>${data}</p></body>${script_bypass.data}</html>`

        res.send(data)
    }):transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
})
function escapeHtml  (unsafe) {
    return unsafe.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
app.listen(port, () => {
    console.log("listening",port)
})

