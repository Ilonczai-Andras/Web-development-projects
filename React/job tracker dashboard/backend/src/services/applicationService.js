const Application = require('../models/Application');

exports.getAll = (profile_id) => Application.getApplications(profile_id);
exports.create = (profile_id, data) => Application.createApplication(profile_id, data);
exports.update = (id, data) => Application.updateApplication(id, data);
exports.remove = (id) => Application.deleteApplication(id);