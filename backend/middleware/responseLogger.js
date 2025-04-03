const responseLogger = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (data) {
        console.log(new Date().toLocaleDateString(), "Response", data);
        return originalSend.call(this, data)
    }
    next();
}

module.exports = responseLogger;



