import DoctorModel from "./DoctorModel";

class UserModel {
    public id: number;
    public phoneNumber: string;
    public userIdNumber: string;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    public doctor: DoctorModel;
}

export default UserModel;
