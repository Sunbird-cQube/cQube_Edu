const router = require('express').Router();
const { logger } = require('../../../lib/logger');
const auth = require('../../../middleware/check-auth');
const s3File = require('../../../lib/reads3File');

router.post('/', auth.authController, async (req, res) => {
    try {
        logger.info('--- get district telemetry data api ---');
        let timePeriod = req.body.timePeriod;
        let fileName = `cqube_telemetry/${timePeriod}/districts.json`;
        let data = await s3File.readFileConfig(fileName);
        let fileMetaData = await s3File.getFileMetaData(fileName);
        logger.info('--- get district telemetry data api response sent ---');
        res.send({data: data, fileMetaData});
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
})

module.exports = router