exports.sanitizeUser = (user) => {
    return { _id: user._id, name: user.name, userName: user.userName, email: user.email, isVerified: user.isVerified, isAdmin: user.isAdmin }
}