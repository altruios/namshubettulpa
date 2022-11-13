const emoji_map= new (function(){
    this.shrug='\u{1F937}';
    this.footprints='\u{1F463}'
    this['Right Pointing Backhand Index']='\u{1F449}';
    this.follow=`${this.footprints}\u{1F449}`;
    this.eyebrow='\u{1F928}';
    this.redx='\u{274C}'
    this.didnotmeet=`${this.eyebrow}${this.redx}\u{1F9D1}\u{200D}\u{1F91D}\u{200D}\u{1F9D1}`;
    this.mydeath= `${this.follow} \u{1F480}`
    this.hurryup='\u{1F3C3}\u{2B06}'
    this.down='\u{2935}';
    this.yes='\u{2714}'
    this.eyes='\u{1F440}'
    this.around='\u{1F503}'
    this.dontlookbehind=`${this.eyes}${this.redx}${this.around}`
    this.fallapart='\u{23F2}\u{1F3C3}\u{200D}\u{2642}\u{FE0F}\u{2B07}'
    this.staylow='\u{2699}\u{2B07}'
    this.overtheedge='\u{2699}\u{2935}\u{1FA82}\u{1F4FF}'
})()

module.exports = emoji_map