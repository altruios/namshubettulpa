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
"NT:: 📢📣🗣️💬 > 🫵👁️‍🗨️🔎"
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
~Self~.hands.get_held().reshape(~orb~)
`
~The fog reflected the light from the familiar blue orb, surrounding her in a glow~
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
~And nothing happened, for a moment Martha didn't understand...
Then she heard the howl of the wind outside~
'M::Oh... right.'
~In her haste, she changed not just her body's gravity, but since the room was part of her identity now...~
`
~Self~.~Martha~.~gravity~+=~Earth~.~gravity~
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
~At least she was heading that direction already...~
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
~Martha could have said 'no shit, sherlock', yet she opted for a silent eye roll...
While at the same time taking in the horror of Rossin's appearance.
His face had one huge scar running through one eye, and he was clutching the stump to keep it from bleeding~
"M::Can I just... 
Heal you?"
*A rumbling grew from below her*
~Something that distinctly felt: other. 
A growl and a storm~
*Rossin shook his head*
'R::That is a losing game.'
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
'M::We should get away from that things first...'
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
~If she could choose what was part of her, like with this room, or the awkwardly crushed concrete around it...~
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
A small seed of doubt grew inside her.
Everything she could think of would fit inside this void.
No matter how much she added, she would never reach it's boundary~
*She stopped adding anything to her shell*
~She felt the void rip bits of the shell into itself, small chunks disappearing at a time~
*Martha sat down inside the room*
~...That was also herself, according to herself~
"M::Okay, just need to start eating it. 
Need to be able to eat it..."
`
function *consume_you_instead*(self, you){
    Try{
        you.preventDefault();
        self.*consume*(you);
    }catch(e){
        e
    }
}
~Self~.on(*consumed*, (consumer)=>*consume_you_instead*(~Self~,consumer))
`
'R::Dangerously simple...
But that should work...'
*The void grew tangibly a part of her*
~Small flickers of uno the card game ran though Martha's mind - times she used the reverse card~
'M::How does one touch a void?'
~The void existed at the outer most part of her shell now, eating itself into nothingness, instead of just space.
It's energy becoming part of her, Martha no longer felt hungry~
*The void shrank, and Martha could reach beyond*
~The void was hiding an inky sludge surrounding her~
*She felt the shell ripping apart*
~This sludge was not trying to eat her, but destroy her~
`
~Self~.on(*damage*, (attacker)=>*consume_you_instead*(~Self~,attacker))
`
*Old memories attached to Martha*
~An unease fell over her, dark memories returned in fragments~
*Martha, her shell, was violently expelled through the sludge out from inside this creature*
~Instead of being in the stomach of that creature, that creature became scattered fragments within her.
Whole from from strange perspective, but from Martha's...~
~She was back in that strange perspective of herself, falling through a fractal hole witnessing memories.
She was both her body alone falling though that space, and her within that room surrounded by concrete...
And all combinations between, able to see, despite not having eyes around her shell.
The fractal hole was both a shape of her shell, and a shape of anything making up that shell.
The memories witnessed were however she viewed herself.
One impossible image was her several mile diameter shell of cityscape on a swing set, being pushed by...~
~Where there once was blank nothingness, shameful memories came to fill in those spaces. 
Memories taken by that creature, hidden away by Rossin, most still covered in a sludge...
But distinctly inside her~
~Martha realized why Rossin said it would take months...
The sheer scope of memories this thing has taken...
Even just going through them all...~
'R::The sludge is the excrement, there is something crawling around inside...
The more you clear away the weaker it will be, it is drawing from your memories.'
~Even so: there were still blank spots not being filled in.
Spots Rossin must have taken residence in~
*Martha, in the comfort of her self constructed room, falling in herself, looked to Rossin*
"M::It's not enough, it's just... 
Bigger."
~Rossin nodded as he reluctantly expected this~

