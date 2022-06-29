const path = require('path');

exports.getMenu = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        let menu = require(path.join(__dataFolderPath, 'config/Menu.json'));

		try {
			res.status(200).send({
				status: 200,
				result: menu
			})
		} catch (error) {
			res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}

exports.getDashboardMenu = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        let menu = require(path.join(__dataFolderPath, 'config/DashboardMenu.json'));

		try {
			res.status(200).send({
				status: 200,
				result: menu
			})
		} catch (error) {
			res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}
