const express = require("express");
const hbs = require("hbs");
const path = require("path");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;
const app = express();
require("./db/conn");
const Message = require("./models/feedback")

const Register = require("./models/register")
const router = express.Router();
const Razorpay = require('razorpay');

const instance =new Razorpay({
    key_id: 'rzp_test_3v0G8if4jTW5i9',
    key_secret:'mVmzJ53v9L6vU3qgxAO9kpKk'
});

let templatePath = path.join(__dirname,"/templates");
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.static(templatePath));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use("./templates/testapi")

let myInfo = nodemailer.createTransport({
    service:"gmail",
    port:port,
    auth:{
        user:"hsjaiswal3110@gmail.com",
        pass:"Harsh@1234#"
    }
})
app.get("/feedback",(req,res)=>{
    res.render("feedback")
});

app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/feedback",async(req,res)=>{

    try{
            const sendMessage = new Message({
                email : req.body.myemail,
                name: req.body.myname,
                msg : req.body.sendmsg
            })
            let mailOptions={
                from:"hsjaiswal3110@gmail.com",
                to: req.body.myemail,
                subject:"Message from harsh jaiswal",
                text:`Hi ${req.body.myname}. Thank you for contacting CryptoExperts. Your response have been submitted and soon you will get reply to your response in your mail id.`
            }
            myInfo.sendMail(mailOptions,function(err,info){
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send(info.response);
                }
            })
            const result = await sendMessage.save();
            res.status(201).render("feedback")
    }catch(err){
        res.status(400).send(err);
    }
})

app.get("/payment",(req,res)=>{
        var options = {
            amount: 400000,
            currency: 'INR',
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err);
            } else {
                console.log(order);
                res.render('checkout.ejs', {amount: order.amount, order_id: order.id});
            }
        });

})

app.post("/register",async(req,res)=>{
    try{
        const password = req.body.pass;
        const cpassword = req.body.ConfirmPass;
        if(password===cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstName,
                lastname : req.body.lastName,
                email : req.body.Email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : req.body.pass,
                confirmpassword : req.body.ConfirmPass
            })
            const result = await registerEmployee.save();
            res.status(201).render("login")
        }else{
            res.send("Password not matched");
        }
    }catch(err){
        res.status(400).send(err);
    }
})

app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const useremail = await Register.findOne({email:email});
        if(!useremail){
            res.send("loginError")
        }
        if (useremail.password === pass) {
            res.render("feedback");
        }
        else{
        res.send("loginError")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen(port,()=>{
    console.log("done at 5000")
})