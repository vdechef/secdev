const jwt = require('express-jwt');
const { secret } = require('config.json');
const Role = require('./role');
const Permission = require('./permission');

module.exports = authorize;

function authorize(permission) {

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            let isAuthorized = false
            if (permission === Permission.FREE_ACCESS) {
                // route without permission => allow every authenticated users
                isAuthorized = true
            }
            else if (req.user.role) {
                // retrieve permissions for role
                const role = Role[req.user.role]
                if (role && role.permissions.includes(permission)) {
                    isAuthorized = true
                }
            }
            if (!isAuthorized) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                // authentication and authorization successful
                next();
            }

        }
    ];
}