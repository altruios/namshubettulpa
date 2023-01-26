# Writing contributions:

## style guidlines:

Each sentence should be on it's own line.
descriptions and actions should not mix.
'Said' should be unneeded.
Sentences should contain one idea.
Sentences should be short enough to fit on one line. 

## format:

{} defines a 'block'

%%%%: defines a scene break

nm:${key} defines the current narrator

1. nm: must alone in a block, it may be accompanied by a scene break "%%%%"

delimiters:
1. ~~ - defines description
2. ** - defines action
3. "" - defines speech
4. '' - defines thought
5. `` - defines code

# defining who is speaking:

inside speech or thought delimiters: adding "${key}::" at the begining inside the delimiter defines who is speaking.

[speaker map](speakermap.js) defines the keys avalible to use.

the proper format is as follows (using M for Martha):
```js
"M::Speaking"
'M::Thinking'
```

# functionality in the [speaker map](speakermap.js)

in addition to simple keys, there are functions

they are to indicate someone is of an egregore,

or that they are in someone else's body.

"_R" is of the relux. there will be more.

"${key1}__${key2}::" is to say "${key1} in ${key2}"



## formatting ``:
~todo~

## todo:

clean up body hopping narrator titles
