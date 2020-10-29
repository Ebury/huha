# Vision

HUHA (Hyperactive Users Hint Analysis) is developed thanks to the JavaScript expertise of the [Online team](https://fxsolutions.atlassian.net/wiki/spaces/TEAM/pages/119543461/ONL) members. It is a library, written in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), that helps measure the usability and user experience of a project in an automated way.

Being able to track the user's interaction with our application allows us to analyse how users make use of it, and whether they are understanding it in the same way as we do. So, we gradually get to know each other and allow users and product to go hand in hand towards a common goal: the most pleasant user experience.

Mainly, the library tries to collect metrics similar to those usually gathered during user tests, such as the time a user spends on a task, the effort, the errors or the success of that task.

HUHA is currently being utilised by [Eburyonline](https://online.ebury.com/) through the use of so-called Tasks and Events.

* We understand by Tasks those activities that users will carry out for a period of time, until they are finally considered completed or abandoned.

* We understand by Events those user interactions that we want to register. They may or may not be associated with a Task.

The library allows us to monitor these Tasks and Events using different external services such as [Google Analytics](https://analytics.google.com/analytics/web/), [Intercom](https://www.intercom.com/) or [Segment](https://segment.com/).

Initially, the library only allowed connection to Google Analytics and Intercom. Over time, the possibility of connecting to Segment was also added. Segment is able to send the information directly to Google Analytics and Intercom by itself (in fact, in the case of Eburyonline this is being done), but we still keep the possibility of connecting to them allowing any project to decide to use them, instead of having to resort only to Segment. Any of these three services can be used independently, leaving it up to each project to configure them according to its needs.

HUHA library is accessible through [npm](https://www.npmjs.com/package/@ebury/huha).
