const {readFile} = require('fs')
const speakers =require('./speakermap.js');
const emoji_map = require('./emoji_map.js');

class MDX_PARSER{
    constructor(narrator){
        this.narrator=narrator
        this.html_head=`<html><meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Namshub Et'Tulpa</title>
        <link rel="stylesheet" href="style.css">
        <body>`
        this.html_end=`</p></body></html>`
    }
    async PARSE_MD(cwd,res){ //incomplete and basic
        return readFile(cwd,"utf-8",(err,data)=>{
            if(data==undefined||err){
                return res.send("<h1>there is no file here</h1>");
            }
            data=this.escapeHtml(data)
            data=data.replaceAll(/(\`\`\`(.*?)\`\`\`)/gms,'<pre class="code">$2</pre>')
            data=data.replaceAll(/####(.*)/gm,'<h4>$1</h4>')
            data=data.replaceAll(/###(.*)/gm,'<h3>$1</h3>')
            data=data.replaceAll("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
            data=`${this.html_head}${data}${this.html_end}`
    
            return res.send(data)
        })
    }
    transform_headers(data){
        const headers = data?.match(/^[#]+\s.*/gm)||[]; // matches lines with # at start
            headers.forEach(head=>{
                const count = head.match(/^#+/)[0].length;
                const htext = head.replace(/^#+/,"");
                const replace = `<h${count}>${htext}</h${count}>`
                data=data.replace(head,replace);
            })
        return data
    }
    transform_links(data){
        var re = /\[(.*?)\]/g
        var re2 = /\((.*?)\)/g
        const links = data?.match(/[^!](\[(.*?)\]\(.*?\))/g) ||[]
            links.forEach(link=>{
                const m1 = link.match(re2)[0].replace("(","").replace(")","");
                const m2 = link.match(re)[0].replace("]","").replace("[","");
                const replace = `<a href="${m1}">${m2}</a>`
                data=data.replace(link,replace)
            });
            return data;
    }
    transform_images(data){
        var re = /\[(.*?)\]/g
        var re2 = /\((.*?)\)/g
        var re3 = /\{(.*?)\}/g
        const images = data?.match(/[!](\[(.*?)\]\(.*?\)\{?.*?\})/g) ||[]
        images.forEach(img=>{
            const urlandhover = img.match(re2)[0].replace("(","").replace(")","");
            const style = img.match(re3)[0]?.replace("{","")?.replace("}","");
            const url = urlandhover.slice(0,urlandhover.indexOf(" "))
            const altText = img.match(re)[0].replace("]","").replace("[","");
            
            const replace = `<img src="${url}" alt="${altText}" style="${style}"/>`
            data=data.replace(img,replace)
        })
        return data;
    }
    transform_ordered_lists(data){
        const lines = data?.match(/^[0-9]+[.].*?$/gm)||[]
        lines.forEach((line,i,arr)=>{
            const split_line = line.replace(/^[0-9]+[.]/gm,"")
            if(i==0){
                data=data.replace(line,`<ol><li >${split_line}</li>`)
            }else if(i==arr.length-1){
                data=data.replace(line,`<li>${split_line}</li></ol>`)
            }else{
                data=data.replace(line,`<li>${split_line}</li>`)
            }
        })
        return data;
    }
    transform_unordered_lists(data){
        const  unordered_lines = data?.match(/^[-]+.*?$/gm)||[]
        unordered_lines.reduce((_last,line,i,arr)=>{
            const len = line.match(/^[-]+/gm)[0].length//no need for ||[]
            const split_line = line.replace(/^[-]+/gm,"")
            if(i==0){
                data=data.replace(line,`<ul><li>${split_line}</li>`)
            }
            else if(len==_last){
                if(i==arr.length-1) data=data.replace(line,`<li>${split_line}</li>${`</ul>`.repeat(_last)}`)
                else data=data.replace(line,`<li>${split_line}</li>`)
            }
            else if(len>_last){
                if(i==arr.length-1) data=data.replace(line,`<ul><li>${split_line}</li>${`</ul>`.repeat(_last)}`)
                else data=data.replace(line,`<ul><li>${split_line}</li>`)
            }else if(len<_last){
                if(i==arr.length-1) data=data.replace(line,`${`</ul>`.repeat(_last-len)}<li>${split_line}</li>${`</ul>`.repeat(_last)}`)
                else   data=data.replace(line,`${`</ul>`.repeat(_last-len)}<li>${split_line}</li>`)  
            }
            return len;
        },1)
        return data;
    }
    async Parse(cwd,callback){
        return  readFile(cwd,"utf-8",(err,data)=>{
            if(data==undefined||err){
                return callback("<h1>there is no file here</h1>",null);
            }
            data = this.transform_headers(data);
            data = this.transform_links(data);
            data = this.transform_images(data);
            data = this.transform_ordered_lists(data);
            data = this.transform_unordered_lists(data);
            
            const script_bypass={data:""}
            const script = data.match(/<script[^>]*>[\s\S]*?<\/script>/gim)
            script_bypass.data=script?script[0]:"";``
            data=data.replaceAll(script,"");
            const div_bypass={data:[],keys:[]};
            div_bypass.data = data.match(/[<][d][i][v].*[>].*[<][\/][d][i][v][>]/gm)||[];
            div_bypass.keys = div_bypass.data.map((x,i)=>`$;$${i}$;$`)
            data=data.replaceAll(div_bypass.data,div_bypass.keys);
            const blocks =this.parse_mdx(data)
            if(blocks){
                
                const start=data.indexOf("{");
                const end = data.lastIndexOf("}");
                const start_str = data.slice(0,start);
                const end_str = data.slice(end+1);
                data= start_str+blocks+end_str
            }
            data=`${this.html_head}${data}</body>
            ${script_bypass.data}
            </html>`
            data=data.replace(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
            data=data.replaceAll(div_bypass.keys,div_bypass.data);
            
            callback(null,data);
        })        
    }
    parse_mdx(text){
        const data = this.get_mdx_data(text);
        const blocks = this.separate_blocks(data);
        const parsed = blocks.reduce((p,item)=>p+this.mdx_block_parser(item),`<block class="block">`)+`</block>`   
        return parsed;
    }
    get_mdx_data(text){
        return text.slice(text.indexOf("{"),text.lastIndexOf("}")+1)
    }
    separate_blocks(data){
        let token_maker = "";
        const delimiters=["\"","\'","\~","\`","\*"];
        const delimiters_stack =[];
        const blocks = data.split("").reduce((acc,char,i)=>{
            if(char=="}"){
                if(delimiters_stack.length==0){
                    acc.push(token_maker);
                    token_maker="";
                }else{
                    token_maker=token_maker+String(char)
                }
            }else if(char == "{" && delimiters_stack.length==0){
                
            }else if(delimiters.includes(char)){
                if(char ==delimiters_stack[delimiters_stack.length-1] &&delimiters_stack.length==1){
                    delimiters_stack.pop()
                }else if(delimiters_stack.length==0){
                    
                    delimiters_stack.push(char);
                }
                token_maker=token_maker+String(char);
            }else{
                token_maker=token_maker+String(char);
            }
            return acc
        },[])
        return blocks;
    }
    get_narrator(key){
        let narrator;
        if(key.includes("__")){
            const [k1,k2]=[key.slice(0,key.indexOf("__")),key.slice(key.indexOf("__")+2)]
            narrator = speakers["___"](k1,k2);
        }else if(key.includes("_")){
            const [k1,k2]=[key.slice(0,key.indexOf("_")),key.slice(key.indexOf("_"))]
            narrator = speakers["__"](k1,k2);
        }
        else narrator = speakers[key];
        return narrator;
    }
    mdx_block_parser(block){
        let ref=block;
        
        const regex_settings = ref.match(/^\s*[m][n][:](.*)/gm)
        block = block.replace(regex_settings,"")
        if(regex_settings!=null &&regex_settings.length!=0){
            const key=regex_settings[0].slice(regex_settings[0].indexOf(":")+1);
            this.narrator= this.get_narrator(key);
        }
    
        const pw = ref.match(/\\{0}\`([^`]*)\`/gm)||[];
        pw.forEach(r=>ref=ref.replace(r,""))
        const aw = ref.match(/\\{0}\*([^*]*)\*/gm)||[];
        aw.forEach(r=>ref=ref.replace(r,""))
        const dw = ref.match(/\\{0}\~([^~]*)\~/gm)||[];
        dw.forEach(r=>ref=ref.replace(r,""))
        const sw = ref.match(/\\{0}\"([^"]*)\"/gm)||[];
        sw.forEach(r=>ref=ref.replace(r,""))
        const tw = ref.match(/\\{0}\'([^']*)\'/gm)||[];
        tw.forEach(r=>ref=ref.replace(r,""));
        
        const lines_types = [...sw,...tw,...aw,...dw];
        
        const transforms_words = lines_types.map(x=>{
            return {
                o:x,
                t:this.scp(x,false),
            }
        })
        let transforms_data = pw.map(x=>{
            return {
                o:x,
                t:x
            }
        })
        transforms_data = transforms_data.map((obj,i)=>{
            let ref = obj.t;
            const aw = ref.match(/\*([^*]*)\*/gm)||[];
            const dw = ref.match(/\~([^~]*)\~/gm)||[];
            const sw = ref.match(/\"([^"]*)\"/gm)||[];
            const tw = ref.match(/\'([^']*)\'/gm)||[];
            const links = (ref.match(/\<a.*\>/gm)||[]);
            const fake_links = links.map((link,i)=>`!!@@!${i}!@@!!`)
            links.forEach((l,i)=>{
                obj.t=obj.t.replaceAll(links[i],fake_links[i])})
                const internal_data_matches = [...aw,...dw,...sw,...tw];
                internal_data_matches.forEach(match=>ref=ref.replace(match,""));
                const internal_data_matches_unique = internal_data_matches.reduce((acc,item)=>{
                if(!acc.includes(item))acc.push(item)
                return acc
            },[])
            
            internal_data_matches_unique.forEach(match=>{
                obj.t=obj.t.replaceAll(match,this.scp(match,true))
            })    
            obj.t=obj.t.replaceAll(/([t][r][u][e]|[f][a][l][s][e])/gm,`<span class="boolean">$1</span>`)
            obj.t=obj.t.replaceAll(/([=][>]|[<][=]|[e][x][e]|[|][|]|[W][I][T][H]|[W][H][I][L][E]|[T][R][Y]|[C][A][T][C][H])/gm,`<span class="cli">$1</span>`)
            obj.t=obj.t.replaceAll(/([\{]|[\}]|[\[]|[\]]|[\(]|[\)])/gm,`<span class="bracket">$1</span>`)
            obj.t=obj.t.replaceAll(/([\s][-][\w]+)/gm,`<span class="cli-option">$1</span>`)
            obj.t=obj.t.replaceAll(/([-][-][\w][\w-]*)/gm,`<span class="cli-option-long">$1</span>`)
            obj.t=obj.t.replaceAll(/([.][\w]+)/gm,`<span class="cli-object">$1</span>`)
            
            fake_links.forEach((fl,i)=>obj.t=obj.t.replaceAll(fl,links[i]))
    
            return obj;
        })
        
        transforms_data = transforms_data.map(x=>{
            const text = x.t.slice(1,x.t.length-1)
            return {
                o:x.o,
                t:`<pre class="code"><span>${text}</span></pre>`
            }
        })
        const transforms = [...transforms_data,...transforms_words].reduce((acc,t)=>{
            if (acc.includes(y=>y.o==t.o)){}
            else {acc.push(t)}
            return acc
        },[])
        
        transforms.forEach(t=>{
            block=block.replaceAll(t.o,t.t)
            if(t.o[0]=="`"){
        }
    })
    
