const fs = require("fs");
const path = require("path");
const requestLogger = (req, res, next) => {
    const logDir = path.join(__dirname, "../logs");
    const logPath = path.join(logDir, "req.txt");

    fs.appendFile(logPath, new Date().toLocaleTimeString() + " Request " + req.method + " " + req.url + "\n", (err) => {
        if (err) throw err;
    });
    next();
}

module.exports = requestLogger;
