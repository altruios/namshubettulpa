const mdx_parser=(text)=>{
    const data = get_mdx_data(text);
    if(data.length<100) return null;
    const blocks = seprate_blocks(data);
    console.log("blocks length",blocks.length);
    let blockstr=`<block style="background-color:inherit">`
    blocks.forEach(block=>blockstr+=mdx_block_parser(block));
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


const mdx_block_parser = (block)=>{
    let ref=block;
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
    const scp=(txt,nlflag)=>{
        console.log(txt[0],"are txt 0 values");
        console.log(txt.slice(0,20),"is sample");
        switch(txt[0]){
            case "\"": return `<span style="background-color:inherit; color:#df80af">${txt}</span>${nlflag?`<br/>`:''}`;
            case "\'": return `<span style="background-color:inherit; color:#af0000">${txt}</span>${nlflag?`<br/>`:''}`;
            case "\~": return `<span style="background-color:inherit; color:#afaf00">${txt}</span>${nlflag?`<br/>`:''}`;
            case "\*": return `<span style="background-color:inherit; color:#44aaff">${txt}</span>${nlflag?`<br/>`:''}`;
            case "\`": return `<pre style="background-color:#4f4f4f;  color:#6a6a6a">${txt}</pre>`;
        }
    }
    const lines_types = [...sw,...tw,...aw,...dw];

    const transforms_words = lines_types.map(x=>{
        return {
            o:x,
            t:scp(x,true),
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
        console.log(kw.length,"is kwleng");; 
        const internal_data_matches_unique = internal_data_matches.reduce((acc,item)=>{
            if(!acc.includes(item))acc.push(item)
            return acc
            },[])

        internal_data_matches_unique.forEach(match=>{
            obj.t=obj.t.replaceAll(match,scp(match))
        })    
        obj.t=obj.t.replaceAll(/([t][r][u][e]|[f][a][l][s][e])/gm,`<span style="color:#9953e0">$1</span>`)
        obj.t=obj.t.replaceAll(/([=][>]|[<][=]|[e][x][e]|[|][|])/gm,`<span style="color:#aa0000">$1</span>`)
        obj.t=obj.t.replaceAll(/([\s][-][\w]+)/gm,`<span style="color:#ff6f00">$1</span>`)
        obj.t=obj.t.replaceAll(/([-][-][\w][\w-]*)/gm,`<span style="color:#ff4499">$1</span>`)
        obj.t=obj.t.replaceAll(/([.][\w]+)/gm,`<span style="color:#ca7922">$1</span>`)
        

        return obj;
    })

    transforms_data = transforms_data.map(x=>{
        console.log(transforms_data)
        console.log(x,"is x");
        return {
            o:x.o,
            t:`<pre style="background-color:#4f4f4f;"><span style="background-color:inherit;color:#00ff00">${x.t}</span></pre>`
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
    
   // console.log("transofmred block,",block);
   block=block.replaceAll(/([\<][\p][\>][\<][\/][\p][\>])/gm, "")
   block=block.replaceAll(/([\^]+)/gm,`<span style="background-color:#fa00a0;color:#000000">$1</span>`)

    return block;
}
module.exports=mdx_parser;