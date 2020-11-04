# HUHA

This repository contains the source code for HUHA (Hyperactive Users Hint Analysis).

HUHA is a JavaScript library that helps measure the usability and user experience of a project in an automated way.

1. [Vision](VISION.md)
1. [Code Owners](CODEOWNERS)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Prerequisites](#prerequisites)
1. [Contributing](#contributing)
1. [References](#references)

## Installation

If you want to contribute to the library then you will have to clone the repository and install all dependencies:

```sh
git clone https://github.com/Ebury/huha.git
cd huha
npm install
```

## Usage

If you want to use the library in your project then you will have to install it (via [npm](https://www.npmjs.com/package/@ebury/huha)) as a dependency:

```sh
npm install github:Ebury/huha --save
```

And then you can import the `Huha` class in your application:

```javascript
import Huha from '@ebury/huha'
```

Alternatively, you can load the script directly from our `cdn`, specifying the desired version:

```html
<script type="text/javascript" src="https://ebury-huha.s3.amazonaws.com/3.0.0/huha.js"></script>
```

#### `Huha` class ####

Method | Description |
------------- | ------------- |
`constructor(options)` | Instantiates a new `Huha` class with the given `options`. The `options` argument is an object containing the configuration of the class. Options available are:<br>- `trackOnGoogleAnalytics` (Boolean): Indicates if the task need to be tracked on Google Analytics.<br>- `trackOnIntercom` (Boolean): Indicates if the task need to be tracked on Intercom.<br>- `trackOnSegment` (Boolean): Indicates if the task need to be tracked on Segment.
`createTask({ name: 'TaskName' })` | Creates and returns a `HuhaTask` class. The `properties` argument is an object containing the given `name` and the other fields are used for providing extra context:<br>- `label`: Label of the task (by default is the task name).<br>- `category`: Name of the category of the task.<br>- `value`: Value of the action done to the object.<br>- `parentTask` (Object): Huha parent task. Use it to link child tasks to a parent task via the execId.<br>- `execId` (String): Identifier to link events to tasks.<br>- `persistent` (Boolean): Indicates if the task should be persisted. If the task is persisted, it will be saved on localStorage and you will need to abandon it manually
`getTask(name)` | Gets an in progress task giving its `name`
`createEvent({ name: 'EventName' })` | Creates, tracks (*) and returns a `HuhaEvent` class with the given `name`. The `properties` argument is an object containing the given `name` and the other fields are used for providing extra context:<br>- `object`: Name of the object that is being manipulated during the event.<br>- `action`: Name of the action that is being executed in the object during the event.<br>- `category`: Name of the the section of this event, so it can be grouped as categories.<br>- `value`: Value of the action done to the object.<br>- `eventGroup`: Identifier of the group this event is linked to.<br>- `task`: Task associated to the event.

(*) The event is tracked in Google Analytics or Segment based on the `Huha` options.

#### `HuhaTask` class ####

Method | Description |
------------- | ------------- |
`addInteraction()` | Increments the count of effort in 1.
`addError()` | Increments the count of errors in 1.
`complete()` | Marks the task as completed. (*)
`abandon()` | Marks the task as abandoned. (*)

(*) When a task is completed or abandoned, it is tracked in Google Analytics, Intercom or Segment based on the `Huha` options.

Example:

```javascript
import Huha from '@ebury/huha';

const huha = new Huha({
  trackOnGoogleAnalytics: false,
  trackOnIntercom: false,
  trackOnSegment: true,
});

const huhaTask = huha.createTask({ name: 'TaskName' });
huhaTask.addInteraction();
huhaTask.addError();
huhaTask.complete();

const huhaEvent = huha.createEvent({
  name: 'Event Name',
  action: 'Click',
  category: 'Dashboard',
  object: 'Download button',
  task: huhaTask
});
```

### Automatic tasks ###
It is possible to create tasks and measuring the user activity directly in the DOM without writing Javascript.

Any user activity done in DOM elements having the `data-huha-task` attribute will be monitored using the following
attributes:

Attribute | Description |
------------- | ------------- |
`data-huha-task` | Name of the task that will store the user activity related with the DOM element.
`data-huha-trigger` | Javascript event that is listened to for storing the activity: click, focus or change.
`data-huha-event` | Type of user activity that is stored when the Javascript event is triggered:<br>- start: Beginning of the task.<br>- complete: Completion of the task.<br>- abandon: Abandonment of the task.<br>- interaction: New interaction in the task.<br>- error: New error in the task.

Example:

```html
<button type="button" data-huha-task="TaskName" data-huha-trigger="click" data-huha-event="start">Start task</button>
<input type="text" data-huha-task="TaskName" data-huha-trigger="focus" data-huha-event="interaction">
<select data-huha-task="TaskName" data-huha-trigger="change" data-huha-event="interaction">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
<button type="button" data-huha-task="TaskName" data-huha-trigger="click" data-huha-event="error">Error</button>
<button type="button" data-huha-task="TaskName" data-huha-trigger="click" data-huha-event="abandon">Abandon</button>
<button type="button" data-huha-task="TaskName" data-huha-trigger="click" data-huha-event="complete">Complete</button>
```

## Prerequisites

For the correct registration of the information in the tracking tools it is required that the set-up scripts of those tools to be used have been executed, which will define the necessary global variables. For instance, if the option `trackOnSegment` is set to `true`, HUHA expects to find the Segment corresponding global variable,  [analytics](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/), filled in.

## Contributing

We love collaborating with other teams and welcome contributions!

See the [contributing](CONTRIBUTING.md) docs for more info on code style, linting, and testing. Or if you want to report a problem or request some change.

## References

### Development

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Testing

[Jest](https://jestjs.io/)

### Package management

[npm](https://www.npmjs.com/)

### Tools to collect customers data

[Google Analytics](https://analytics.google.com/analytics/web/)

[Intercom](https://www.intercom.com/)

[Segment](https://segment.com/).
