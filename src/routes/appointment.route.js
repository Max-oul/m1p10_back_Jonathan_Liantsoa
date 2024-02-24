const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { createAppointment, getAppointment, deleteAppointment, getAppointmentById, getAppointment, updateAppointment } = require('../services/appointment.service');
const router = express.Router();



router.post('/', authMiddleware, async (req, res) => {
    try {
        const appointment = await createAppointment(req.user._id, req.body);
        res.json(appointment);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});


router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const appointment = await getAppointmentById(req.params.id);
        res.json(appointment);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});
roi
router.get('/', authMiddleware, async (req, res) => {
    try {
        const appointments = await getAppointment();
        res.json(appointments);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const appointment = await deleteAppointment(req.params.id);
        res.json(appointment);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try{
        const appointment = await updateAppointment(req.params.id, req.body);
        res.json(appointment);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});