/**
 * `serverUrl` contains the api location of the server. You would generally get the baseUrl from the manifest.webapp
 * as described here http://dhis2.github.io/dhis2-docs/master/en/developer/html/apps_creating_apps.html
 *
 * `basicAuth` contains the username and password to send with the request as the basic authentication token. This is only needed when you develop locally and need CORS support (https://developer.mozilla.org/en-US/docs/Web/HTTP).
 * You obviously should not do this for your production apps.
 */
const serverUrl = 'http://localhost:8082/api';
const basicAuth = `Basic ${btoa('admin:district')}`;

/**
 * Default options object to send along with each request
 */
const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json',
    },
};

/**
 * `fetch` will not reject the promise on the a http request that is not 2xx, as those requests could also return valid responses.
 * We will only treat status codes in the 200 range as successful and reject the other responses.
 */
function onlySuccessResponses(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}

//https://play.dhis2.org/demo/api/metadata?assumeTrue=false&organisationUnits=true&lastUpdated=2014-08-01
//https://play.dhis2.org/demo/api/metadata.json?assumeTrue=false&organisationUnits=true&lastUpdated=2014-08-01
export function loadOrganisationUnits() {
    // Load the organisation units but only the first level and the do not use paging
    return fetch(`${serverUrl}/metadata?assumeTrue=false&organisationUnits=true&level=4&lastUpdated=2014-08-01`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        // pick the organisationUnits property from the payload
        .then(({ organisationUnits }) => organisationUnits);
}