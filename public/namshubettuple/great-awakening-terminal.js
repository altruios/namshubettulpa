//not finished - once the mdx parser is upgrade and everything is using a class properly - this can target the page accurately - and interface with the parser directly
let last_screen=[];
const screen = document.getElementById("key")
screen.style.display="block";
const do_to_co=(val,o_r,n_r)=>(val - o_r[0]) * (n_r[1] - n_r[0]) / (o_r[1] - o_r[0]) + n_r[0]
const pad = (st,n,pd)=>{
    while(st.length<n){
        st=pd+st
    }
    return st
}
const wait_time=248;
const History = (node)=>{
    //make an array of nodes , removed from the DOM with eventlisteners preserved
    return Array.from(node.children).map(child=>child.parentElement.removeChild(child));
}
class state{
    constructor(){
        this.state={
            color:{
            speech:{fg:"#000000",bg:"#FFFFFF"},
        
            thought:{fg:"#000000",bg:"#FFFFFF"},

            description:{fg:"#000000",bg:"#FFFFFF"},

            action:{fg:"#000000",bg:"#FFFFFF"},

            code:{fg:"#000000",bg:"#FFFFFF"},
            },
            size:{
                speech:{text:"5",space:"70vh"},
           
                thought:{text:"5",space:"70vh"},
           
                description:{text:"5",space:"70vh"},
           
                action:{text:"5",space:"70vh"},
           
                code:{text:"5",space:"70vh"},
            }
        }
    }

    update_parser_state(typeflag,accessflag,af2,prop){
        this.state[typeflag][accessflag][af2]=prop; //prop is always a string
        console.log(typeflag,accessflag,af2,prop);
        console.log(this.state);
    }
    update(){
        const options ={
          
                method:"POST",

            
            body: JSON.stringify(this.state)
        } 
        fetch("/parer_request",options)
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data);
                console.log("to - do - target based on input, change on screen - so it parses");
        });
    }
}
const PMDXS = new state();
class terminal{
    constructor(div){
        this.wait_time=345;
        this.pw=12345;
        this.pw2=67890;
        this.lpw=this.pw;
        this.accessed=false;
        this.accessed2=false;
        this.attempts=0;
        this.screen=div;
        this.history=[];
        this._input=null;
    }
    get_attempts(){return this.attempts}
    scroll_text(nodes){
        
        nodes?nodes.forEach((n,i)=>setTimeout(()=>this.display_text(n),wait_time*i)):null;        
    }
    display_text(ton){
        if(typeof ton!="string"){   
            this.screen.appendChild(ton);
            return;
        }
        const text = document.createElement('text')
        text.innerText=ton //text or nodes if not node then text
        this.screen.appendChild(text)
    }
    clear_screen(){
        this.history.push(History(screen))
    }    
    previous_screen(){
        const target = this.history.pop()
        this.page(target);
    }

    terminal_fn(cmd,pages){
        this.set_input();
        const target = pages[cmd];
        !target?this.unhappy_path():this.page(pages[cmd])
    }
    set_input(){
        this._input=this.get_input();
    }
    input(cmdlist,nodes){
        const input = document.createElement("input");
        const pages = cmdlist.reduce((acc,x,i)=>{
            acc[x]=nodes[i];
            return acc
        },{})
        input.style.color='green';
        input.style.backgroundColor='inherit';
        input.style.border="none";
        input.id="input";
        input.addEventListener('keydown',(event)=>{
            if(event.key!="Enter"){return}
            try{
            this.terminal_fn(input.value,pages)
            }catch{
                this.unhappy_path();
            }
        })
        return labeled_div("$:", input);
    
    }
    page(nodes){
        this.clear_screen()
        this.scroll_text(nodes);
    }
    unhappy_path(){
        this.get_input().value='';
        if(this.attempts>1) {this.screen.parentElement.removeChild(this.screen); return}
        else if(!this.accessed||(this.accessed&&!this.accessed2)){
            this.page(wrong_password_screen);

            this.attempts+=1;
            return
        }
        
    }
    get_input(){
        return document.getElementById('input')
    }
    increase_access(){
        if(!this.accessed){
            this.accessed=true;
        }else if(!this.accessed2){
            this.accessed2=true;
        }
    }
    parser_access(elementType, ){

    }
};
const TERMINAL = new terminal(screen);



