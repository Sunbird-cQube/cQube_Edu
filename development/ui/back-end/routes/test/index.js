const express = require('express');
const router = express.Router();
const { getAllFiles } = require('../../service/storage_service');

router.post("/azure", (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        try {
			getAllFiles().then(files => {
				res.status(200).send({
					status: 200,
					result: files
				})
			}).catch(error => {
				res.send({
					status: error.status || 500,
					message: error.message || "Internal server error",
					errorObject: error
				});
			});
        } catch(error) {
            res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
        }
    });
});

module.exports = router;
