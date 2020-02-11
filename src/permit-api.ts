
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
    getApplications(): any[] {
        const applications: any[] = this.getRawApplications();
        applications.forEach(
            (application) => {
                application.source = this.getApplicationSource();
            }
        );
        return applications;
    }
    getRawApplications(): any[] {
        console.log("Getting raw applications from " + this.name + " API");
        return [ {
            "description": "Abstract Permit API application; this should not appear in production"
        } ];
    }
}
