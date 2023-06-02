# Debugging

{
mn:M
}
{
*Martha was falling*
~The rushing wind was all around her.
It was deafening, yet she was in a pocket. 
The island of cliff that sheared off the landscape shielded her from the wind~
~The gravity lessened as she fell, returning to a relative normal~
~She saw a darkness growing below the edge, racing towards her~
`
~Cliff~.reshape(^)...
`
*^A jolt of electricity shot through her feet and into her left hand.
She crumpled to the ground*
'M::Oh that hurt...'
~She tried to slow her breathing, and she didn't have time~
'M::Okay, I can do this...'
`
~Cliff~.~gravity~ = ^...~
`
*^Electricity shot from the earth into Martha's Side*
"M::Fuck!"
~Martha didn't know what she was doing wrong~
*Above her, the tiny dot of light winked out*
~A chill crept to her bones.
She could only hear the rushing wind in the darkness~
'M::Some light would be nice.'
*Martha took off her shoe and held it in her hand.
She took a breath*
~Bracing for the pain~
`
const ~orb~ = {
    *center*:~Self~.*center*+(10ft,10ft),
    ~color~:~blue~,
}
~Self~.hands.get_held().reshape(~orb~)
`
*Her shoe transformed in her hand, and she had to squint her eyes*
~The light was a bright blue, and was quickly growing hot~
*She stood up and released it*
~It floated in place and she turned around~
~The close wall was illuminated.
It was a blur, rushing past her.
The far wall was too dark to see from this distance~
'M::Okay, that worked, why?'
~She realized only a short moment later~
"M::Permissions..."
~This wasn't her dream, she could change things about her self, things she owned, but another's dream...~
*She took off her other shoe*
~She took a second to plan, and then...~
`
~Self~.~gravity~ = - ~Self~.~gravity~;
`
*Which sent her soaring away from the island of fallen cliff*
*The tiny ball of light zipped up to match her speed, returning to its original orbit*
~A voice boomed through the cavern, coming from deep below.
The cavern was miles across, and she could only see blackness across from her, even with the light...
Martha had the sickening thought - the image of something talking through a straw - something so massive as to be impossible to comprehend~
~And it was happy~
"AT::Oh, there you are!"
~It rumbled the cliff side reverberating to the top~
"AT::I've been looking for you, what are you doing here?"
`
const *bubble_shield* = {
    *center*:~self~.*center*,
    *radius*:*12ft*,
    ~type~:*energy*,
}
~Self~.hands.get_held().reshape(*bubble_shield*)
`
*The sock grew, turned translucent, and surrounded her: encasing around her as a bubble*
~She felt prickles of electric static dance along her skin as it passed through her~
*Below Martha, something was rising from the depths faster than she was*
`
~self~.~gravity~=~self~.gravity x 5
`
~Five times, she could handle that, she didn't know offhand how many G's a human could take~
*What was rising below caught up to her*
~It was a dark goo, a morphing blob shifting into the shapes of humans, each reaching towards her in desperation.
But the overall shape was a hand~
*Which slammed into Martha's bubble, smashing it into the cliff face.
The shield bubble burrowed up into the rock, spinning wildly before coming to a rest.
The little orb of light slowly stopped spinning from inside the perimeter*
~She hung in the air, the wind knocked out of her - feeling the effects of the increased gravity and no where to go, the bubble keeping her in place~
`
~Self~.~gravity~=0
`
~She could breath again, and after a few sharp breaths...~
*The hand poked the bubble again, wedging it deeper in the cliff face*
~As the rock crunched, Martha felt a burning sensation throughout her body, and a sudden increasing hunger~
*The hand pulled back. 
And the orb inside the bubble again settled into a stable orbit*
~Martha was starting to panic beyond rational thought, she was trapped like a rat, hungry and tired~
*A voice boomed from deep below*
"AT::I thank you."
~As nothing happened after, she waited and slowly calmed, her stomach still doing knots~
'M::Thank me, for what?'
~Did she dare ask? 
She considered her situation... 
If she said nothing~
"M::What for?"
~The voice grew closer, and then turned into a chorus.
It emanated from the shifting human shapes on the slime~
"AT::Your little needle, is now my little needle, it is just what I needed, like a gift."
'M::My needle?'
~With mounting horror she realized what he meant.
She connected that spear to every human heart besides her own~
'M::Oh fuck...'
*Al-tok tapped on the bubble, sending it deeper in the cave*
~Martha felt that burning sensation and hunger grow.
Any expenditure of the shield's energy had to come from somewhere, that somewhere was Martha~
"AT::Are you going to come out of there?"
~The voices turned over each other, a waterfall of harmonizing rasps~
"AT::Or are we going to chase through the solid dream?"
"M::I have a proposition for you..."
~She did not, but she just needed a breather to think~
~The exit was somewhere up there, could she get there, or...~
'M::The exit was a mirror, somewhere on the ground above.
This is a dream, so...'
~She took a breath an hoped she could do this~
*She took hold of her left sock*
`
~exit~= (person,Dream) => Dream.~expunge~(person)
~Mirror~ = (Dream) => ({
    ~Type~:~Hand-held~,
    ~exit~:~exit~(~Self~,Dream)
    })
~self~.hands.get_held().reshape(~Mirror~
    {~this~(~dream~)}
    ).~exit~(~self~)^
`
~Martha was relieved when the walls around her started to melt away~
"AT::Oh, we're chasing this way..."
~All went to black~
"AT::See you soon..."
*^And then the pain hit*

}
{
%%%%
}
{
mn:RX
}
{
~Behind Ada the crowd above descended towards us~    
*Jochek picked the lock and opened the door*
~Inside was an empty room, with only the light from the hall emanating in. 
In the center was a glass case, protecting a single needle lying on a purple velvet pillow~
"L_R::Is that it?"
*Ada rushed inside*
"AD_R::Inside, everyone."
~It was cold inside, and there was no light once the door shut~
*Jochek locked the door*
"D::Anyone have a light?"
*Lenny pulled out a small cellphone, flipping on the flashlight*
~We took a closer look at the needle.
It was indeed what we were looking for.
In the eye of the needle, as any of us looked closely we saw nothing through it.
Just endless nothing behind that tiny hole...~
'L_R::Glass case probably has an alarm, if not a trap.'
'AD_R::That thing is a trap enough. Better question: transportation?'
'RX::We should not let it touch us, that hole.'
'J_R::Stick it in something, and cover it.'
~Jochek was thinking of using a rice crispy treat and a tubber-ware~
'RX::We are getting hungry.'
~It was not just Jochek, we felt, Lenny too.~
'AD_R::The gas-mask, stick it in there.'
~It was easy to carry, and sticking it on the inside would keep the end away from anything~
*Jochek lifted the glass and alarms sounded*
'J_R::Eh, they were coming here already.'
*Ada handed Jochek the gas mask*
'J_R::This is going to be hard, just holding the side of the needle.'
*Jochek picked up the needle and carefully stuck it in the gas mask*
*Lenny had wandered over to the door, next to Dana, who was listening to the outside*
~The crowd had come down stairs and started opening doors.
And then there were screams, and a torrent of noise, which grew steadily quieter.
The storm of chainsaws buzzed in the distance far away, likely up the stairs at this point.
Lenny heard growling right outside the door, but he didn't hear any people...~
'AD_R::Next, how are we getting out?'
"J_R::Any idea's on how we are getting back upstairs."
"D::Why back up there?"
*Jochek walked to the door*
"L_R::To get out."
~She had something to say, so we waited~
"D::Downstairs here, door 42, it leads outside, down at the bottom of the cliff... 
I think."
'AD_R::So what, we just have to deal with the thing out there.'
~Both Ada and Jochek strained to listen~
'J_R::Is it more cat like, or bear like.'
'L_R::It sounds like a gorilla to me.'
~Lenny's hearing wasn't the best, but he wasn't wrong...~
'J_R::But there is just one thing out there?'
"L_R::Okay, we're going to lure it in here, and switch places with it out there..."
*Ada tied the gas mask to her side*
'AD_R::And if it is intelligent?'
'L_R::One step at a time.'
*Lenny grabbed the handle of the door*
"L_R::On my mark."
*He shouted and Ada opened the door*
~In the hallway stood a chimera, of a gorilla, bear, cat, and goat.
A horned feline head, the body of a gorilla and the limbs of a bear.
It stood at the ready, in a martial pose facing them~
*No one moved.
As time stretched on the creature lowered its arms*
~Slowly, relaxing...~
'AD_R::Try talking to it...'
*Lenny pointed with his fingers to the door*
~It was gesticulated in such a way to indicate they just wanted to pass~
*The creature sniffed at and carefully inspected them.
It then moved to the corner and sat down, watching them*
"L_R::I think we can go."
~Lenny was the one to see the gore and the blood painting the cellar walls~
'L_R::And I am pretty sure it is intelligent.'
*Lenny kept between the rest of us and the creature*
"L_R::No sudden movements..."
~It was watching us, poised to attack, but staying still in the corner~
'RX::Well it is not mauling us, so that is a start.'
~Jochek kept her eyes straight on the lock, she was never one for the sight of blood~
'AD_R::Was this the chainsaws or this creature?'
'L_R::Maybe a little of colum A, some of B.'
*Jochek went to work on the lock for door 42*
~Above us we heard the sound of chainsaws fade in and out as they raced around the rooms above us~
"J_R::Got it."
*The door lock clicked and Jochek pulled it open*
~The door led to a spiral staircase leading downwards~
*Behind them the creature stirred*
~Standing on it's hind legs it was approaching us~
*It turned its head to the stairs, then to the open door*
'L_R::I think it wants out.'
~We considered~
'J_R::If it can keep its distance.'
~We kept the creature at a safe distance during the decent. 
Until eventually we reached the door at the bottom.
The other end was camouflaged into the cliff face~
~And in front of us, the Romanian forest, the night sky covered in storm clouds before their eruption~
*The creature behind us darted forward*
~It paused briefly, turning back to wave with one paw, before disappearing into the forest~
*We marched on, Dana followed*
~Ada kept watch on her, as Dana helped Lenny walk.
We were optimistic, Ada though...
She worried.
She remembered what happened to the Nerium...~
"D::And it's beginning to snow."
*The snow fell*
~It clung to them, chilling them. 
And while Lenny and Jochek in the bodies of locals were dressed for this weather, Ada was not.
Her formal gown giving no protection to the cold.
Dana was in the same situation~
~They had a trek to town ahead of them~

}

# [desperate resort](desperate-resort.md)