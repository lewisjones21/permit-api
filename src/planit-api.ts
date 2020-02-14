
import requestPromise from "request-promise-native";
import PermitAPI from "./permit-api";

export default class PlanitAPI extends PermitAPI {
    sourceURL: string;
    constructor() {
        super();
        this.name = "PlanIt";
        this.sourceURL = "https://www.planit.org.uk/api/applics/json?compress&limit=50&recent=50";
    }
    getRawApplications(): Promise<any[]> {
        console.log("Getting raw applications from " + this.name + " API");
        return requestPromise.get(this.sourceURL)
            .then((planitApplications) => JSON.parse(planitApplications).records)
            .catch((error) => {
                console.log("Error getting data from " + this.name + ":" + error);
                return [];
            });
    }
}
