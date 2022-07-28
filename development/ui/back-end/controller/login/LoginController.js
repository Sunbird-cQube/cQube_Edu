const { configFiles } = require("../../core/config/config");
const { getFileData } = require('../../service/storage_service');
const CryptoJS = require("crypto-js");

exports.validateUser = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		try {
			let reqBody = req.body;
			if (!reqBody.userName || !reqBody.password) {
				throw "User name or password details are missing";
			}

            let users = await getFileData(configFiles.users);
			let userName = reqBody.userName;
			//let password = 	CryptoJS.AES.decrypt(reqBody.password, process.env.SALT).toString();
			let password = 	reqBody.password;
            let user = users.find(user => user['User Name'].trim() === userName.trim() && password === user['Password'].trim());

			if (user) {
				res.status(200).send({
					status: 200,
					result: { userName: user['User Name'], email: user['Email'] }
				});
			} else {
				res.status(401).send({
					status: 401,
					message: "Unauthorized"
				});
			}
		} catch (error) {
			res.status(500).send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}
