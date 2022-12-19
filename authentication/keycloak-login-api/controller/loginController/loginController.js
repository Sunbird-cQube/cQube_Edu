const router = require('express').Router();

const axios = require('axios');
const dotenv = require('dotenv');

const { generateSecret, verify } = require('2fa-util');
const db = require('../db/db')
dotenv.config();
const authURL = process.env.AUTH_API
const keyCloakURL = process.env.KEYCLOAK_HOST
const keyClockRealm = process.env.KEYCLOAK_REALM
const keyClockClient = process.env.KEYCLOAK_CLIENT

router.post('/login', async (req, res, next) => {
    console.log('testings')
    const { email, password } = req.body;
    let role = '';
    let userStatus = ''

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    try {
        let keycloakheaders = {
            "Content-Type": "application/x-www-form-urlencoded",
        }

        let keyCloakdetails = new URLSearchParams({
            client_id: keyClockClient,
            username: req.body.email,
            password: req.body.password,
            grant_type: 'password',

        });

        let kcUrl = `${keyCloakURL}/auth/realms/${keyClockRealm}/protocol/openid-connect/token`



        await axios.post(kcUrl, keyCloakdetails, { headers: keycloakheaders }).then(resp => {
           
            let response = resp['data']
            let jwt = resp['data'].access_token;

            let username = ''
            let userId = ''
            if (resp.status === 200) {
                const decodingJWT = (token) => {
                    if (token !== null || token !== undefined) {
                        const base64String = token.split('.')[1];
                        const decodedValue = JSON.parse(Buffer.from(base64String,
                            'base64').toString('ascii'));

                        if (decodedValue.realm_access.roles.includes('admin')) {
                            role = 'admin'
                        }
                        if (decodedValue.realm_access.roles.includes('report_viewer')) {
                            role = 'report_viewer'
                        }
                        if (decodedValue.realm_access.roles.includes('emission')) {
                            role = 'emission'
                        }

                        username = decodedValue.preferred_username;
                        userId = decodedValue.sub

                        return decodedValue;
                    }
                    return null;
                }
                decodingJWT(jwt)
            };

            let userStatus = ''

            db.query('SELECT * FROM keycloak_users WHERE keycloak_username = $1', [req.body.email], (error, results) => {
              
                if (error) {
                    // logger.info('---user status from DB error ---');
                    console.log('---user status from DB error ---')
                    throw error
                }

                if (results.rows.length) {
                    console.log('---user status from DB success ---')
                    // logger.info('---user status from DB success ---');
                    res.send({ token: jwt, role: role, username: username, userId: userId, status: results.rows[0].status, res: response })

                } else {
                    //   logger.info('---user status not available in DB ---');
                    res.send({ token: jwt, role: role, username: username, userId: userId, res: response })
                }

            })


            // res.send({ token: jwt, role: role, username: username, userId: userId, res: response })
        }

        ).catch(error => {

            res.status(404).json({ errMessage: `${error}` })

        })



    } catch (error) {

        res.status(404).json(`Error :: ${error}`)
    }
})

router.post('/adduser', async (req, res, next) => {
    const { email } = req.body

  
    db.query('UPDATE keycloak_users set status= $2 where keycloak_username=$1;', [req.body.username, "false"], (error, results) => {
        if (error) {
           
            throw error
        }
        
        res.status(201).json({ msg: "User Created" });
    })

})
router.post('/getTotp', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const secret = await generateSecret(email, 'cQube');
        db.query('UPDATE keycloak_users set qr_secret= $2 where keycloak_username=$1;', [req.body.email, secret.secret], (error, results) => {
            if (error) {
               
                console.log('error', error)
                throw error
            }
           
            console.log('---qr code from DB success ---')
            
            res.status(200).send({
                message: 'TFA Auth needs to be verified',
                tempSecret: secret.secret,
                dataURL: secret.qrcode,
                tfaURL: secret.otpauth
            })
        })
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }


})

router.post('/logout', async (req, res, next) => {

    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    let details = new URLSearchParams({
        client_id: keyClockClient,
        refresh_token: req.body.refToken

    });
    let logoutUrl = `${keyCloakURL}/auth/realms/${keyClockRealm}/protocol/openid-connect/logout`

    await axios.post(logoutUrl, details, { headers: headers }).then(resp => {
        return res.send({
            status: 200
        })
    }).catch(err => {
       
        res.status(404).json({ errMessage: "Internal error. Please try again!!" })
    })


})

router.post('/getSecret', async (req, res) => {

    const { username } = req.body

    db.query('SELECT qr_secret FROM keycloak_users WHERE keycloak_username = $1', [req.body.username], (error, results) => {
        if (error) {
           
            throw error
        }
      
        res.send({ status: 200, secret: results.rows[0].qr_secret })

    })
});


router.post('/totpVerify', async (req, res) => {
    const { secret, token } = req.body

    let isVerified = await verify(token, secret);
 
    if (isVerified) {
        return res.send({
            "status": 200,
            "message": "Two-factor Auth is enabled successfully",

        });
    } else {
        return res.send({
            "status": 403,
            "message": "Invalid OTP Code"
        });
    }


});






module.exports = router;