const path = require('path');
const { configFiles } = require("../../core/config/config");

exports.getConfig = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, configName } = req.params;

		try {
			if (!appName || !configName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let menu = require(path.join(__dataFolderPath, `${appName}/${configFiles[configName]}`));
			res.status(200).send({
				status: 200,
				result: menu
			});
		} catch (error) {
			res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}
