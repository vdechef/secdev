const Permission = require("./permission")

module.exports = {
    Admin: {
        name: "Admin",
        permissions: [
            Permission.LIST_USERS,
            Permission.VIEW_PROFILE
        ]
    },
    User: {
        name: "User",
        permissions: [
            Permission.VIEW_PROFILE
        ]
    },
    Guest: {
        name: "Guest",
        permissions: [
            // nothing. Only FREE_ACCESS will be allowed for guests
        ]
    }
}