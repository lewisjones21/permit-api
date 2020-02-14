
import PermitAPI from "./permit-api";

export default class PlanitAPI extends PermitAPI {
    constructor() {
        super();
        this.name = "PlanIt";
    }
    getRawApplications(): Promise<any[]> {
        console.log("Getting raw applications from " + this.name + " API");
        return new Promise((resolve) => setTimeout(() => resolve([ {
            "description": "Permit application from " + this.name
        } ]), 100));
    }
}
