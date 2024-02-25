const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {createProfile, updateProfile, deleteProfile, getProfile, getProfileById} = require('../services/profile.service');




router.post("/", authMiddleware, async (req, res) => {
   try{
       //check if the user is an Employee
         if(req.user.role.isEmployee){
              throw new Error("You are not authorized to perform this action");
         }
         const profile = await createProfile(req.user._id, req.body);
         res.status(200).json(profile);
   }catch(error){
       res.status(400).json({error: error.message});
   }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try{
          //check if the user is an Employee
          if(req.user.role.isEmployee){
               throw new Error("You are not authorized to perform this action");
          }
          const profile = await updateProfile(req.params.id, req.body);
          res.status(200).json(profile);
    }catch(error){
        res.status(400).json({error: error.message});
    }
 });

 router.delete("/:id", authMiddleware, async (req, res) => {
    try{
        //check if the user is an Employee
          if(req.user.role.isEmployee){
               throw new Error("You are not authorized to perform this action");
          }
          const profile = await deleteProfile(req.params.id);
          res.status(200).json(profile);
    }catch(error){
        res.status(400).json({error: error.message});
    }
 });

router.get("/", authMiddleware, async (req, res) => {
    try{
        //check if the user is an Employee
          if(req.user.role.isEmployee){
               throw new Error("You are not authorized to perform this action");
          }
          const profile = await getProfile();
          res.status(200).json(profile);
    }catch(error){
        res.status(400).json({error: error.message});
    }
 });

 router.get("/:id", authMiddleware, async (req, res) => {
    try{
        //check if the user is an Employee
          if(req.user.role.isEmployee){
               throw new Error("You are not authorized to perform this action");
          }
          const profile = await getProfileById(req.params.id);
          res.status(200).json(profile);
    }catch(error){
        res.status(400).json({error: error.message});
    }
 });


 module.exports = router;
