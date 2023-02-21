let disableLogs = process.env.DISABLE_LOGS

module.exports = {
    error: (...args) => {
        if (!disableLogs) console.error(...args)
    },
    log: (...args) => {
        if (!disableLogs) console.log(...args)
    }
}