import { DoseFrequencyEnum } from "./DoseFrequencyEnum";
import { DoseTypeEnum } from "./DoseTypeEnum";
import { UnitsEnum } from "./UnitsEnum";

class PrescripedMed {
    public name: string;
    public activeSubstance: string;
    public doseType: DoseTypeEnum;
    public doseAmount: number;
    public dosage: number;
    public dosageUnit: UnitsEnum;
    public doseFrequency: DoseFrequencyEnum;
    public numberOfTakingDays: number;

    constructor() {
        this.name="";
        this.activeSubstance="";
        this.doseAmount=0;
        this.dosage=0;
        this.numberOfTakingDays=0;
    }
}

export default PrescripedMed;