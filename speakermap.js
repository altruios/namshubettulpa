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
    JL:"Juan Long",
    O:"Ozmind Yammin",
    AT:"Al-tok",
    L:"Lenny",
    J:"Jochek",
    HM:"Homeless man",
    NULL:"unknown",
    SM:"Male Voice",
    SG:"Security Guard",
    T:"Tom Garland",
    N:"Nurse",
    P:"Police Officer",
    RO:"Officer Rogers",
    FA:"Flight Attendant",
    E:"Erin Mc'kay",
    S:"Students",
    C:"The Chemist",
    __:function(key,key2){
        return this[key]+" of the "+this[key2]
    },
    ___:function(key,key2){
        return this[key]+" in "+this[key2]

    },
    _R:"Relux",
    _T:"Tok",
    _N:"Nerium",
}

module.exports = speaker_map