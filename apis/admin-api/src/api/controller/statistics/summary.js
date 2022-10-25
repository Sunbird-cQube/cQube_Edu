const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
const s3File = require('../../lib/readFiles')

router.post('/stdAttendance', auth.authController, async (req, res) => {
    try {
        logger.info('---attendance summary api ---');
        var fileName = 'log_summary/log_summary_student_attendance.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- attendance summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/teacherAttedndance', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha TPD summary api ---');
        var fileName = 'log_summary/log_summary_teacher_attendance.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha TPD summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/sem', auth.authController, async (req, res) => {
    try {
        logger.info('---semester summary api ---');
        var fileName = 'log_summary/log_summary_sat.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- semester summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/crc', auth.authController, async (req, res) => {
    try {
        logger.info('---crc summary api ---');
        var fileName = 'log_summary/log_summary_crc_loc.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- crc summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/infra', auth.authController, async (req, res) => {
    try {
        logger.info('---infra summary api ---');
        var fileName = 'log_summary/log_summary_infra.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- infra summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/inspec', auth.authController, async (req, res) => {
    try {
        logger.info('---inspection summary api ---');
        var fileName = 'log_summary/log_summary_inspec.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- inspection summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/stDist', auth.authController, async (req, res) => {
    try {
        logger.info('---district static summary api ---');
        var fileName = 'log_summary/static/log_summary_district.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- district static summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/stBlock', auth.authController, async (req, res) => {
    try {
        logger.info('---block static summary api ---');
        var fileName = 'log_summary/static/log_summary_block.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- block static summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/stCluster', async (req, res) => {
    try {
        logger.info('---cluster static summary api ---');
        var fileName = 'log_summary/static/log_summary_cluster.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- cluster static summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/stSchool', auth.authController, async (req, res) => {
    try {
        logger.info('---school static summary api ---');
        var fileName = 'log_summary/static/log_summary_school.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- school static summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/summaryDiksha', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha summary api ---');
        var fileName = 'log_summary/log_summary_diksha.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/summaryUDISE', auth.authController, async (req, res) => {
    try {
        logger.info('---udise summary api ---');
        var fileName = 'log_summary/log_summary_udise.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- udise summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/summaryPAT', auth.authController, async (req, res) => {
    try {
        logger.info('---pat summary api ---');
        var fileName = 'log_summary/log_summary_pat.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- pat summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/summarySAT', auth.authController, async (req, res) => {
    try {
        logger.info('---sat summary api ---');
        var fileName = 'log_summary/log_summary_sat.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- sat summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/summaryDikshaTPD', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha TPD summary api ---');
        var fileName = 'log_summary/log_summary_diksha_tpd.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha TPD summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});


router.post('/dikshaProgramDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha program details summary api ---');
        var fileName = 'log_summary/static/diksha_enrolment/log_summary_diksha_program_details.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha program details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaProgramCourseDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha program  course details summary api ---');
        var fileName = 'log_summary/static/diksha_enrolment/log_summary_diksha_program_course_details.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha program course details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaCourseDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha course details summary api ---');
        var fileName = 'log_summary/static/diksha_enrolment/log_summary_diksha_course_details.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha course details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaCourseEnrolment', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha course enrollment summary api ---');
        var fileName = 'log_summary/static/diksha_enrolment/log_summary_diksha_course_enrolment.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha course enrollment summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaEtbEnrolment', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha etb enrollment summary api ---');
        var fileName = 'log_summary/static/diksha_enrolment/log_summary_diksha_etb_enrolment.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha etb enrollment summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/gradeDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha grade details summary api ---');
        var fileName = 'log_summary/static/log_summary_grade_details.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha grade details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/subjectDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha subject details summary api ---');
        var fileName = 'log_summary/static/log_summary_subject_details.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha subject details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});
router.post('/schoolDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha subject details summary api ---');
        var fileName = 'log_summary/static/log_summary_school.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha subject details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});
router.post('/textBookDetails', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha subject details summary api ---');
        var fileName = 'log_summary/log_summary_textbook_distribution.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha subject details summary api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});
router.post('/dikshaLearningSessions', auth.authController, async (req, res) => {
    try {
        logger.info('---diksha Learning sessions summary api ---');
        var fileName = 'log_summary/log_summary_diksha_learning_sessions.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- diksha learning sessions api response sent---', summaryData);
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/mainMetrics', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_main_metrics.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaEtbCoverage', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_vsk_diksha_etb_coverage-status.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaEtbLearningSession', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_etb_learning-session.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaEtbPlaysPercapita', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_etb_plays-per-capita.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaEtbProgramStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_etb_program-started.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaEtbQrCoverage', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_vsk_diksha_etb_qr-coverage.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaNishthaCourseConsumed', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_nishtha_consumption-by-course.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaNishthaConsumeDistrict', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_nishtha_consumption-by-district.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaNishthaEnrolCert', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_nishtha_percentage-enrollment-certification.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaNishthaProgramStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_nishtha_program-started.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaNishthaCourseMedium', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_nishtha_tot-courses-medium.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaQuizStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_quiz-started-plan.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaQuizProgramStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_quiz_program-started.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            logger.info("Diksha Quiz program",summaryData);
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/dikshaQuizStatePart', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_diksha_quiz_state-participation.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});


router.post('/microImprovDashboard', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_micro-improvement_all-dashboard.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/microImprovDistrict', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_micro-improvement_district.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/nasAllDashboard', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_nas_all-dashboard.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/nasProgramStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_nas_program-started.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/ncfAllDashboard', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_ncf_all-dashboard.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/nipunContentConsumed', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_nipunbharat_content-consumption.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/nipunCoveredByLoText', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_nipunbharat_lo-covered-by-textbook.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/pgiAllDashboard', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_pgi_all-dashboard.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/pgiProgramStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_pgi_program-started.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/pgiStatePerformace', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_pgi_state-wise-performance.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/pmPoshanAccessIndia', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_pm-poshan_access-across-india.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/pmPoshanStateOnboard', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_pm-poshan_state-onboarded.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/udiseAllDashboard', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_udise-all-dashboard.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/udiseProgramStarted', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_udise_program-started.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/summaryUsers', auth.authController, async (req, res) => {
    try {
        logger.info('---Main Metrics api ---');
        var fileName = 'log_summary/log_summary_users.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});
router.post('/dikshaetbetbcoverage', auth.authController, async (req, res) => {
    try {
        logger.info('---Etb Etb coverage api ---');
        var fileName = 'log_summary/log_summary_diksha_etb_etb-coverage.json';
        let summaryData = await s3File.readFileConfig(fileName);
        logger.info('--- Main Metrics api response sent---');
        if (summaryData == null || summaryData == '') {
            res.send([]);
        } else {
            res.send(summaryData)
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});




module.exports = router