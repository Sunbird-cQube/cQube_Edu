const express = require('express');
const router = express.Router();
const { getAllFiles, getFileData, getFileRawData, uploadFile } = require('../../service/storage_service');
const path = require('path');
const XLSX = require('xlsx');
const csvToJson = require('csvtojson');

router.post("/azure", (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        try {
			let files = await getAllFiles();
			
			res.status(200).send({
				status: 200,
				result: files
			})
        } catch(error) {
            res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
        }
    });
});

router.post("/azure2", (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        try {
			let rawData = await getFileRawData('dashboard/Bhasha Sangam Enrolment.csv');
			
			res.status(200).send({
				status: 200,
				result: rawData
			})
        } catch(error) {
            res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
        }
    });
});

router.post("/azure3", (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        try {
			let rawData = await getFileRawData('nishtha/nishtha_coverage_state_wise.xlsx');
			
			await convertRawDataToJSONAndUploadToS3(rawData, 'nishtha/nishtha_coverage_state_wise.xlsx');

			res.status(200).send({
				status: 200,
				result: 'Success'
			})
        } catch(error) {
            res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
        }
    });
});

router.post("/azure4", (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        try {
			let rawData = await getFileData('nishtha/nishtha_coverage_state_wise.json');

			res.status(200).send({
				status: 200,
				result: rawData
			})
        } catch(error) {
            res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
        }
    });
});

async function convertRawDataToJSONAndUploadToS3(fileContent, fileKey) {
	let fileExt = path.extname(fileKey).substring(1);
	let fileName = path.join(path.dirname(fileKey),path.basename(fileKey, path.extname(fileKey))).replace(/\\/g, "/").replace('input_files', 'converted');

	if (fileExt === 'xlsx') {
		const workbook = XLSX.read(fileContent);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		
		reportRawData = XLSX.utils.sheet_to_json(worksheet);
	} else {
		let tempFilePath = path.join(__basedir, `temp/${path.basename(fileKey)}`);
		fs.writeFileSync(tempFilePath, fileContent.toString('utf-8'));
		reportRawData = await csvToJson({
			trim: true
		}).fromFile(tempFilePath);
		fs.unlinkSync(tempFilePath);
	}

	uploadFile(fileName, reportRawData);
}

module.exports = router;
