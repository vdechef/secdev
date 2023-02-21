const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Permission = require('_helpers/permission');
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(Permission.LIST_USERS), getAll); // admin only
router.get('/:id', authorize(Permission.VIEW_PROFILE), getById);       // all authenticated users
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUserId = req.user.sub;
    const id = parseInt(req.params.id);

    // only allow users with LIST_USERS permission to access other users records
    if (id !== currentUserId) {
        const role = Role[req.user.role]
        if (!role || !role.permissions.includes(Permission.LIST_USERS)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}