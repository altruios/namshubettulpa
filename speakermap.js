const speaker_map={
    M:"Martha Crisp",
    R:"Rossin",
    A:"Lana Alacira",
    G:"Gerald Whitewater",
    AG:"Alice Glass",
    FL:"Flanagan",
    F:"Felix Danabrus",
    K:"Kent Barbado",
    RG:"Robert Glass",
    U:"Uri Maca",
    J:"Juan Long",
    O:"Ozmind Yammin",
    AT:"Al-tok",
    L:"Lenny",
    J:"Jochek",
    "?":"unknown",
    SM:"Male Voice",
    SG:"Security Guard",
    T:"Tom Garland",
    N:"Nurse",
    P:"Police Officer",
    RO:"Officer Rogers",
    FA:"Flight Attendant",
    __:function(key){
        return this[key]+" of the Relux"
    }
}

module.exports = speaker_map