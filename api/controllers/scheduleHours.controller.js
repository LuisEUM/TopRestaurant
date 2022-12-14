const createError = require("http-errors");
const {Schedule, ScheduleHours} = require("../models");
const verifyHours = require("../utils/verifyHours")

module.exports.detail = (req, res, next) => {
  RestaurantSetting.find()
  .then(() => {
    Restaurant.findById(req.params.restaurantId)
    .populate("settings")
      .then((restaurant) => {
        return res.json(restaurant.settings) 
      })
    })
  .catch((error) => next(error));
}

module.exports.createMany = ( req, res, next, schedule, hours ) => {

    const scheduleHoursArr = []

    hours.forEach((hour) => {
      const scheduleHours = {};

      scheduleHours.ScheduleOwn = schedule.id
      scheduleHours.owner = req.user.id
      scheduleHours.openHours = hour[0] 
      scheduleHours.closeHours = hour[1]
      
      scheduleHoursArr.push(scheduleHours)

    })



    ScheduleHours.insertMany(scheduleHoursArr)
      .then((scheduleHour) => { 
        scheduleHour.forEach((hour) => {
          schedule.hours.push(hour.id)
        })
        schedule.save()
        res.status(201).json(schedule)
      })
      .catch((error) =>  res.status(400).json(error));

};

module.exports.create = ( req, res, next) => {

  const scheduleHours = {
    ...req.body,
    ScheduleOwn: req.schedule.id,
    owner: req.user.id
  };



  const hour = [req.body.openHours, req.body.closeHours]

  req.schedule
    .populate("hours")
    .then((schedule) => {
        
        let arrHours = []

        //add hours
        if(schedule.hours !== undefined){
          schedule.hours.forEach((scheHours) => {
            arrHours.push([scheHours.openHours,scheHours.closeHours])
          })
        }
        arrHours.push(hour)

        const verify = verifyHours(arrHours)
        //insert new hour if is

        if(verify){

          ScheduleHours.create(scheduleHours)
          .then((scheduleHour) => {
            schedule.hours.push(scheduleHour.id)
            schedule.save()
          })
          .then(() =>  {
            res.status(201).json(schedule)
          })
        .catch((error) =>  res.status(400).json(error));
        }
        else{
          next(
              createError(400, {
              message: "invalid hours ",
              errors: { hours: { message: "invalid hours" } },
            })
          )
        }
    })
    .catch((error) =>  res.status(400).json(error));

};

module.exports.update = (req, res, next) => {

  const data = req.body;
  delete data.ScheduleOwn;
  delete data.owner;

  const scheduleHour = Object.assign(req.scheduleHour, data);

  Schedule.findById(req.scheduleHour.ScheduleOwn)
  .populate("hours")
  .then((schedule) => {
    const hour = [req.body.openHours, req.body.closeHours]

    let arrHours = []

    //add hours
    if(schedule.hours !== undefined){
      schedule.hours.forEach((scheHours) => {
        if(scheHours.id !== scheduleHour.id){
          arrHours.push([scheHours.openHours,scheHours.closeHours])
        }
  
      })
    }
    arrHours.push(hour)
    const verify = verifyHours(arrHours)

    if(verify){
      scheduleHour
      .save()
      .then((scheduleHour) => res.json(scheduleHour))
      .catch(next);
    }else{
        next(
          createError(400, {
          message: "invalid hours ",
          errors: { hours: { message: "invalid hours" } },
        })
      )
    }
  })
  .catch((error) =>  {
    next(
            createError(400, {
            message: "invalid hours ",
            errors: { hours: { message: "invalid hours" } },
          })
        )
  });



}; 


module.exports.delete = (req, res, next) => {
  Schedule.findById(req.scheduleHour.ScheduleOwn)
    .then((schedule) => {
      const scheduleHour = schedule.hours
      scheduleHour.splice(scheduleHour.indexOf(req.scheduleHour.id), 1);
      restaurant.save();
    })
    .then(() => {
      ScheduleHours.deleteOne({ _id: req.scheduleHour.id})
      .then(() => res.status(204).send())
      .catch(next);
    })
};


