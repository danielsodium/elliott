// Fresh from the overflow
function nextDay(day, hour){
    var now = new Date();    
    now.setDate(now.getDate() + (day+(7-now.getDay())) % 7);
    now.setHours(hour, 0, 0);
    return now;
}


console.log(nextDay(1, 19))