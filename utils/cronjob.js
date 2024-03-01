const cron = require('node-cron')
const { create_lecture_service } = require('../services/timetable.services')

const Lecture_Session_CronJpb = ()=>{
    cron.schedule('16 23 * * 3',create_lecture_service)
}
module.exports = {
    Lecture_Session_CronJpb
}
