const createError = require("http-errors");
const {Table, Zone} = require("../models");

module.exports.detail = (req, res, next) => {
  Table.find()
  .then((table) => {
    Zone.findById(req.params.zoneId)
    .populate("tables")
      .then((zone) => {
        return res.json(zone.tables) 
      })
    })
  .catch((error) => next(error));
}
module.exports.create = (req, res, next) => {

  const table = req.body;
  delete table.owner;
  delete table.bookings;
  delete table.zone;

  table.zone = req.zone.id
  table.owner = req.user.id


  Table.create(table)
    .then((table) => {

      req.zone
        .populate("tables")
        .then((zone) => { 

          let totalChairs = zone.tables.reduce((sum, table)=>{
            return sum += Number(table.size)
          }, 0)
          console.log(totalChairs, "total chairs")

          if(totalChairs + Number(table.size) <= zone.maxCapacity){
            zone.tables.push(table._id)
            zone.save();
            res.status(201).json(table)
          } else (
            next(createError(400, "Too much tables for this zone."))
          )
        })
        .catch((error) =>  res.status(400).json(error));
    })
    .catch((error) =>  res.status(400).json(error));
};


module.exports.update = (req, res, next) => {
  const data = req.body;
  delete data.owner;
  delete data.bookings;
  delete data.zone;

  const table = Object.assign(req.table, data); 

  table
      .save()
      .then((table) => res.json(table))
      .catch(next);
};


module.exports.delete = (req, res, next) => {
  console.log(req.table)
  Zone.findById(req.table.zone)
    .then((zone) => {
      const zoneTables = zone.tables
      zoneTables.splice(zoneTables.indexOf(req.table._id), 1);
      zone.save();
    })
    .then(() => {
      Table.deleteOne({ _id: req.table._id })
      .then(() => res.status(204).send())
      .catch(next);
    })
    .catch(next);
};