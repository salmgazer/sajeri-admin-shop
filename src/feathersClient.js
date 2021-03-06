import feathers from "@feathersjs/client";
import auth from "@feathersjs/authentication-client";

export const host = 'http://localhost:4100';
export const authOptions = { jwtStrategy: 'jwt', storage: window.localStorage };

export default feathers()
    .configure(feathers.rest(host).fetch(window.fetch.bind(window)))
    .configure(auth(authOptions));
