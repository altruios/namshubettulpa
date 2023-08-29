# giving up

{
mn:K
}
{
~Kent was at Martha's side~
*He shook Martha's shoulder*
'K::No reaction.'
~She wasn't moving, not even breathing~
"K::She's not breathing!"
"FL__F::It was probably Al-tok."
"RG__JL::Who was she?"
"K::Is."
'K::Present tense'
*Kent reached down and felt for a pulse*
"NT:: 📢📣🗣️💬 > 🔎"
'K::And the look alike is dancing nonsense...'
"K::She still has a pulse"
'K::CPR, Kent? 
You going to do that?'
~He didn't have to, Martha woke with a start~
*She took in a lungful. 
Panting, she stood up*
~Martha's face was blank, but her eyes darted over each of them.
They landed on Alacira's hard stare~
~Kent saw on Alacira and Whitewater's wrists each a bail~
*Each bail rattled, glowing a white-blue*
}
{
%%%%
}
{
mn:M
}
{
~Martha first felt the sensation of falling through a cold dark fog, wind whipping around her skin.
Her struggles futile, a panic filled her, as slowly she remembered her passing out~
'M::Okay, so is this in my head?'
*She took off a sock and held it in her hand*
`
dime transform code: torch
`
~The fog reflected the light, surrounding her in a glow~
'M::That thing...'
~...Inside her head, that rossin was keeping at bay, took over...
And yet she was still here...
Somewhere in her head...
She just had to get out~
"M::ROSSIN?"
~There was no echo, no indication of any structure or walls in the distance... just a constant wind~
`
~Self~.~gravity~=0;
`
~The wind stopped, and an eerie silence blanked her~
~She breathed, and tried to calm down, knowing the monster was active and somewhere in her head...~
~She looked at herself, dressed as she was: she briefly considered if clothes were part of her identity or not, and as she did, they winked in and out of existence~
~Startled, she tried again...~
'M::It is my mind after all, I get to make up the rules...'
*She breathed in*
~She didn't know that for sure, but she figured it was a good guess, and she still felt a little hungry...~
'M::That floor, that room. 
They are part of me...'
~She concentrated on the floorboards... the room - Flanagan's study -  as an extension to herself the same way her clothes were~
*She floated in the center as the room constructed itself from her.
Floorboards, wallpaper, couches, the desk, all flew into place ripping from her regenerating skin*
"M::Okay..."
'M::Now you are in a box, you are the box...
What good did that do?'
~She was panicking less, with the thin veneer of normalcy surrounding her, she could at least breath~
`
~Self~.~gravity~=~Earth~.~gravity~
`
~And nothing happened, for a moment Martha didn't understand...~
'M::Oh... right.'
~In her haste, she changed not just her body's gravity, but since the room was part of her identity now...~
`
~self~.~Martha~.~gravity~+=~Earth~.~gravity~
`
*She landed on the floor and surveyed her surroundings* 
~Everything was quite, and Martha alone~
'M::Okay, find Rossin, then...'
*Martha started to walk, then stopped herself*
~She didn't know where Rossin was, or how to find him...~
'M::Can I just make something?'
*She picked up a lamp from off the desk*
`
const Arrow = {
    Direction:{
        pos:(0,0,0),
        set:(item)=>{
            this.pos=Normalize(
                this.pos[0]-item.pos[0],
                this.pos[1]-item.pos[1],
                this.pos[2]-item.pos[2]
            )
        }
    }
}
function find_rossin (ref)=> ref.Arrow.Direction.set(~Rossin~)
const ~Compass~ = {
    -cp G.Objects.Compass,
    Arrow,
    onHold:()=>find_rossin(this)
}
~Self~.hands.get_held().reshape(~Compass~)
`
*The lamp transformed in her hand into a compass*
~A small metal one, missing the red/black arrow and instead: a ghostly yellow arrow pierced down through Martha's hand, pointing at the floor~
'M::Of course it would be down...'
~at least she was heading that direction already...~
'M::All of my...
Room-ness?'
~She could feel the room descending...~
'M::That thing is probably down there too...'
~Martha worried that thing in the back of her head was probably down there fighting with, or eating, Rossin~
'M::Wait a minute...'
~She could have just made something to teleport her directly to Rossin~
'M::But maybe that thing is next to him...'
`
function get_rossin(ref)=>~~Rossin~.pos.set(ref.pos[0]+~Rossin~.~Height~,ref.pos[1],ref.pos[2])~
~Self~.hands.get_held().onLand{~Floor~}=>get_rossin(this);
`
*She tossed the compass to the floor, and as it landed Rossin appeared*
~His arm was missing, leaving a melted black stump at the shoulder~ 
*Rossin's working eye focused on Martha*
'R::We have a problem.'
~Martha could have said 'no shit, sherlock', yet she opted for a silent eye roll~
*A rumbling grew from below her*
~Something that distinctly felt: other. 
A growl and a storm~
*Rossin slumped to the floor, and knocked on the wood paneling*
'R::Is this you?'
~He was inspecting it, marveling~
'R::Can you give us a bit more of a buffer between that thing and us... just add more to you?'
~It was a good idea, and Martha considered for a bit.
She settled on concrete. 
Memories of pavement she walked on, generic imagined scene of construction workers pouring wet cement, freeway re-bar, brutalist homes she passed by once, all crushed altogether.
The wet cement seeped into the gaps crystallizing the shell around Martha and rossin in the room~
~She continued: the skyline of New York wrapped around her, crushing metal spires into a web of tangled construction, surrounded by an empty void~
'M::Good enough for now...'
*The rumbling grew louder*
`
~Self~.~Martha~.~Gravity-=~Self~.~Gravity~
~Self~.~Gravity~=-~Self~.~Gravity~
`
'M::Lets get away from that things first...'
"M::Got any plans..."
*Rossin shook his head*
'R::I thought we would have more time, hoped anyway...'
*He cradled his head in his one good hand*
~In her shell at the edges: martha could feel pieces being eaten away.
Bits lost to...~
'R::That void out there is...
We are in its stomach.'
~Martha could feel it...
She could think of a million things and try to fill that void...
But there wasn't a way to reach...~
'M::Reach what?'
~The waking world?
Could she just wake herself...~
*The rumbling grew and Rossin struggled to stand against the desk*
'M::Does that make this a dream?'
~Dream or not, she had to get out~
'R::It has taken over your motor cortex, vision and hearing too...'
~Martha grew her shell: with anything she could think of.
More and more she manifested things attaching to her identity and an idea struck her~
'M::If it can try to eat me, I can try to eat it.'
"M::I've got an idea..."
'R::What is it?'
"M::If it's in my mind...
Can I just: absorb it?"
~If she could choose what was part of her, like with the room, or the concrete...~
*Rossin was still for a long moment*
'R::There would be consequences, it would have a permanent foothold; you might never be rid of it...'
'M::What are my actual options?'
`
get eaten,
try to destroy/erase it,
try to quarantine it,
try to eat it
`
~Quarantine didn't work.
And if it was using parts of her mind, her thoughts and memories, to feed it's own existence...
Would absorbing this thing into her reintegrate her missing memories?
Destroying them would be less than idea...~
'M::But am I stronger than that thing?'
~They where in her mind after all, she must be...
But they were still in it's stomach: and everything she thought of herself fit within.
A small seed of doubt~


}
{
%%%%
}
{
mn:RXD
}
{

}
{
`TODO:
pov of martha's reset-3, rossin dying

the Relux/Redlux capture a small chainsaw, deconstruct it, and devise a way to solve it - killing the 'primary' chain saw probably?


`
}
# 
