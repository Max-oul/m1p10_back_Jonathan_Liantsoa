const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {createService, getAllServices, getServiceById, updateService, deleteService} = require('../services/service.service');

router.post('/', authMiddleware, async (req, res) => {
    try {
        if(!req.user.role.isManager){
            throw new Error('You are not authorized to create a service');
        }
        const service = await createService(req.body);
        res.status(200).json(service);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        if(!req.user.role.isManager){
            throw new Error('You are not authorized to create a service');
        }
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        if(!req.user.role.isManager){
            throw new Error('You are not authorized to create a service');
        }
        const service = await getServiceById(req.params.id);
        res.status(200).json(service);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if(!req.user.role.isManager){
            throw new Error('You are not authorized to create a service');
        }
        const service = await deleteService(req.params.id);
        res.status(200).json(service);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try{
        if(!req.user.role.isManager){
            throw new Error('You are not authorized to create a service');
        }
        const service = await updateService(req.params.id, req.body);
        res.status(200).json(service);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;