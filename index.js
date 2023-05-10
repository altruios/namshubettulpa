const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const path = require('path');
const {readFile, readFileSync } = require('fs')
const transform_to_md = require("./mdx_parser");

//console.log(mdx_parser,"is parser")
const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));


app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });
app.get("/",(req,res)=>{
    const start_path = path.join(BASE_DIR,"index.html")
    readFile(start_path,"utf-8",(err,data)=>{
        res.send(data);
    })
})

app.get("/*",(req,res)=>{
    const file_request = req.params[0];
    if(file_request.includes(".css")) return res.sendFile(path.join(BASE_DIR,'style.css'))
    
    const is_html_file = file_request.includes(".html")
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
        data=`<html><title>Namshub Et'Tulpa</title><meta charset="UTF-8"><meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      /><body style="white-space: pre-wrap;" ><p>${data}</p></body>${script_bypass.data}</html>`

        res.send(data)
    }):transform_to_md(cwd,(err,r)=>err?res.send(err):res.send(r))
})
function escapeHtml  (unsafe) {
    return unsafe.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
app.listen(port, () => {
    console.log("listening",port)
})