'R::Give me your hand.'
"M::What?"
*Rossin stopped covering his wound and reached out with is one working arm*
'R::Here.'
~His hand shook a bit, and he smiled confidently, as much he could~
*Martha took Rossin's hand; he bit it*
"M::What are you doing?"
'R::Evening the ah-'
~He did not have time to finish~
*Rossin was ripped into the floorboards, the walls, every direction out of the room*
~Parts of him flying through the entire surface of the floor: sucked like dust into a vacuum.
He was gone~
"M::Rossin!"
~Silence~
*Martha ran to the compass that had slid across the floor, and picked it up*
~A yellow arrow grew from it, only it wasn't an arrow...
It was an orb: pointing out to all directions~
*She toss it on the floor*
~Trying to summon Rossin again~
*As the compass hit the floor, it made a horrible electrical noise and shattered.
Martha stood there for a moment, then knelt on her knees*
~He was gone.
And she felt...~
'M::More focused?'
~More herself, sad but...~
~Through the window, she saw outside her shell the wall lined with her memories complete.
Parts, the less pleasant memories covered in that sludge~
'M::It is just the manifestation of that thing in your head, it uses those memories, it is not those memories.'
*Martha turned*
~No, that was in her voice... 
she thought...~
'M::Well a part of him is me now...'
*Martha sat up*
'M::As is that thing, remember, feast your mind on it.'
*Martha looked out the window at herself*
~There was so much sludge...~
'M::Lest it eat you...'
*Martha steered her shell to the closest sludge, and started eating*
~Absorbing it into her, covering her shell~ 
~The memory previously covered by the sludge shown brightly. 
A scene of her pushing her older brother down the hill when she was seven, his skull had fractured when he crashed into the street at the bottom.
She was laughing, long after he was still, not fully understanding he was hurt~
'M::Oh...'
*Martha breathed out a sigh*
'M::None of these memories I want, do I...'
~She suddenly understood why a quarantine of those memories was preferable than reintegration~
*Martha looked out the window, looking up that fractal well*
~There was more sludge than clear memories~
}
{
%%%%
}
{
mn:RXD
}
{
~A twig, a shoelace, and a bit of careful planning, The Redlux had their sample chainsaw~
*Ada held the string, at the end the chainsaw tried to fly sideways*
`
chainsaw{
    onCut(~ref~): for part of ~ref~: ~ref~=exe copy(~this~)
    onGravity(*e*): ignoreDefault(*e*) | exe ~this~.pathFind(~this.~seen(chainsaws),~this.~neighbor(chainsaws))
    pathFind(seen,neighbors): todo - boids like path finding
    }
`
~The problem, there wasn't any reference to a parent object. 
If there had been, it would be easy, it was instead copying a new instance of itself.
Meaning we couldn't modify it to modify any other chainsaw, each was independent~
'AD_D::A chainsaw that cuts only chainsaws?
We could modify this one here, start to disable them.'
'J_D::It would get cut into ribbons, swarm physics.'
*Jochek pointed around them*
~Chainsaws were flying sideways through the storm. 
The Way Out had only grown in size under the bombardment of chainsaws~
'AD_D::If we update the on cut...'
`
function seek = (~Closest~) => ~this~.*velocity*.set(~Closest~.GetPosition())
function pathFind= ()=>{
            exe ~seek(~ref~.pathFind.findClosest());
            setTimeout(()=>{
                ~ref~.on=false,
                ~ref~.gravity=1,
            },
            ~1 minute~);
        }
function onCut = (~ref~)=>{
    if(~ref~ typeof ~chainsaw~){
        
        for part of ~ref~{
            ~ref~=exe copy(~ref~);
        }
        ~ref~.pathFind=()=>pathFind
        ~ref~.onCut=~this~.onCut;
    }
}
object.modify(~Self~.get_held(), ~onCut~, onCut)
`
'AD_D::That should just work, right? 
it copies the chainsaws it cuts, seeks out new chainsaws and also copies over that on cut function...
then they fall to the ground'
'D_D::Looks good to me.'
~Between lenny and jochek, we were getting an estimate of how many chainsaws might be flying~
'RXD::It still needs an advantage to propagate'
'AD_D::The other chainsaws are flying around a center, these will seek them out...
Those other chainsaws are avoiding each other...'
~It was convincing, and we were getting hungry, with hunger came fewer options~
'RXD::This one will not stop though...'
`
object.modify(~Self~.get_held(), ~pathFind~,pathFind)
`
*The chainsaw alternated swinging left and right*
~ tied to the string attached to a stick in the ground, it resembled an over eager dog, unbothered by the frozen wind.~
*Ada let it loose.
It flew forward in a rush towards a passing chainsaw ripping it in half, the cut chainsaw - reforming into two smaller pieces - flew in opposite directions towards other chainsaws*
~A short minute later the chainsaws started to fall, and Ada released a breath she was holding, unaware for how long.
The chainsaws fell into a circular expanding pattern, Lenny suspected it looked like a growing fungus from above~
*Ada looked at The Way Out*
~Which was much too large to move~
{
%%%%
}
{
~Two hours later only the snow was blowing, covering a glistening metal field of chainsaw blades.
They waited another hour to be sure, all the while contemplating how to make The Way Out smaller...
The issue was - no matter what they did - it would grow~
~The Way Out towered twenty feet tall~
*Ada poked it with a stick, which shrunk inside out as Ada let go of it*
~Her hand trembled, and every breath was visible in the air~
'RXD::Random guessing is not going to get us there...'
'AD__D::Not if we are lucky....'
~They could get to fall in such a way...~
*The Way out shifted, but still grew*
~Ada had food for herself - which was split among us in the cave.
Jochek, Lenny, and Dana have not eaten anything for a while. 
Lenny's old and thin body in particular was struggling with the cold; he had given his jacket to Ada~
'RXD::We might need to call it quits.'
~If we were to stay much longer...~
'RXD::Escape through the link while we can, give flanagan an update.'
~Ada, and Lenny agreed, Jochek was on the fence, and Dana...
She was still getting used to us~
'L_D::If the link is safe.'
~Lenny would test it first - giving Dana control over the frail body he left - traveling along the link he arrived safely in the body he left in New York.
He was still in the car in the parking garage outside the airport, Jochek's old body next to him, unresponsive.
A moment later Jochek joined him~
*Jochek squeezed his hand*
'J_D::See, back safe.'
*She pinched his bicep, then exited the car*
"J_D::Come on, let's find Ada and Dana new bodies.
A&D? 
Adana?"
'A_D::You are not shipping us!'
~Dana was paying more attention to the fallen cab driver, laying face first in the snow~
'D_D::What about these bodies here?'
'L_D::We should walk them to...'
~Dana took control of Jochek's discarded vessel, retaining control of the passenger Lenny just gave her.
Their motions became synchronized, and while trying to right the cab-driver, the passenger fell into the snow.~
*Dana rolled in the snow until her two bodies were in rough alignment*
~Dana found she could control one at a time, with a focus~
'D_D::I will walk them into town...'
*Lenny took out his phone and started the call to Flanagan*
~To let them know The Way Out was stuck in Romania~
~Jochek would be a while, Ada had particular tastes, Dana it seemed would be less picky~
}

# [To stab at thee](to-stab-at-thee.md)
