
import PermitAPI from "./permit-api";

export default class EnvAgencyAPI extends PermitAPI {
    constructor() {
        super();
        this.name = "Government Environment Agency";
    }
    getRawApplications(): any[] {
        console.log("Getting raw applications from " + this.name + " API");
        return [ {
            "description": "Permit application from " + this.name
        } ];
    }
}
