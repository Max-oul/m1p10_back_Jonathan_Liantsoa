const express = require('express');
const { loginUser, registerUser, updateUser, deleteUser , getUser, getUserById } = require('../services/user.service');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const { user, token } = await loginUser(email, password);
        res.status(200).json({user, token});
    } catch (error){
        res.status(400).json({error: error.message});
    }
})

router.post('/register', async(req, res) => {
    try{
        const {f_name, l_name, phone, address, email, password, role } = req.body;
        const { newUser, token } = await registerUser({f_name, l_name, phone, address, email, password, role });
        res.status(200).json({newUser, token});
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.put('/update/:id', authMiddleware, async(req, res) => {
    try{
        const { id } = req.params;
        const {f_name, l_name, phone, address, email, password, role } = req.body;
        const updatedUser = await updateUser(id, {f_name, l_name, phone, address, email, password, role });
        res.status(200).json(updatedUser); 
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.delete('/:id', authMiddleware, async(req, res) => {
    try{
        const {id} = req.params;
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (error){
        res.status(400).json({error: error.message});
    }
})

router.get('/', authMiddleware, async(req, res) => {
    try{
        const users = await getUser();
        res.status(200).json(users);
    } catch (error){
        res.status(400).json({error: error.message});
    }
})

router.get('/:id', authMiddleware, async(req, res) => {
    try{
        const {id} = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error){
        res.status(400).json({error: error.message});
    }
})

router.get('/protected', authMiddleware, (req, res) => {
    const userId = req.user.userId;
    res.json({ message: 'Protected route accessed', userId });
});

module.exports = router;