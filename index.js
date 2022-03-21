const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const util =require('util');
const {readFile } = require('fs')
const {EOL} = require('os');
const { parse } = require('path');

const BASE_DIR = path.join(__dirname, 'public');;
let cwd = BASE_DIR;
app.set('public', path.join(__dirname, 'public'));

async function transform_to_md(cwd,callback){
    var re = /\[(.*?)\]/g
    var re2 = /\((.*?)\)/g
    return  await readFile(cwd,"utf-8",(err,data)=>{
        if(data==undefined){
            callback("<h1>there is no file here</h1>",null);
            return;
        }
        const links = data?.match(/(\[(.*?)\]\(.*?\))/g) ||[]
        const headers = data?.match(/((?<atxlayer>#+)\s*(?<atxname>.+))|((?<setexname>[\w|\d|\s|-]+)\n(?<setexLayer>[-|=]{2,}))/g)||[]; // matches lines with # at start


        headers.forEach(head=>{
            const count = head.match(/^#+/)[0].length;
            const htext = head.replace(/^#+/,"");
            const replace = `<h${count}>${htext}</h${count}>`
            data=data.replace(head,replace);
        })

        links.forEach(link=>{
            const m1 = link.match(re2)[0].replace("(","").replace(")","");
            const m2 = link.match(re)[0].replace("]","").replace("[","");
            const replace = `<a href="${m1}">${m2}</a>`
            data=data.replace(link,replace)
        });
 
        const blocks =mdx_parser(get_mdx_data(data))
        if(blocks){
            console.log("Block is true!");
            const start=data.indexOf("{");
            const end = data.lastIndexOf("}");
            const start_str = data.slice(0,start);
            const end_str = data.slice(end);
            data= start_str+blocks+end_str
        }else{
            console.log("block is false");
            const paragraphs = data.split(EOL).filter(x=>x!=''&&x[0]!="{"&& !(x[1]=='h'&&x[0]=="<"));
            paragraphs.forEach(para=>{
                data=data.replace(para, `<p>${para}</p>`);
            })
        }
        data=`<html><body>${data}</body></html>`
        data=data.replace('<p></p>','')
        console.log("cwd",cwd);
        callback(null,data);
    })        
}
app.get("/*",(req,res)=>{
  //  console.log(req);
    console.log(req.params[0])
    const file_request = req.params[0];
    const is_md_file =file_request.includes(".md");
    console.log("ismd file",is_md_file)
    cwd = is_md_file?path.join(BASE_DIR,req.params[0])
        :path.join(BASE_DIR,req.params[0],"index.md");
    console.log("CWD",cwd)
    console.log("transforming data");
    transform_to_md(cwd,(err,r)=>{
        if(err) res.send(err);
        else{
        //console.log(r,"is transform responce");
        console.log("sending r");

        res.send(r);
        }
        console.log("sent");
    })
  
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
const get_mdx_data=(text)=>{
    const blockstart = text.indexOf("{");
    const blockend = text.lastIndexOf("}");
    const block = text.slice(blockstart,blockend);
    return block;
}
const mdx_parser = (block)=>{
    const pw = block.match(/\`([^`]*)\`/gm)||[];
    const sw = block.match(/\"([^"]*)\"/gm)||[];
    const tw = block.match(/\'([^']*)\'/gm)||[];
    const aw = block.match(/\*([^*]*)\*/gm)||[];
    const dw = block.match(/\~([^~]*)\~/gm)||[];
    const cut_delimiters=["~","`","*"];
    const stylemap = {
        "\"":`#ff00ff`,
        "'":`#ff0000`,
        "\~":`#4477ff`,
        "*":`#00ffff`,
        "`":`#00ff00`
    }
    console.log("stuff", pw.length);
    const lines_types = [...pw,...sw,...tw,...aw,...dw];
    const transforms = lines_types.map(x=>{
        return {
            o:x,
            t:`<text style="color:${stylemap[x[0]]}">${cut_delimiters.includes(x[0])?x.slice(1,x.length-1):x}</text>`}
    })
    console.log("transforms length,",transforms.length)
    transforms.forEach(t=>{

       console.log(t,"replaceing\n\n",t.o,"\n\nwitih,\n\n",t.t);

        block=block.replace(t.o,t.t)
    });
   // console.log("transofmred block,",block);
    console.log("was tranformed block")
    return block;
}