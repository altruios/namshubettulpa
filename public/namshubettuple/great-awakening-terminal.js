//not finished - once the mdx parser is upgrade and everything is using a class properly - this can target the page accurately - and interface with the parser directly
let last_screen=[];
const screen = document.getElementById("key")

const wait_time=248;
const History = (node)=>{
    //make an array of nodes , removed from the DOM with eventlisteners preserved
    return Array.from(node.children).map(child=>child.parentElement.removeChild(child));
}
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
            const inner_option = document.createElement('input');
            inner_option.type="range";
            inner_option.min="1"
            inner_option.max="100";
            switch(accessflag){
                case 1:
                    inner_option.addEventListener("change",(event)=>{
                        console.log("change size of speech")
                    })
                    option_div.appendChild(inner_option);
                    break;
                case 2:
                    inner_option.addEventListener("change",(event)=>{
                        console.log("change size of thought")
                    })
                    option_div.appendChild(inner_option);
                    break;
                case 3:
                    inner_option.addEventListener("change",(event)=>{
                        console.log("change size of action")
                    })
                    option_div.appendChild(inner_option);
                    break;
                case 4:
                    inner_option.addEventListener("change",(event)=>{
                        console.log("change size of description")
                    })
                    option_div.appendChild(inner_option);
                    break;
                case 5:
                    inner_option.addEventListener("change",(event)=>{
                        console.log("change size of code")
                    })
                    option_div.appendChild(inner_option);
                    break;
            }
        break;
        case "color":
            console.log("case color",accessflag)
            const red_input = document.createElement('input');
            red_input.type="range";
            red_input.min="1"
            red_input.max="100";
            const blue_input = red_input.cloneNode()
            const green_input = red_input.cloneNode()

            switch(accessflag){
                case "speech":
                    red_input.addEventListener("change",(event)=>{
                        console.log("change color of speech red")
                    })
                    blue_input.addEventListener("change",(event)=>{
                            console.log("change color of speech green")
                        })
                    green_input.addEventListener("change",(event)=>{
                            console.log("change color of speech blue")
                        })
                    break;
                    }
            const input_drawer=labeled_div(accessflag,document.createElement("div"));
            option_div.appendChild(input_drawer);
            console.log(input_drawer,"in input drawer")

            input_drawer.appendChild(labeled_div("red",red_input));
            input_drawer.appendChild(labeled_div("blue",blue_input));
            input_drawer.appendChild(labeled_div("green",green_input));
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
//            option_div.addEventListener("on",()=>TERMINAL.page(accessflag))
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
    option("back")
]
const size_access_nodes=[
    "access size",
    option("size",1),
    option("size",2),
    option("size",3),
    option("size",4),
    option("size",5),
    
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