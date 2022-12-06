const {readFile, readFileSync } = require('fs')
const {EOL} = require('os');


const speakers =require('./speakermap.js');
const emoji_map = require('./emoji_map.js');
class MDX_PARSER{
    constructor(){
        this.background_colors=["#248bc5","#b5b5ba","#af80af","#b58782","#6f6f6f"] //blue // grey // red / greyred //dg
        this.foreground_colors=["#fafafa","#000070"] //magenta//green
        this.action_color="#44aaff";
        this.description_color="#afaf00";
        this.dialogue_color="";
        this.thought_color="";
        this.terminal_color="6a6a6a";
        this.text_size="";
        this.current_speaker="";
    }
    set_bg_colors(col_arr){
        this.background_colors=col_arr;
    }
    set_fg_colors(col_arr){
        this.foreground_colors=col_arr;
    }
    parse(cwd,callback){

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
            const blocks =this.get_mdx_data_blocks(data)
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
            data=`<html><meta charset="UTF-8"><body style="background-color:${this.background_colors[4]}; ${blocks? `font-size:3vh;display:flex;flex-flow:column nowrap;"`:''} >${data}</body></html>`
            data=data.replace(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
            callback(null,data);
        })        
    
    }
    get_mdx_data_blocks(data){
        let token_maker = "";
        const delimiters="\"\'\~\`\*";
        const delimiters_stack =[];
        return data.split("").reduce((acc,char,i)=>{
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
    }
    get_speaker_with_title=(key)=>{
        let current;
        if(key.includes("__")){
            const [k1,k2]=[key.slice(0,key.indexOf("__")),key.slice(key.indexOf("__")+2)]
            current = speakers["___"](k1,k2);
        }else if(key.includes("_")){
            const [k1,k2]=[key.slice(0,key.indexOf("_")),key.slice(key.indexOf("_"))]
            current = speakers["__"](k1,k2);
        }
        else{
            current = speakers[key];
    
        }
        return current;
    }
    mdx_block_parser = (block)=>{
        //use ref to have a clean block
        let ref=block;

        const regex_speaker = ref.match(/^[m][n][:](.*)/gm) //nm:${speaker_key}
        
        //after read - just delete from block directly
        block = block.replace(regex_speaker,"")
        
        //if there is new narrator set current speaker to that
        if(regex_speaker!=null &&regex_speaker.length!=0){
            const key=regex_speaker[0].slice(regex_speaker[0].indexOf(":")+1);
            this.current_speaker = get_speaker_with_title(key);
        }



        //take out the different parts
        const pw = ref.match(/\`([^`]*)\`/gm)||[]; //programming words
        pw.forEach(r=>ref=ref.replace(r,""))
        const aw = ref.match(/\*([^*]*)\*/gm)||[]; //action
        aw.forEach(r=>ref=ref.replace(r,""))
        const dw = ref.match(/\~([^~]*)\~/gm)||[]; //description
        dw.forEach(r=>ref=ref.replace(r,""))
        const sw = ref.match(/\"([^"]*)\"/gm)||[]; //speech
        sw.forEach(r=>ref=ref.replace(r,""))
        const tw = ref.match(/\'([^']*)\'/gm)||[]; //thought
        tw.forEach(r=>ref=ref.replace(r,""));



        const lines_types = [...sw,...tw,...aw,...dw];
    
        const transforms_words = lines_types.map(x=>{
            return {
                o:x,
                t:scp(x,false),
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
            const links = (ref.match(/\<.*\>/gm)||[])
            const fake_links = links.map((link,i)=>`!!@@!${i}!@@!!`)
            links.forEach((l,i)=>{
                obj.t=obj.t.replaceAll(links[i],fake_links[i])})
            const internal_data_matches = [...aw,...dw,...sw,...tw];
            internal_data_matches.forEach(match=>ref=ref.replace(match,""));
            const kw = ref.match()||[]
            const internal_data_matches_unique = internal_data_matches.reduce((acc,item)=>{
                if(!acc.includes(item))acc.push(item)
                return acc
                },[])
    
            internal_data_matches_unique.forEach(match=>{
                obj.t=obj.t.replaceAll(match,scp(match,true))
            })    
            obj.t=obj.t.replaceAll(/([t][r][u][e]|[f][a][l][s][e])/gm,`<span style="color:#9953e0">$1</span>`)
            obj.t=obj.t.replaceAll(/([=][>]|[<][=]|[e][x][e]|[|][|]|[W][I][T][H]|[W][H][I][L][E]|[T][R][Y]|[C][A][T][C][H])/gm,`<span style="color:#aa0000">$1</span>`)
            obj.t=obj.t.replaceAll(/([\{]|[\}]|[\[]|[\]]|[\(]|[\)])/gm,`<span style="color:#ffffff">$1</span>`)
            obj.t=obj.t.replaceAll(/([\s][-][\w]+)/gm,`<span style="color:#ff6f00">$1</span>`)
            obj.t=obj.t.replaceAll(/([-][-][\w][\w-]*)/gm,`<span style="color:#ff4499">$1</span>`)
            obj.t=obj.t.replaceAll(/([.][\w]+)/gm,`<span style="color:#ca7922">$1</span>`)
            fake_links.forEach((fl,i)=>{
                console.log(fl,links[i],"replaceing")
                obj.t=obj.t.replaceAll(fl,links[i])
            })
    
            return obj;
        })
    
    
    
    
    
    
        transforms_data = transforms_data.map(x=>{
            return {
                o:x.o,
                t:`<pre style="background-color:#4f4f4f; width:100%; font-size:65%; white-space: pre-wrap;word-wrap: break-word;"><span style="background-color:inherit;color:#aFafd0">${x.t}</span></pre>`
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
        block=block.replaceAll(/([\^]+)/gm,`<span style="background-color:#fa00a0;color:#000000">$1</span>`)
        block=block.replaceAll(/([%][%][%][%])/gm,`<br /><div style="text-align: center;color:ff7f3f">%%%%</div><br /><br />`);
        return block;
    }
    speech_bubble(txt,mainNB,speaker,colors){
        return`<div style="${mainNB?`text-align:left; margin: 0 auto 0 0;`:
        `text-align:right; margin: 0 0 0 auto;`} background-color:${colors[1]};
        border:solid;padding:3; border-radius:35px; width:fit-content;min-width:20vw !important;max-width:85vw;  ">
        <div style="font-size:2.5vh; padding-left:25;padding-right:25;">${speaker}</div>
        <div style="padding-${mainNB?'left':'right'}: 15; color:${colors[0]}">${txt}</div>
        </div>`
    }
    spc(txt,internal_data_flag){

        const speaker_regex = txt.match(/\w+[:][:]/gm);
        const emoji_regex = txt.match(/[$][E][\w]*[:]/gm);
        if(emoji_regex){
            console.log(emoji_regex);
            for(const match of emoji_regex){
            let key = match.slice(2,emoji_regex.indexOf(":"));
            let emoji = emoji_map[key];
            console.log(key,emoji);
            console.log(txt);
            txt=txt.replace(match, emoji);
            console.log(txt);
            }
        }

        switch(txt[0]){
            case "\"": 
                if(internal_data_flag){
                    return `<span style="background-color:${this.background_colors[0]}; color:${this.foreground_colors[0]}">${txt}</span>`;
                }
                if(speaker_regex){
                    let key = speaker_regex[0].slice(0,speaker_regex.indexOf(":")-1);
                    //console.log("key is ",key,speaker_regex)
                    const speaker = this.get_speaker_with_title(key);
                    const mainFlag = speaker== defaultnarrator.current;
                    const dialouge = txt[0]+txt.slice(txt.indexOf("::")+2)
                    const d = `<span style="background-color:inherit;">${dialouge}</span>`
                    const colors = mainFlag? [this.foreground_colors[0],this.background_colors[0]]:[this.foreground_colors[1],this.background_colors[1]];
                    return text_div(d,mainFlag,speaker,colors);
                }
                return `<span style="background-color:inherit;">${txt}</span>`;
            case "\'": 
            if(internal_data_flag){
                return `<span style="background-color:${this.background_colors[2]}; color:${this.foreground_colors[1]}">${txt}</span>`;
            }
            if(speaker_regex){
                let key = speaker_regex[0].slice(0,speaker_regex.indexOf(":")-1);
                    const speaker = this.get_speaker_with_title(key);
                    const mainFlag = speaker== defaultnarrator.current;
                    const dialouge = txt[0]+txt.slice(txt.indexOf("::")+2)
                    const colors = mainFlag? [this.foreground_colors[1],this.background_colors[2]]:[this.foreground_colors[1],this.background_colors[3]];
                    const d = `<span style="background-color:inherit;">${dialouge}</span>`
                    return this.speech_bubble(d,mainFlag,speaker,colors);
            }else{
                const speaker= defaultnarrator.current;
                const colors = [this.foreground_colors[1],this.background_color[2]];
                const d = `<span style="background-color:inherit;">${txt}</span>`
                return this.speech_bubble(d,true,speaker,colors)

            }
            case "\~": return `<span style="background-color:inherit; color:${this.description_color};">${txt}</span>`;//description
            case "\*": return `<span style="background-color:inherit; color:${this.action_color};">${txt}</span>`;//action
            case "\`": return `<code style="background-color:#4f4f4f;  color:${this.terminal_color};";>${txt}</code>`;//terminal
           
        }
    }
    get_speaker_with_title(key){
        let current;
        if(key.includes("__")){
            const [k1,k2]=[key.slice(0,key.indexOf("__")),key.slice(key.indexOf("__")+2)]
            current = speakers["___"](k1,k2);
        }else if(key.includes("_")){
            const [k1,k2]=[key.slice(0,key.indexOf("_")),key.slice(key.indexOf("_"))]
            current = speakers["__"](k1,k2);
        }
        else{
            current = speakers[key];
    
        }
        return current;
    }

    async transform_to_md(cwd,callback){
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
            data=`<html><meta charset="UTF-8"><body style="background-color:${this.background_colors[4]}; ${blocks? `font-size:3vh;display:flex;flex-flow:column nowrap;"`:''} >${data}</body></html>`
            data=data.replace(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
            callback(null,data);
        })        
    }
}
module.exports=MDX_PARSER





