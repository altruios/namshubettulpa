const speakers =require('./speakermap.js');
const defaultnarrator = {current:speakers.M}
const mdx_parser=(text)=>{
    const data = get_mdx_data(text);
    if(data.length<100) return null;
    const blocks = seprate_blocks(data);
    let blockstr=`<block style="background-color:inherit; width:97vw;display:flex;flex-flow:column nowrap;align-items:start;margin:auto 0 auto 0; max-width:1170;align-self:center;">`
    for(let i=0;i<blocks.length;i++){
        blockstr+=mdx_block_parser(blocks[i],defaultnarrator)
    }
    blockstr+="</block>"
    return blockstr;
}
const get_mdx_data=(text)=>{
    const blockstart = text.indexOf("{");
    const blockend = text.lastIndexOf("}");
    const block = text.slice(blockstart,blockend+1);
    return block;
}
const seprate_blocks=(data)=>{
    let token_maker = "";
    const delimiters="\"\'\~\`\*";
    const delimiters_stack =[];
    blocks = data.split("").reduce((acc,char,i)=>{
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
const get_speaker_with_title=(key)=>{
    let current;
    if(key.includes("_")){
        const [k1,k2]=[key.slice(0,key.indexOf("_")),key.slice(key.indexOf("_"))]
        current = speakers["__"](k1,k2);
    }else{
        current = speakers[key];
    }
    return current;
}

const mdx_block_parser = (block,dfn)=>{
    let ref=block;
    const regex_settings = ref.match(/^[m][n][:](.*)/gm)
    block = block.replace(regex_settings,"")
    let settings=dfn.current;
    if(regex_settings!=null &&regex_settings.length!=0){
        const key=regex_settings[0].slice(regex_settings[0].indexOf(":")+1);
        const current = get_speaker_with_title(key);
        dfn.current=current;
        settings=current;
    }
    const pw = ref.match(/\`([^`]*)\`/gm)||[];
    pw.forEach(r=>ref=ref.replace(r,""))
    const aw = ref.match(/\*([^*]*)\*/gm)||[];
    aw.forEach(r=>ref=ref.replace(r,""))
    const dw = ref.match(/\~([^~]*)\~/gm)||[];
    dw.forEach(r=>ref=ref.replace(r,""))
    const sw = ref.match(/\"([^"]*)\"/gm)||[];
    sw.forEach(r=>ref=ref.replace(r,""))
    const tw = ref.match(/\'([^']*)\'/gm)||[];
    tw.forEach(r=>ref=ref.replace(r,""));
    const scp=(txt,internal_data_flag)=>{
        console.log(txt,"is raw text")
        const text_div =(txt,mainNB,speaker,colors)=> `
            <div style="${mainNB?`text-align:left; background-color:${colors[0]}; margin: 0 auto 0 0;`:
                `text-align:right; background-color:${colors[1]}; margin: 0 0 0 auto;`} 
                border:solid;padding:3; border-radius:35px; width:fit-content;min-width:20vw !important;max-width:85vw;  ">
                <div style="font-size:2.5vh; padding-left:25;padding-right:25;">${speaker}</div>
                <div style="padding-${mainNB?'left':'right'}: 15">${txt}</div>
                </div>`
        const speaker_regex = txt.match(/\w+[:][:]/gm);
        const bg_colors=["#248bf5","#e5e5ea","#af202f","#fffff"]
        const fg_colors=["#df80af","#af1fa0","#00d030","#00000"]
        switch(txt[0]){
            case "\"": 
                if(internal_data_flag){
                    return `<span style="background-color:${bg_colors[0]}; color:${fg_colors[0]}">${txt}</span>`;
                }
                if(speaker_regex){
                    let key = speaker_regex[0].slice(0,speaker_regex.indexOf(":")-1);
                    const speaker = get_speaker_with_title(key);
                    const mainFlag = speaker== defaultnarrator.current;
                    const dialouge = txt[0]+txt.slice(txt.indexOf("::")+2)
                    const d = `<span style="background-color:inherit; color:${fg_colors[0]}">${dialouge}</span>`
                    return text_div(d,mainFlag,speaker,[bg_colors[0],bg_colors[1]]);
                }
                return `<span style="background-color:inherit; color:${fg_colors[0]}">${txt}</span>`;
            case "\'": 
            if(internal_data_flag){
                return `<span style="background-color:${bg_colors[2]}; color:${fg_colors[2]}">${txt}</span>`;
            }
            if(speaker_regex){
                let key = speaker_regex[0].slice(0,speaker_regex.indexOf(":")-1);
                    const speaker = get_speaker_with_title(key);
                    const mainFlag = speaker== defaultnarrator.current;
                    const dialouge = txt[0]+txt.slice(txt.indexOf("::")+2)
                    const colors = mainFlag? [bg_colors[2],bg_colors[3]]:[bg_colors[0],bg_colors[1]];
                    const d = `<span style="background-color:inherit; color:${fg_colors[2]}">${dialouge}</span>`
                    return text_div(d,mainFlag,speaker,colors);
            }else{
                const speaker= defaultnarrator.current;
                const colors = [bg_colors[2],bg_colors[3]];
                const d = `<span style="background-color:inherit; color:${fg_colors[2]}">${txt}</span>`
                return text_div(d,true,speaker,colors)

            }
            case "\~": return `<span style="background-color:inherit; color:#afaf00">${txt}</span>`;
            case "\*": return `<span style="background-color:inherit; color:#44aaff">${txt}</span>`;
            case "\`": return `<code style="background-color:#4f4f4f;  color:#6a6a6a;";>${txt}</code>`;
           
        }
    }
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
module.exports=mdx_parser;