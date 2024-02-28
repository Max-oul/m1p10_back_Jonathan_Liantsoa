const Appointment = require("../models/Appointment");

const createAppointment = async (appointmentData) => {
  try {
    const appointment = new Appointment(
      appointmentData
    );
    await appointment.save();
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("userId")
      .populate("serviceId")
      .populate("employeeId");
    return populatedAppointment;
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
