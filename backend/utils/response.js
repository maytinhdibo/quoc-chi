module.exports.unauth = () => {
    return {
        success: false,
        reason: 'unauthorized',
    }
};

module.exports.success = (data) => {
    return {
        success: true,
        data: data
    }
};

module.exports.fail = (err) => {
    return {
        success: false,
        reason: err,
    }
};