
import User from '../models/userModel.js';

class UserService {
    async createUser(userModel) {
        const user = new User(userModel);

        try {
            await user.save();

            const userFound = await findUser(userModel.agency);
            
            return userFound;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findUser(agency) {
        const user = await User.findOne({ agency });

        return user;
    }

    async updateUser(userModel) {
        const { agency, balance } = userModel;
        await User.updateOne({ agency }, { balance });

        const user = await findUser(agency);

        return user;
    }
}
export default new UserService();