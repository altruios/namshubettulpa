const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
const {EOL} = require('os');
var os = require('os');
var qrcode = require('qrcode-terminal');
var networkInterfaces = os.networkInterfaces();
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
        data=`<html><meta charset="UTF-8"><body style="background-color:${bg_colors[4]}; ${blocks? `font-size:3vh;display:flex;flex-flow:column nowrap;"`:''} >${data}</body></html>`
        data=data.replace(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
        callback(null,data);
    })        
}
app.get("/*",(req,res)=>{

    const file_request = req.params[0];
    const is_md_file =file_request.includes(".md");

    const image_types = [".png",".jpg",".gif","favicon.ico"]
    const is_image = (image_types.some(it=>file_request.includes(it)))
    if(is_image){
        const rs = path.join(BASE_DIR,req.params[0]);
        
        res.send(readFileSync(rs));
        return
    }

    cwd = is_md_file?  path.join(BASE_DIR,req.params[0]) :
                        path.join(BASE_DIR,req.params[0],"index.md");
    transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
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

