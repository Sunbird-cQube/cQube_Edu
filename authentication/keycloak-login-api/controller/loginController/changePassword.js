const router = require('express').Router();

const axios = require('axios');
const dotenv = require('dotenv');
const db = require('../db/db')

dotenv.config();

var host = process.env.KEYCLOAK_HOST;
var realm = process.env.KEYCLOAK_REALM;
var authType = process.env.AUTH_API;
var client_id = process.env.KEYCLOAK_CLIENT

router.post('/:id', async (req, res) => {
    try {
    
        var userId = req.params.id;
       
        let usersUrl = `${host}/auth/admin/realms/${realm}/users/${userId}/reset-password`;
        let newPass = {
            temporary: false,
            type: "password",
            value: req.body.cnfpass
        };
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.body.token}`
        }
        axios.put(usersUrl, newPass, { headers: headers }).then(resp => {
            console.log('res', resp)
           
            db.query('UPDATE keycloak_users set status= $2 where keycloak_username=$1;', [req.body.username, 'false'], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(201).json({ msg: "Password changed" });

            })

        }).catch(error => {
            console.log('err', error)             
               
        })
        



    } catch (e) {

        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

module.exports = router;