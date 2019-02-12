# huha.js #

![Chimo Bayo GIF](https://img.buzzfeed.com/buzzfeed-static/static/2015-07/9/15/enhanced/webdr06/anigif_enhanced-28562-1436468716-8.gif?downsize=715:*&output-format=auto&output-quality=auto)

huha.js (Hyperactive Users Hint Analysis) is a JavaScript 
framework that measures the usability and user experience
in an automated way, including the limitations of the 
model and the best practices.

## Documentation ##

### Installation ###

#### NPM ####

NPM is the recommended installation method

```
npm install github:Ebury/huha --save
```

Then you can import the `Huha` class in your application

```javascript
import Huha from '@ebury/huha'
```

#### CDN ####

Alternatively, you can load the script directly from our cdn

```html
<script type="text/javascript" src="https://ebury-huha.s3.amazonaws.com/1.4.0/huha.js"></script>
```

### Reference ###

#### `Huha` class ####

Method | Description |
------------- | ------------- |
`constructor(options)` | Instantiates a new `Huha` class with the given `options`. The `options` argument is an object containing the configuration of the class. Options available are:<br>- `trackOnGoogleAnalytics` (Boolean): Indicates if the task need to be tracked on Google Analytics<br>- `trackOnIntercom` (Boolean): Indicates if the task need to be tracked on Intercom<br>- `trackOnSegment` (Boolean): Indicates if the task need to be tracked on Segment
`createTask(name, parentTask, execId, persistent)` | Creates and returns a `HuhaTask` class with the given `name`. The other params are used for providing extra context:<br>- `parentTask` (Object): Huha parent task. Use it to link child tasks to a parent task via the execId<br>- `execId` (String): Identifier to link events to tasks <br>- `persistent` (Boolean): Indicates if the task should be persisted. If the task is persisted, then you will need to abandon it manually.
`getTask(name)` | Gets an in progress task giving its `name`
`createEvent(name, object, action, section, value, task, eventGroup)` | Creates, tracks (*) and returns a `HuhaEvent` class with the given `name`. The other params are used for providing extra context:<br>- `object`: Name of the object that is being manipulated during the event<br>- `action`: Name of the action that is being executed in the object during the event<br>- `section`: Name of the the section og this event, so it can be grouped as categories<br>- `value`: Value of the action done to the object<br>- `eventGroup`: Identifier of the group this event is linked to<br>- `task`: Task associated to the event

(*) The event is tracked in Google Analytics or Segment based on the `Huha` options.

#### `HuhaTask` class ####

Method | Description |
------------- | ------------- |
`addInteraction()` | Increments the count of effort in 1
`addError()` | Increments the count of errors in 1
`complete()` | Marks the task as completed (*)
`abandon()` | Marks the task as abandoned (*)

(*) When a task is completed or abandoned, is is tracked in Google Analytics, Intercom or Segment based on the `Huha` options.

#### Example ####

```javascript
import Huha from '@ebury/huha';

const huha = new Huha({
  trackOnGoogleAnalytics: false,
  trackOnIntercom: false,
  trackOnSegment: true,
});
const huhaTask = huha.createTask('TaskName');
huhaTask.addInteraction();
huhaTask.addError();
huhaTask.complete();
```

### Automatic tasks ###
It is possible to create tasks and measuring the user activity directly in the DOM without writing Javascript.

Any user activity done in DOM elements having the `data-huha-task` attribute will be monitored using the following
attributes:

Attribute | Description |
------------- | ------------- |
`data-huha-task` | Name of the task that will store the user activity related with the DOM element
`data-huha-trigger` | Javascript event that is listened to for storing the activity: click, focus or change
`data-huha-event` | Type of user activity that is stored when the Javascript event is triggered:<br>- start: Beginning of the task<br>- complete: Completion of the task<br>- abandon: Abandonment of the task<br>- interaction: New interaction in the task<br>- error: New error in the task

#### Example ####

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

## Our story ##

We thought we had to honour the great Chimo Bayo, 
we’ve programmed this while listenting all his hits 
“asi me gusta” and the must-listen “techno valencia”, 
then we thought what if a user interacts with our app 
while listenting Chimo Bayo? Bang! There you have your
Hyperactive User and here we have our Hint Analytics. 
It makes totally sense for us.


