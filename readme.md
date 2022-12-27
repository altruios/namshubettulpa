<h1 align="center">


Namshub et'Tulpa
</h1>

<p align="center">

  <img src="coverart.jpg" alt="cover art" />
</p>


# What is this?

Well, this is a book that is written to be read on your phone.
It uses a specific format and a bit of interactivity to tell a story

# Okay, so what's it about?

Martha wakes up finding she may have killed someone.
And a stranger named rossin, claiming to be effectivly an imaginary friend warns of a creature bound in her head.

He tells her of a world controlled by the Awakened, people able to use namshubs: crafted peices of information designed to control and bind minds.
And that this complete control of the populus was pedestrian to what they could do, and what she could eventually do. 

Rossin tells her she was pulled into a plot to kill his's author, and asks her to help him extract revenge.



# Sample 

![example](sample.jpg)



## Why does it look like that?
So with code, you have environments that color text based on it's function
```js
//function
function(){}
//object
{key:property}
//number
1234;
//string/text
"hello world"
```
the point of those colors is to help someone coding to easily parse what these words do.
Its a way of conveying information that is very effective.

And it's missed opertunity for creative writing.
By having a sentance serve one function, that sentance can be reinforced: this is a sepration of description and action.

## parsing this book

the following delimiters are used:

\~description\~

\*action\*

\"speech\"

\'thought\'

\`code\`



# But how do I read it?

//if link add here (once book is done and hosted)

## Self Hosting

  Requires git and node
    Install instruction for [git](https://github.com/git-guides/install-git) and [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  1. open a terminal
  2. navigate to a folder you want to save to
  3. run the command "git clone {the address of this repo}"
  4. run the command "npm install"
  5. run the command "npm start"
  6. scan the qr code that comes up with your phone
    - you have to be on the same wifi network



## todo:

### Effects to add:
okay, since I've fixed the script tag - there are a few programmatic effects to add:

1: In Martha's dream sections
  - set the background image to a twisting shape: 
    - with it's visibility tied to scroll speed
    - generative image: random seeded by current time
2: at the airport showing rossin the shapes:
  - grow image from terminal 
  - should be a chaotic shape 
  - no background or borders
  - opacity and size are based distance to viewport center
3: security guard
  - lock eyes effect
    - ^ is the last thing visible on the page - which represent the eyes of the security guard
      - while ^ is visible - below it is a blank page
      - scrolling down reveals hidden text only visible if ^ is not
4: the true power of the terminal
  - affect version control of story / pull from git a particular branch
    - choose your own adventure in the open source community
      - hooked up to be able to change source while running, should work no back end code changes
      - sounds like not a single source, but series of containers for each user.

### Coding to do:

1: Finish and improve the mxd-parser-upgrade branch. 
 a- and integrate with terminal on the great awakening page
    A. change color or size of any element, screen padding and opacity.
2: Get a proper md parser and deffer to that for not mdx files
 a- rename .md files that are mdx files to .mdx and handle

### 'Coding' to do

1: Formalize code styles in world - base on the good parts of python & js
2: sub-wiki of code definitions

### writing to do

finish book.
