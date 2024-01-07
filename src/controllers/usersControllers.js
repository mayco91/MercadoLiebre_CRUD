const fs = require('fs');
const path = require('path');


const usersFilePath = path.join(__dirname, '../data/userDataBase.json');
const userJson = ()=>{
	const usersFilePath = path.join(__dirname, '../data/userDataBase.json');
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users
}
module.exports = {
    register: (req, res,next) => {
		res.render("register")
	},
	
	ingreso: (req, res,next) => {
        const { validationResult } = require('express-validator');
        let errors = validationResult(req);
        if (errors.isEmpty()) {
		const {name,lastName,email,password}= req.body;
        const users = userJson();
        const user = {
            name: name.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password
        }
        users.push(user);
        const newArray = JSON.stringify(users);
        fs.writeFileSync(usersFilePath,newArray,"utf-8");
        res.redirect("/")
    } else {
        res.render('register', { errors: errors.mapped(), old: req.body });
    }
        },

    login: (req,res,next) =>{
        res.render("login")
    },

    logeo: (req,res,next) =>{
        
    }
}