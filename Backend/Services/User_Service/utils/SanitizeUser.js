exports.sanitizeUser = (user) => {
    return { ...user, password: undefined };
}