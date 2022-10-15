const time = require('../data/time.slot.json')

const hours2numbers = (hours) => {
    let hourArr = []

    hours.forEach((hour) => {
        
        const initial = time.indexOf(hour[0])
        const final = time.indexOf(hour[1])

        hourArr = [...hourArr, ...Array.from({length: final-initial +1}, (_, i) => i + initial)]
    })

    return hourArr
}

module.exports = hours2numbers;
