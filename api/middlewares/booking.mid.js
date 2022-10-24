const createError = require('http-errors');
const { Restaurant, Booking } = require('../models');

module.exports.getHours = (req, res, next) => {

    const bookingdate = new Date(2022, 10, 15);
    const size = 4

       //size <=  tama;o - 2
    const { id } = req.params;
    if (id === undefined)
        next(createError(401))

    Restaurant.findById(id)
        .populate({
            path: "zones",
            populate: {
                path: "tables",
                    populate: {
                        path: "bookings",
                        match: { startDate: 1665957600000 }
                        },
            },
        })
        .populate("timeslots")
        .populate("settings")
        .then((restaurant) => {
            const { zones, timeslots  } = restaurant
            
            let AvailableHours = new Set()
            const horastotales = new Set([...timeslots.hours])

            if(timeslots.date.includes(bookingdate.getDate()) && timeslots.month.includes(bookingdate.getMonth())){
                zones.some(zone => {
                    zone.tables.some(table => {
                        
                        let AvailableHoursTable = []

                        if(size  <= table.size && size >=  table.size - 2){

                            AvailableHoursTable = [...timeslots.hours]

                            table.bookings.forEach(booking =>{
                                AvailableHoursTable = AvailableHoursTable.filter( ( el ) => !booking.hours.includes( el ) );
                            });
    
                            AvailableHoursTable = AvailableHoursTable.filter( (hour, index) => {
                                for (let i = 0 ; i <= 3  ; i++) {
                                  if(hour + i !== AvailableHoursTable[index + i]){
                                    return false
                                  }
                                }
                                return true
                              } )

                        }

                        

                        AvailableHoursTable.forEach(item => AvailableHours.add(item))

                        if(AvailableHours === horastotales) return
                    });
                    if(AvailableHours === horastotales) return
                });
            }

            req.AvailableHours = Array.from(AvailableHours)

            next()
        })
        .catch(next);

};

module.exports.confirmHour = (req, res, next) => {

    const bookingdate = new Date(req.body.startDate);
    const hora = req.body.hour;
    const { id } = req.params;
    const size = req.body.persons


       //size <=  tama;o - 2
    if (id === undefined)
        next(createError(401))

    Restaurant.findById(id)
        .populate({
            path: "zones",
            populate: {
                path: "tables",
                    populate: {
                        path: "bookings",
                        match: { startDate: req.body.startDate }
                        },
            },
        })
        .populate("timeslots")
        .populate("settings")
        .then((restaurant) => {

            req.hours = Array.from({length: 3}, (_, i) => hora+i)

            const { zones, timeslots  } = restaurant

            //filtro de zonas
            if(timeslots.date.includes(bookingdate.getDate()) 
            && timeslots.month.includes(bookingdate.getMonth())
            && req.hours.every( ( hour ) => timeslots.hours.includes(hour))){
                //loop of zones
                zones.some(zone => {
                    //loop of zones
                    const availbleTable = zone.tables.some(table => {
                        let available = true
                        
                        if(size  <= table.size && size >=  table.size - 2){
                            table.bookings.forEach(booking =>{

                                if(booking.hours.some( ( hour ) => req.hours.includes(hour))){
                                    available = false
                                }
                                
                            });
                        }else{
                            available = false
                        }

                        if(available){
                            req.table = table

                            return available 
                        }

                    });

                    if(availbleTable) return true
                });
            }

            next()
        })
        .catch(next);

};