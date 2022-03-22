const mdx_parser=(text)=>{
    const data = get_mdx_data(text);
    if(data.length<100) return null;
    const blocks = seprate_blocks(data);
    console.log("blocks length",blocks.length);
    let blockstr=""
    blocks.forEach(block=>blockstr+=mdx_block_parser(block));
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
    const aw = ref.match(/\*([^*]*)\*/gm)||[];
    aw.forEach(r=>ref=ref.replace(r,""))
    const dw = ref.match(/\~([^~]*)\~/gm)||[];
    dw.forEach(r=>ref=ref.replace(r,""))
    const sw = ref.match(/\"([^"]*)\"/gm)||[];
    sw.forEach(r=>ref=ref.replace(r,""))
    const tw = ref.match(/\'([^']*)\'/gm)||[];

    const pw = ref.match(/\`([^`]*)\`/gm)||[];
    pw.forEach(r=>ref=ref.replace(r,""))

    const cut_delimiters=["~","`","*"];
    const stylemap = {
        "\"":`#ff00ff`,
        "'":`#ff0000`,
        "\~":`#ff7744`,
        "*":`#66aaff`,
        "`":`#00ff00`
    }
    const lines_types = [...pw,...sw,...tw,...aw,...dw];
    const transforms = lines_types.map(x=>{
        return {
            o:x,
            t:`<text style="color:${stylemap[x[0]]}">${cut_delimiters.includes(x[0])?x.slice(1,x.length-1):x}</text>`,
        }
    })
    transforms.forEach((t,i,arr)=>{

        if(i>0){
            if(arr[i-1][0]=="\"" && t.o[0]=="`"){
                block=block.replace(t.o,t.t+"<br />");
            }else if(t.o[0]=="\""){
                    block=block.replace(t.o,t.t+"<br />")
                }
            else if(t.o[0]=="`"){
                block=block.replace(t.o,"<br />"+t.t+"<br />")
            }else{
                block=block.replace(t.o, t.t)
            }
        }else{
            if(t.o[0]=="`"){
                block = block.replace(t.o,t.t+"<br />")
            }else{
                block=block.replace(t.o,t.t)
            }
        }
    });
    block = '<p>'+block+"</p>"
   // console.log("transofmred block,",block);
    return block;
}
module.exports=mdx_parser;