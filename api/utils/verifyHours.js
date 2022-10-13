const verifyHours = (hours) => {

    if(hours === undefined)
        return false

    if(hours.length === 1 && hours[0][0] < hours[0][1])
        return true

    hours.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));

    console.log(hours, "ARRAY de horas")

    return hours.every((hour,index, hours) => {
        if( hour[0]<hour[1]){
          if(!(index === 0)){
            if(hours[index - 1][1] > hours[index][0]){
                return false
            }
          }    
        }else{
            return false
        }
        return true
    })
}

module.exports = verifyHours;
