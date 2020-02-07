
const User = require("../models/user.model");

const createUser = (userModel) => {
    const user = new User(userModel);

    try {
        user.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const findUser = async (agency) => {
    const user = await User.findOne({ agency });

    return user;
}

const updateUser = async (userModel) => {
    const { agency, balance } = userModel;
    const user = await User.updateOne({ agency }, { balance });

    return user;
}

module.exports = { createUser, findUser, updateUser };