    block=block.replaceAll(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
    block=block.replaceAll(/([\^]+)/gm,`<span class="indicator">$1</span>`)
        block=block.replaceAll(/([%][%][%][%])/gm,`<br /><div class="section_break">%%%%</div><br /><br />`);
        return block;
    }
    scp(txt,internal_data_flag){
        const speaker_regex = txt.match(/\w+[:][:]/gm);
        const emoji_regex = txt.match(/[$][E][\w]*[:]/gm);
        if(emoji_regex){
            for(const match of emoji_regex){
                let key = match.slice(2,emoji_regex.indexOf(":"));
                let emoji = emoji_map[key];
            txt=txt.replace(match, emoji);
            }
        }
        switch(txt[0]){
            case "\"": 
                if(internal_data_flag) return `<span class="speech">${txt}</span>`;
                if(speaker_regex){
                    let key = speaker_regex[0].slice(0,speaker_regex.indexOf(":")-1);
                    const speaker = this.get_narrator(key);
                    const mainFlag = speaker == this.narrator;
                    const dialouge = txt[0]+txt.slice(txt.indexOf("::")+2)
                    const d = `<span>${dialouge}</span>`
                    return this.speaker_bubble_div(d,mainFlag,speaker,"speech");
                }
                return `<span>${txt}</span>`;
            case "\'": 
                if(internal_data_flag) return `<span class="thought">${txt}</span>`;
                if(speaker_regex){
                    let key = speaker_regex[0].slice(0,speaker_regex.indexOf(":")-1);
                    const speaker = this.get_narrator(key);
                    const mainFlag = speaker== this.narrator;
                    const dialouge = txt[0]+txt.slice(txt.indexOf("::")+2)
                    const d = `<span>${dialouge}</span>`
                    return this.speaker_bubble_div(d,mainFlag,speaker,"thought");
                }else{
                    const d = `<span>${txt}</span>`
                    return this.speaker_bubble_div(d,true,this.narrator,"thought")
                }
            case "\~": return `<span class="description">${txt}</span>`;
            case "\*": return `<span class="action">${txt}</span>`;
            case "\`": return `<code class="code";>${txt}</code>`;
        }
    }
    speaker_bubble_div(txt,mainNB,speaker,type) {
        return`<div class=" bubble ${mainNB?"narrator":"other"} ${mainNB?type:`${type}2`}">
        <div class="bubble_label">${speaker}</div>
        <div class="type" style="padding-${mainNB?'left':'right'}: 15;">${txt}</div>
        </div>`
    }
    escapeHtml  (unsafe) {
        return unsafe.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    }
}
module.exports={MDX_PARSER};