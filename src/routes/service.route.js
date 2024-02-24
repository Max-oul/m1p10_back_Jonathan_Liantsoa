const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {createService, getAllServices, getServiceById, updateService, deleteService} = require('../services/service.service');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const service = await createService(req.body);
        res.json(service);
    }catch(err){
        res.status(400).json({eroor: error.message});
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await getServiceById(req.params.id);
        res.json(service);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await deleteService(req.params.id);
        res.json(service);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try{
        const service = await updateService(req.params.id, req.body);
        res.json(service);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});





module.exports = router;