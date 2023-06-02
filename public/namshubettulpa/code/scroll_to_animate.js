const self = document.getElementById("animate");
const clss = self.getAttribute("data-class");
const time = self.getAttribute("data-time")
const target = document.querySelector('.animate-target')
const animation_trigger = new CustomEvent("animation_trigger")
const fast_enough = 42;
const scroll_state = {
    state:0,
    is_fast_enough:false,
    checkSpeed: function(){
        this.state=checkScrollSpeed()
        this.is_fast_enough=Math.abs(this.state)>=fast_enough
    }
}    

const animation_state = {
    running:false,
    time:time,
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting && scroll_state.is_fast_enough){
            console.log("animation trigger!")
            window.dispatchEvent(animation_trigger)
        }
    })
},{threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});

var checkScrollSpeed = (function (settings){
    settings = settings || {};
    
    var lastPos, newPos, timer, delta, 
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )
    
    function clear() {
        lastPos = null;
        delta = 0;
    }
    
    clear();
    
    return function(){
        newPos = window.scrollY;
        if ( lastPos != null ) delta = newPos -  lastPos;
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
})();

window.onscroll = ()=> scroll_state.checkSpeed()
  
window.addEventListener('animation_trigger',()=>{
    target.classList.add(clss)
    if(!animation_state.running){
        animation_state.running=true;
        window.setTimeout(()=>{
            target.classList.remove(clss);
            animation_state.running=false;
        },animation_state.time)
    }
})

observer.observe(document.querySelector('.animate-target'));