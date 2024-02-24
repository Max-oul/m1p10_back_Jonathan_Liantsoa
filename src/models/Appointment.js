const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  }, 
  delay: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, { timestamps: true });


const Appointment =mongoose.model('Appointment', AppointmentSchema);


module.exports = Appointment;
