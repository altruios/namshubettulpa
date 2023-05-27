function * NGen(l){
    let i=1;
    while(i<l){
        yield i
    }
}
const generator = NGen(200)
const scroll_state = {
    state:0,
    is_fast_enough:false,
    is_seen:false,
    counter: generator
}
const fast_enough = 60;
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            if(scroll_state.is_fast_enough){
                entry.target.classList.add("animate");
                console.log("should only fire when fast enough")
            }
            
        }
        else{
                 entry.target.classList.remove('animate');
            console.log("exited")
                }
        
    })

});



observer.observe(document.querySelector('.animate-target'));




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
      if ( lastPos != null ){ // && newPos < maxScroll 
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();

// listen to "scroll" event
window.onscroll = function(){
    console.log(scroll_state.state)
  scroll_state.state= checkScrollSpeed();
  scroll_state.is_fast_enough=Math.abs(scroll_state.state)>=fast_enough
  if(scroll_state.is_seen){
    scroll_state.is_seen=scroll_state.counter.next().value!=undefined

  }else{
    scroll_state.counter =NGen(10);
    scroll_state.is_seen=scroll_state.is_fast_enough
  }
};