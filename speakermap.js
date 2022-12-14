const speaker_map={
    A:"Lana Alacira",
    AD:"Ada Lovelace",
    AG:"Alice Glass",
    AL:"Ada Lovelace",
    AT:"Al-tok",
    C:"The Chemist",
    E:"Erin Mc'kay",
    F:"Felix Danabrus",
    FA:"Flight Attendant",
    FL:"Flanagan",
    G:"Gerald Whitewater",
    HM:"Homeless man",
    J:"Jochek",
    JL:"Juan Long",
    K:"Kent Barbado",
    L:"Lenny",
    LX:"Lux",
    M:"Martha Crisp",
    N:"Nurse",
    NT:"Navigator",
    NULL:"unknown",
    O:"Ozmind Yammin",
    P:"Police Officer",
    R:"Rossin",
    RG:"Robert Glass",
    RO:"Officer Rogers",
    RP:"Reporter",
    RX:"The Relux",
    S:"Students",
    SO:"Sonny Seraphim",
    SM:"Male Voice",
    SG:"Security Guard",
    T:"Tom Garland",
    U:"Uri Maca",
    W:"Wilbert",
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