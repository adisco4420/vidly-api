import * as Sentry from '@sentry/browser';

function init() {
    Sentry.init({dsn: "https://13b2240094d244059a6a6c99ed6ad32f@sentry.io/1493270"});    
}
function log(error) {
    Sentry.captureException(error);    
}

export default {
    init,
    log
}