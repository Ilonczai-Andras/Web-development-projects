const applicationService = require('../services/applicationService');

exports.getAllApplications = async (req, res, next) => {
    try {
        const apps = await applicationService.getAll(req.profile.id);
        res.json(apps);
    } catch (err) {
        next(err);
    }
};

exports.createApplication = async (req, res, next) => {
    try {
        const app = await applicationService.create(req.profile.id, req.body);
        res.json(app);
    } catch (err) {
        next(err);
    }
};

exports.updateApplication = async (req, res, next) => {
    try {
        const app = await applicationService.update(req.params.id, req.body);
        res.json(app);
    } catch (err) {
        next(err);
    }
};

exports.deleteApplication = async (req, res, next) => {
    try {
        await applicationService.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};
