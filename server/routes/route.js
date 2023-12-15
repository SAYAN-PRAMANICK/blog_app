import express from "express";
import signupUser from "../controller/user-controller.js";

const router = express.Router()


// app.post('/dataCreated',(req,res)=>{
//     const {id,name} = {id:req.body.id,name:req.body.name}

//     const newDocument = new List(req.body)
//     newDocument.save()
//     .then(()=>{
//         console.log(`Data created : ${id} ${name}`)
//         res.send(`Data created : ${id} ${name}`)
//     })
//     .catch(err=>res.send(`Data not created`))
// })

// router.get("/signup", (req,res)=>{
//     // console.log(req.body)
//     res.send("hello from backend")
// })

router.post("/signup", (req,res)=>{
    console.log(req.body)
    res.send("hello from backend")
})

export default router