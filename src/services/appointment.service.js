const Appointment = require("../models/Appointment");

const createAppointment = async (userId, appointmentData) => {
  try {
    const appointment = new Appointment(
      userId,
      ...appointmentData,
    );
    await appointment.save();
    return appointment;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const deleteAppointment = async (id) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const updateAppointment = async (id, appointmentData) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      appointmentData,
      { new: true },
    );
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const getAppointment = async () => {
  try {
    const appointments = await Appointment.find();
    return appointments;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const getAppointmentById = async (id) => {
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};



module.exports = {
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointment,
  getAppointmentById,
};