const labeled_div = (label,inp)=>{
    const div = document.createElement("div")
    div.innerText=label;
    div.appendChild(inp);
    return div
}
    
const option = (typeflag,accessflag)=>{
    const option_div = document.createElement("div");
    console.log("option",typeflag,accessflag);
    let options = {
        root: TERMINAL.screen,
        rootMargin: '0px',
        threshold: 1.0
      }
    switch(typeflag.toLowerCase()){
        case "size":
            const size_sleeve = document.createElement("div");
            const inner_option = document.createElement('input');
            inner_option.type="range";
            inner_option.min="1"
            inner_option.max="100";
            let size_cases = ["speech","thought","action","description","code"];
            console.log(accessflag,"is target num")
            let target = size_cases[accessflag-1];
            inner_option.id = `size-${target}`
            console.log("target is ,",target)
            inner_option.addEventListener("change",(e)=>{
                PMDXS.update_parser_state(typeflag,target,"text-size",e.target.value);
            })

            size_sleeve.appendChild(labeled_div(target,inner_option));
            option_div.appendChild(size_sleeve);

        break;
        case "color":
            option_div.style.display="flex";
            option_div.style.border="inset";
            console.log("case color",accessflag)
            const red_input = document.createElement('input');
            red_input.type="range";
            red_input.min="1"
            red_input.max="255";
            const blue_input = red_input.cloneNode()
            const green_input = red_input.cloneNode()
            const fg_color_nodes = [["red",red_input],["blue",blue_input],["green",green_input]];
            const bg_color_nodes = [["red",red_input.cloneNode()],["blue",blue_input.cloneNode()],["green",green_input.cloneNode()]];
            
            //give proper ids
            fg_color_nodes.forEach((c,i)=>{
                c[1].id =`color-${accessflag}-fg-${c[0]}`
            })            
            bg_color_nodes.forEach((c,i)=>{
                c[1].id =`color-${accessflag}-bg-${c[0]}`
            })

            const input_drawer=labeled_div(accessflag,document.createElement("div"));
            input_drawer.id=`${typeflag}-${accessflag}`
            //input_drawer.style.display="flex";
            const fg_input_drawer=labeled_div("foreground: ",document.createElement("div"));
            const bg_input_drawer=labeled_div("background: ",document.createElement("div"));
            fg_input_drawer.style.display="flex";
            bg_input_drawer.style.display="flex";

            option_div.appendChild(input_drawer);
            input_drawer.appendChild(fg_input_drawer);
            input_drawer.appendChild(bg_input_drawer);
            console.log(input_drawer,"in input drawer")
            const drawer_colors = [
                ...fg_color_nodes.map(color=>labeled_div(color[0],color[1])),
                ...bg_color_nodes.map(color=>labeled_div(color[0],color[1]))]
            drawer_colors.forEach((dc,i)=>{
                const inp = Array.from(dc.children)[0];
                const t_input_drawer = inp.id.includes("fg")?fg_input_drawer:bg_input_drawer;
                t_input_drawer.appendChild(dc);
                dc.addEventListener("change",(e)=>{
                    let cases = ["red","blue","green"];
                    let fb_or_bg_s = e.target.id.includes("fg")?"fg":"bg"
                    let target = PMDXS.state[typeflag][accessflag][fb_or_bg_s]
                    cases.forEach((c,i)=>{
                        let p1=i*2+1;// 1, 3,5
                        let p2=p1+2;//3,5,7
                        if(e.target.id.includes(c)){
                            //transform to hex
                            const n = pad(e.target.value.toString(16));
                            //splice it in
                            target = `${target.slice(0,p1)}${n}${target.slice(p2)}`
                        }                       
                    })
                    PMDXS.update_parser_state(typeflag,accessflag,fb_or_bg_s,target);
            
                })})
            break;
        case "submit":
                const sub_btn = document.createElement("button");
                sub_btn.id="SUBMIT"
                sub_btn.addEventListener('click',()=>{
                    PMDXS.update();
                })
                sub_btn.innerText = "Submit"
                const drawr_div = document.createElement("div")
                drawr_div.style.display="flex"
                drawr_div.appendChild(sub_btn);
                option_div.appendChild(drawr_div);
            break;
        case "back":
            const btn = document.createElement('button');
            btn.innerText="back";
            btn.addEventListener("click",()=>{
                TERMINAL.previous_screen();
            })
            option_div.appendChild(btn)
        break;
        case "next":
            option_div.innerText="~~~"
            const callback= (ml,o)=>{
                for(const m of ml){
                    console.log(m);
                    if(m.isIntersecting){
                        console.log("yay!")
                        setTimeout(()=>{
                            TERMINAL.page(accessflag)
                        },TERMINAL.wait_time*4);
                    }
                }
            }  
            let observer = new IntersectionObserver(callback, options); 
            observer.observe(option_div);
            break;
        case "fn":
            option_div.innerText="~~~"
            const callback2= (ml,o)=>ml.forEach(m=>(m.isIntersecting)?accessflag():null)
            let observer2 = new IntersectionObserver(callback2, options);
            observer2.observe(option_div);

            }

    
    return option_div;
}
const color_access_nodes=[
    option("color","speech"),
    option("color","thought"),
    option("color","action"),
    option("color","description"),
    option("color","code"),
    option("submit"),
    option("back")
]
const size_access_nodes=[
    "access size",
    option("size",1),
    option("size",2),
    option("size",3),
    option("size",4),
    option("size",5),
    option("submit"),

    option("back"),
]
const under_construction_access_nodes=[
    "under construction",
    option("back")
]
const cmdlist=["color","size","edit","exit"]

