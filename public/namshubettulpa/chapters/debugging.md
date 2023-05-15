# Debugging

{
mn:M
}
{
*Martha was falling*
~The rushing wind was all around her.
It was deafening, yet she was in a pocket. 
The island of cliff that sheared off the landscape stayed in one piece.
It shielded her to the wind~
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
*Above her, light winked out*
~A chill crept to her bones~
'M::Some light would be nice.'
*Martha took of her shoe and held it in her hand.
She took a breath*
~Bracing for the pain~
`
const ~orb~ = {
    *center*:~Self~.*center*+(10ft,10ft),
    ~color~:~blue~,
}
~Self~.hands.get_held().reshape(~orb~)
`
*Her shoe transformed in her hand, and she hand to squint her eyes*
~The light was a bright blue, and was quickly growing hot~
*She stood up and released it*
~It floated in place and she turned around~
~The close wall was illuminated, but the far was dim~
'M::Okay, that worked, why?'
~She realized only a short moment later~
"M::Permissions..."
~This wasn't her dream, she could change things about her self, things she owned, but another's dream...~
*She took off her other shoe*
~She took a second to plan, and then...~
`
~Self~.~gravity~ = - ~Self~.~gravity~;
`
*Which sent her soaring away from the cliff*
*The tiny ball of light zipped up the match her speed, returning to its original orbit*
~A voice boomed through the cavern, coming from deep below.
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
*Below Martha something was rising from the depths faster than she was*
`
~self~.~gravity~=~self~.gravity x 5
`
~Five times, that she could handle, she didn't know offhand how many G's a human could take~
*What was rising below caught up to her*
~It was a dark goo, a morphing blob shifting into the shapes to humans, each reaching towards her in desperation.
But the overall shape was a hand~
*Which slammed into Martha's bubble, smashing it into the cliff face.
The shield bubble burrowed up into the rock, spinning wildly before coming to a rest.
The little orb of light slowly stopped spinning from inside the perimeter*
~She hung in the air, the wind knocked out of her - feeling the effects of the increased gravity and no where to go, the bubble keeping her in place~
`
~Self~.~gravity~=0
`
~She could breath again, and after a few sharp breaths~
*The hand poked the bubble again*
~Wedging it deeper in the cliff face, a small tunnel now existed~
~As the rock crunched, Martha felt a burning sensation throughout her body, and a sudden increasing hunger~
~Martha was starting to panic beyond rational thought, she was trapped like a rat, hungry and tired~
"AT::I thank you."
~As nothing happened after, she waited and slowly calmed, her stomach still doing knots~
'M::Thank me, for what?'
~Did she dare ask? 
She considered her situation... 
If she said nothing~
"M::What for?"
~The voice grew closer, emanating the shifting shapes of human heads on the slime outside the cave~
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
"AT::Or are we going to chase through the earth?"
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
~self~.hands.get_held().reshape(~Mirror~)
.~exit~(~self~,~this~(~dream~))^
`
~The walls around her started to melt away~
"AT::Oh, we're chasing this way..."
~All went to black~
"AT::See you soon"
*^And then the pain hit*

}
{
%%%%
}
{
mn:RX
}
{
`
todo: relux plot line
`
}

# desperate resort