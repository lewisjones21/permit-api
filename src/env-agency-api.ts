
import PermitAPI from "./permit-api";

export default class EnvAgencyAPI extends PermitAPI {
    constructor() {
        super();
        this.name = "Government Environment Agency";
    }
    getRawApplications(): Promise<any[]> {
        console.log("Getting raw applications from " + this.name + " API");
        return new Promise((resolve) => resolve([]));
    }
}
