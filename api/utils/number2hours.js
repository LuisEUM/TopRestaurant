const time = require('../data/time.slot.json')

const getarray = (numbers, hours) => {

    const initial = numbers[0]
    const segment = []
    segment.push(initial)
    let j = 0
    for (let index = initial ; index <= numbers.length + initial - 1; index++) {
        
      if(index !== numbers[j]){
        segment.push(numbers[j-1])
        hours.push(segment)
        getarray( numbers.slice(j), hours)
        break
      }else if(index === numbers.length + initial - 1){
        segment.push(numbers[j])
        hours.push(segment)
      }
        
      j++
    }
  
    return hours
}

const number2hours = (hours) => {
    hours = getarray(hours, [])
    return hoursStr = hours.map(x => ( [ time[x[0]] , time[x[1]] ] ));
}


module.exports = number2hours;
