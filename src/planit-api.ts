
import PermitAPI from "./permit-api";

export default class PlanitAPI extends PermitAPI {
    constructor() {
        super();
        this.name = "PlanIt";
    }
    getRawApplications(): any[] {
        console.log("Getting raw applications from " + this.name + " API");
        return [ {
            "description": "Permit application from " + this.name
        } ];
    }
}
