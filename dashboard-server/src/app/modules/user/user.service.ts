
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = await User.create(payload);
    return newUser;
};

const getSingleUserFromDB = async (id: string) => {

    const user = await User.findById(id);
    //console.log("userrrrrrrrrrrr",user);
    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const updateUserProfile = async (id: string, updateData:Partial<IUser>) => {
    const updatedBike = await User.findByIdAndUpdate(id, updateData, { new: true }); 
    return updatedBike;
};

export const userServices = {
    createUserIntoDB,
    getSingleUserFromDB,
    updateUserProfile,
};

