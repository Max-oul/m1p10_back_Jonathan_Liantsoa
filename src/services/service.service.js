const Service = require('../models/Service');

const createService = async (serviceData) => {
  try {
    const service = new Service(serviceData);
    await service.save();
    return service;
  } catch (error) {
    throw error;
  }
};

const updateService = async (id, serviceData) => {
  try {
    const service = await Service.findByIdAndUpdate(id, serviceData, { new: true });
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (id) => {
  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  } catch (error) {
    throw error;
  }
};

const getAllServices = async () => {
  try {
    const services = await Service.find({});
    return services;
  } catch (error) {
    throw error;
  }
};

const getServiceById = async (id) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getServiceById,
};