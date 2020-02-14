
export default class PermitAPI {
    name: string;
    constructor() {
        this.name = "Abstract Permit";
        if (new.target === PermitAPI) {
            throw new TypeError("Cannot construct abstract PermitAPI instances");
        }
    }
    getApplicationSource(): string {
        return this.name;
    }
    getApplications(): Promise<any[]> {
        return this.getRawApplications().then((rawApplications) => {
            rawApplications.forEach(
                (application) => {
                    application.source = this.getApplicationSource();
                }
            );
            return rawApplications;
        });
    }
    getRawApplications(): Promise<any[]> {
        console.log("Getting raw applications from " + this.name + " API");
        return new Promise((resolve) => resolve([ {
            "description": "Abstract Permit API application; this should not appear in production"
        } ]));
    }
}
