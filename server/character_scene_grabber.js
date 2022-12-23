const {readFile, readFileSync } = require('fs')
const glob = require("glob");
const path = require('path');

// grab every scene a character is in.
// write to memories
// ## MEMORY//chapter//count_of_scene_by_character_in_chapter.memory
// can find via mn:{key}
// search all files?

//two things - will be a request for memory with key and index
 //use current draft to order chapters
 //write each scene as a memory
 //at server start we write memory index.md for each char

const character_list = require("../speakermap.js");
for(const prop in character_list){
    if(prop.includes("_")) delete character_list[prop]
}
console.log(character_list,"is list of full characters");
const character_map = {};
for(const character in character_list){
    character_map[character_list[character]] = {name:character_list[character],key:character,memories:[],data:{list:[],raw:[]}}
}
console.log(character_map);
//regex generator for finding blocks of character narration
const regex_narration = (key)=>``

const a_number = ["0","1","2","3","4","5","6","7","8","9"]
console.log("1")
const book_dir=path.join("public","namshubettulpa")
readFile(path.join(book_dir,"current-draft.md"),"utf-8",(err,data)=>{
    if(err) console.log(err,"err")
    data =data.split("\n").map(x=>x.trim())
    data =data.filter(x=>a_number.includes(x[0])).map(x=>x.slice(x.indexOf("(")+1,x.length-1))
    
    const chapter_list=data.map(x=>path.join(book_dir,x))    
    
    for(const chapter of chapter_list){
       // console.log(chapter,"chapter");
        readFile(chapter,"utf-8",(e,d)=>{
            //for each chapter
            //console.log(d, chapter);
            const narrators = [];
            for(const character in character_map){
                const search = "mn:"+character_map[character].key+"\n";
                if(d.includes(search)) narrators.push(character_map[character].name)
            }
            console.log("narrators for", chapter,"are ",narrators)
            for(const narrator of narrators){
              //  console.log(character_map[narrator] ," is mapped char")
                const chapter_memories = [];
            }


        })
    }
    


    //make folders (if they don't exist already)
    //parse into one giant file so that we can
        //filter out narrators
        //for each narrator then
            //by individual chapter    
                //find the regex from nm:{{key}} to the next nm without including it
                //break up the data by blocks "{}" into memories array
                    //write links on character index file
                        //write memories
                            //format header to read #MEMORIES//{{chapter}}//{{indexOf(block)}}
                            //include next and back button
    
    //this doesn't seem that bad
    //special case for martha chapter - 
    //set her memories to be written to data with the correct format header
    //replace 3rd memory with version with hatch to confrontations chapter
})