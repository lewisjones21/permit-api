
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
    async getData() {
        let sources: string[] = [],
            applications: any[] = [];
        await Promise.all(this.apiList.map(async(api):Promise<any> => {
            sources = [ ...sources, api.getApplicationSource() ];
            await api.getApplications().then((newApplications: any[]) => {
                console.log("Got new applications: " + JSON.stringify(newApplications));
                applications = [ ...applications, ...newApplications ];
            });
        }));
        return { sources, applications };
    }
}
