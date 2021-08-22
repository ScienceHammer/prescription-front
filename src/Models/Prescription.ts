import PrescripedMed from "./PrescripedMed";
import UserModel from "./UserModel";

class Prescription {
    public id: number;
    public patient: UserModel;
    public doctor: UserModel;
    public reason: string;
    public prescribedMeds: PrescripedMed[];
}

export default Prescription;
