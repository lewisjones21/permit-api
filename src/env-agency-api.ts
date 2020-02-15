
import requestPromise from "request-promise-native";
import PermitAPI from "./permit-api";

export default class EnvAgencyAPI extends PermitAPI {
    searchURL: string;
    postcodeLookupURL: string;
    constructor() {
        super();
        this.name = "Government Environment Agency";
        this.searchURL
            = "https://environment.data.gov.uk/public-register/api/search.json?_limit=50";
        this.postcodeLookupURL = "https://api.postcodes.io/postcodes/";
    }
    getRawApplications(): Promise<any[]> {
        console.log("Getting raw applications from " + this.name + " API");
        return requestPromise.get(this.searchURL)
            .then((envApplications: string) => Promise.all(JSON.parse(envApplications).items
                .map((itemRef: any) => requestPromise.get(itemRef["@id"] + ".json")
                    .then((itemJSON: any) => {
                        const item = JSON.parse(itemJSON).items[0];
                        // Add default longitude and latitude values for the item
                        item.long = null;
                        item.lat = null;
                        let postcode = item?.site?.siteAddress?.postcode;
                        if (postcode === undefined) {
                            postcode = item?.incident?.incidentSite?.siteAddress?.postal_code;
                        }
                        if (postcode === undefined) {
                            postcode = item?.offender?.hasAddress?.postal_code;
                        }
                        if (postcode !== undefined) {
                            console.log("Valid postcode found");
                            return requestPromise.get(this.postcodeLookupURL + postcode)
                                .then((postcodeDataJSON) => {
                                    const data = JSON.parse(postcodeDataJSON);
                                    if (data.status === 200) {
                                        item.long = data?.result?.longitude;
                                        item.lat = data?.result?.latitude;
                                        console.log(((item.long && item.lat) ? "" : "Invalid ")
                                            + "Long and Lat retrieved for " + postcode);
                                    }
                                    return item;
                                })
                                .catch((error) => {
                                    console.log("Error: " + error.options.uri + " - "
                                        + error.statusCode + " - " + JSON.parse(error.error).error);
                                    return item;
                                });
                        }
                        console.log("Invalid postcode");
                        return item;
                    }))
                .map((promise: Promise<any>) => promise.catch((error) => console.log(error)))))
            .catch((error) => {
                console.log("Error getting data from " + this.name + ":" + error);
                return [];
            });
    }
}
