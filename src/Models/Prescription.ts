import PrescripedMed from "./PrescripedMed";
import UserModel from "./UserModel";

class Prescription {
  public patient: UserModel;
  public reason: string;
  public prescribedMeds: PrescripedMed[];
}

export default Prescription;
