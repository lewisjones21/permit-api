
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
            await api.getApplications().then((newApplications: any[]) => {
                console.log("Got " + newApplications.length + " new applications from " + api.name);
                applications = [ ...applications, ...newApplications ];
                if (newApplications.length > 0) {
                    sources = [ ...sources, api.getApplicationSource() ];
                }
            }).catch((error: Error) => {
                console.log(error);
            });
        }));
        return { sources, applications };
    }
}
