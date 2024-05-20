const express = require('express')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const ContactModel = require('./models/Contact')

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 3001;
const URI = process.env.MongoDBURI;

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDb")
} catch (error) {
    console.log("Error", error);
}

// SignUp
app.post('/signup', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        })
})

// Contact Us
app.post('/contact', (req, res) => {
    ContactModel.create(req.body)
        .then(contacts => res.json(contacts))
        .catch(err => res.json(err))
})



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
