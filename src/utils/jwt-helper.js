export class JwtHelper {
    urlBase64Decode = (str) => {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");

        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += "==";
                break;
            }
            case 3: {
                output += "=";
                break;
            }
            default: {
                throw new Error("Illegal base64url string!");
            }
        }
        return this.b64DecodeUnicode(output);
    };
    b64DecodeUnicode = (str) => {
        return decodeURIComponent(
            Array.prototype.map
                .call(atob(str), (c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
    };

    decodeToken = (token) => {
        if (token !== null && token !== undefined) {
            const parts = token.split(".");
            if (parts.length !== 3) {
                throw new Error("JWT must have 3 parts");
            }
            const decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error("Cannot decode the token");
            }
            return JSON.parse(decoded);
        }
    };

    getTokenExpirationDate(token) {
        if (token !== null && typeof token !== "undefined") {
            let decoded = this.decodeToken(token);

            if (!decoded.hasOwnProperty("exp")) {
                return null;
            }
            const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
            date.setUTCSeconds(decoded.exp);
            return date;
        }
    }

    isTokenExpired = (token, offsetSeconds) => {
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date == null) {
            return false;
        }
        // Token expired?
        // console.log(date.valueOf())
        // console.log(new Date().valueOf() + (offsetSeconds * 1000))
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
}
export default JwtHelper;