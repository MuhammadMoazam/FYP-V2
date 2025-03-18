const bcrypt = require("bcryptjs");
const User = require("../Services/User_Service/models/userModel");
const { sanitizeUser } = require("../Services/User_Service/utils/SanitizeUser");

const getUserData = async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findById(req.user);
            return res.status(200).json(sanitizeUser(user));
        }
        res.sendStatus(401);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findById(req.user);
            if (user) {
                user.userName = req.body.userName || user.userName;
                user.email = req.body.email || user.email;
                user.name.firstName = req.body.names.firstName || user.name.firstName;
                user.name.lastName = req.body.names.lastName || user.name.lastName;

                if (req.body.passwords.currentPassword !== '' && req.body.passwords.newPassword !== '') {
                    // Check if the current password is correct, if not return an error
                    const isCurrentPasswordCorrect = await bcrypt.compare(req.body.passwords.currentPassword, user.password);
                    if (isCurrentPasswordCorrect) {
                        // If the new password is the same as the current password, return an error
                        const isNewPasswordTheSame = await bcrypt.compare(req.body.passwords.newPassword, user.password);
                        if (isNewPasswordTheSame) {
                            return res.status(409).json({ message: "New password should be different from the current password" });
                        }
                        // Hash the new password and save it to the user
                        user.password = await bcrypt.hash(req.body.passwords.newPassword, 10);
                    } else {
                        return res.status(403).json({ message: "Current password is incorrect" });
                    }
                }

                await user.save();
                return res.status(200).json(sanitizeUser(user));
            }
        }
        res.sendStatus(401);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getUserData, updateUser };