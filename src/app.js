require("../src/database/connection");
const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");
require('dotenv').config();
const port = process.env.CONNECTION_PORT || 3000;
const contact = require('../src/database/models/contactSchema');

//join files
const staticPath = path.join(__dirname, "../public"); 
const templatesPath = path.join(__dirname, "../src/Templates/views");
const partialsPath = path.join(__dirname, "../src/Templates/partials");

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
    res.render("index.hbs");
})

app.get("/Home", (req,res) => {
    res.render("index.hbs");
})
app.get("/about", (req, res) => {
    res.render("About.hbs");
})
app.get("/Work", (req, res) => {
    res.render("Work.hbs");
})
app.get("/Contact", (req, res) => {
    res.render("Contact.hbs");
})

//store contact details of clients 
app.post("/Contact", async (req, res) => {
    try {
        const Contactdetails = req.body;
        const contactData = new contact({
            name: Contactdetails.name,
            email: Contactdetails.email,
            phone : Contactdetails.phone,
            message: Contactdetails.message

        });
        const details = await contactData.save();
        console.log(details);
        res.render("ThankYou.hbs");
    } catch (error) {
        res.status(404).send(error);
    }
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})