// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    fmcTopic: 'its_topic',
    fmcChannel: 'fcm_its_channel',
    domain: '192.168.0.2:8080',
    serverUrl: 'http://192.168.0.2:8080',
    availableTasksEndpoint: '/api/availableTasks',
    acceptedTasksEndpoint: '/api/acceptedTasks',
    taskEndpoint: '/api/task',
    loginEndpoint: '/api/auth/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
