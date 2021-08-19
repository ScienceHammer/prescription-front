import DoctorModel from "./DoctorModel";
import { Role } from "./RoleEnum";

class UserModel {
    public id: number;
    public token: string;
    public phoneNumber: string;
    public userIdNumber: string;
    public username: string;
    public password: string;
    public firstName: string = "";
    public lastName: string;
    public email: string;
    public role: Role;
    public doctor: DoctorModel;
    
}

export default UserModel;
