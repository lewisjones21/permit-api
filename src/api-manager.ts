
import PermitAPI from "./permit-api";
import EnvAgencyAPI from "./env-agency-api";
import PlanitAPI from "./planit-api";

export default class APIManager {
    apiList: PermitAPI[];
    constructor() {
        this.apiList = [
            new EnvAgencyAPI(),
            new PlanitAPI()
        ];
    }
    getData() {
        let sources: string[] = [],
            applications: any[] = [];
        this.apiList.forEach(
            (api) => {
                sources = [ ...sources, api.getApplicationSource() ];
                applications = [ ...applications, ...api.getApplications() ];
            }
        );
        return { sources, applications };
    }
}