const good_bye_nodes = [
    "ending session...",
    "stability at 78%\n",
    "Safe shutdown engaged\n\n",
    "Algera Released",
    option("next",null)
]

const access_nodes2 = [
    ...cmdlist.map(x=>x+" "),
    "\n",
    TERMINAL.input(cmdlist,[color_access_nodes,size_access_nodes,under_construction_access_nodes,good_bye_nodes]),
    option("fn",()=>TERMINAL.get_input().value=""),

]
const access_nodes = [
    option("fn",()=>TERMINAL.increase_access()),
    "identity validated... ",
    "Just a reminder: don't die too often\n\n",
    "admin_rights_granted:\n",
    option("next", access_nodes2)
]



const boot_up_nodes = [
    option("fn",()=>TERMINAL.increase_access()),
    "/",
    "/global/",
    "/regions/",
    "sovereign/\n",
    "downloading ...\n",
    ".",".",".\n",
    "updating ...\n",
    ".",".",".\n",
    "./scan_identity.sh\n",
    "new face detected\n",
    "./new_face.sh\n",
    "verification code:",
    TERMINAL.input([TERMINAL.pw2],[access_nodes]),
    

]
const wrong_password_screen = [
    "Error:\n",
    option("fn",()=>{
        const message = document.createElement("text")
        message.innerText='wrong password '+TERMINAL.get_attempts()+ ' tried out of 3';
        TERMINAL.scroll_text([message])
    }),
    TERMINAL.input([TERMINAL.pw,TERMINAL.pw2],[boot_up_nodes,access_nodes]),
    option("fn",()=>TERMINAL.get_input().value=""),
]
const starting_nodes = [
    "password:",
    TERMINAL.input([TERMINAL.pw],[boot_up_nodes])
]

TERMINAL.scroll_text(starting_nodes);