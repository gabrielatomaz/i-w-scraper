
const User = require("../models/user.model");

const createUser = async (userModel) => {
    const user = new User(userModel);

    try {
        await user.save();

        const userFound = await findUser(userModel.agency);
        
        return userFound;
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
    await User.updateOne({ agency }, { balance });

    const user = await findUser(agency);

    return user;
}

module.exports = { createUser, findUser, updateUser };