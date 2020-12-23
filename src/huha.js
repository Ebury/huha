/* global ga, Intercom, gtag, analytics, localStorage */

// TODO: Remove after addressing the story ONL-5293
/* eslint max-classes-per-file: ["error", 3] */

import uuidv1 from 'uuid/v1';

const { document } = global;

const IN_PROGRESS = 'In progress';
const COMPLETED = 'Completed';
const ABANDONED = 'Abandoned';

const DEFAULTS = {
  trackOnGoogleAnalytics: false,
  trackOnIntercom: false,
  trackOnSegment: true,
};

/**
 * Class that will store an individual task to be analysed
 */
class HuhaTask {
  /**
   * Constructor of the HuhTask
   * @param props of the task {object} contain the next fields:
   * - name {string} Name of the task
   * - label {string} Label of the task (if it is not defined, by default is the task name)
   * - category {string} Name of the category of the task
   * - value {string} Value of the action done to the object
   * - parentTask {object} huha parent task
   * - execId {string} Identifier to link events to tasks
   * - persistent {boolean} Indicates if the task should be persisted.
   * @param options {object} Object containing the configuration of the class. Options available
   * are:
   * - trackOnGoogleAnalytics (Boolean): Indicates if the task needs to be tracked on Google
   *   Analytics
   * - trackOnIntercom (Boolean): Indicates if the task needs to be tracked on Intercom
   * - trackOnSegment (Boolean): Indicates if the task needs to be tracked on Segment
   */
  constructor(props, options) {
    this.name = props.name;
    this.label = props.label || props.name;
    this.category = props.category || '';
    this.value = props.value;
    this.status = IN_PROGRESS;
    this.effort = 0;
    this.errors = 0;
    this.start = new Date().getTime();
    this.end = null;
    this.parentExecId = null;
    this.trackOnGoogleAnalytics = options.trackOnGoogleAnalytics;
    this.trackOnIntercom = options.trackOnIntercom;
    this.trackOnSegment = options.trackOnSegment;
    if (props.parentTask) {
      this.parentTask = props.parentTask;
      this.parentExecId = props.parentTask.execId;
    }
    this.execId = props.execId || uuidv1();
    this.persistent = props.persistent || false;
  }

  /**
   * Increments the count of effort in 1
   */
  addInteraction() {
    this.effort += 1;
    if (this.parentTask) {
      this.parentTask.addInteraction();
      this.updateFromLocalStorage();
    }
  }

  /**
   * Increments the count of errors in 1
   */
  addError() {
    this.errors += 1;
    if (this.parentTask) {
      this.parentTask.addError();
      this.updateFromLocalStorage();
    }
  }

  /**
   * Marks the task as finished according to the given status and then it is tracked.
   * @param status {string} New status of the task
   */
  finish(status) {
    if (this.status === IN_PROGRESS) {
      this.end = new Date().getTime();
      this.status = status;
      this.track();
      this.removeFromLocalStorage();
    }
  }

  /**
   * Marks the task as completed
   */
  complete() {
    this.finish(COMPLETED);
  }

  /**
   * Marks the task as abandoned
   */
  abandon() {
    this.finish(ABANDONED);
  }

  /**
   * Tracks the task in external services like Google Analytics, Intercom or Segment
   */
  track() {
    if (this.trackOnGoogleAnalytics) {
      this.sendToGoogleAnalytics();
    }

    if (this.trackOnIntercom) {
      this.sendToIntercom();
    }

    if (this.trackOnSegment) {
      this.sendToSegment();
    }
  }

  /**
   * Gets the elapsed time of the task
   * @returns {number}
   */
  get time() {
    let time = 0;
    if (this.end) {
      time = this.end - this.start;
    }
    return time;
  }

  /**
   * Tracks the task in Google Analytics using an User Timing (for indicating the elapsed time) and
   * 2 events (for indicating the errors and the effort)
   */
  sendToGoogleAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        event_category: this.name,
        event_label: 'Time on task',
        value: this.time,
        name: this.status,
      });
      gtag('event', this.status, {
        event_category: this.name,
        event_label: 'Error',
        value: this.errors,
      });
      gtag('event', this.status, {
        event_category: this.name,
        event_label: 'Effort',
        value: this.effort,
      });
    } else if (typeof ga !== 'undefined') {
      ga('send', 'timing', this.name, this.status, this.time, 'Time on task');
      ga('send', 'event', this.name, this.status, 'Error', this.errors);
      ga('send', 'event', this.name, this.status, 'Effort', this.effort);
    }
  }

  /**
   * Tracks the task using a single Event in Intercom. The elapsed time, the errors and the effort
   * are included as metadata
   */
  sendToIntercom() {
    if (typeof Intercom !== 'undefined') {
      Intercom('trackEvent', this.name, {
        errors: this.errors,
        effort: this.effort,
        time: this.time,
        status: this.status,
        execId: this.execId,
        persistent: this.persistent,
        parentExecId: this.parentExecId,
        category: this.category,
        value: this.value || this.time,
        label: this.label,
      });
    }
  }

  /**
   * Tracks the task using a single Event in Segment. The elapsed time, the errors, the effort,
   * the result and when the task was started are included as properties
   */
  sendToSegment() {
    if (typeof analytics !== 'undefined') {
      analytics.track(this.name, {
        name: this.name,
        label: this.label,
        category: this.category,
        value: this.value || this.time,
        action: this.status,
        errors: this.errors,
        effort: this.effort,
        time: this.time,
        result: this.status,
        started: this.start,
        execId: this.execId,
        persistent: this.persistent,
        parentExecId: this.parentExecId,
      });
    }
  }

  /**
   * Updates the parent task from localStorage if is persistent
   */
  updateFromLocalStorage() {
    if (this.parentTask.persistent) {
      localStorage.setItem(this.parentTask.name, JSON.stringify(this.parentTask));
    }
  }

  /**
   * Removes task from localStorage if is persistent
   */
  removeFromLocalStorage() {
    if (this.persistent) {
      localStorage.removeItem(this.name);
    }
  }
}

/**
 * Class that will store an individual event to be tracked
 */
class HuhaEvent {
  /**
   * Constructor of the HuhaEvent
   * @param props of the event {object} contain the next fields:
   * - name {string} Name of the event
   * - object {string} Name of the object that is being manipulated during the event
   * - action {string} Name of the action that is being executed in the object during the event
   * - category {string} Name of the the section of this event, so it can be grouped as categories
   * - value {string} Value of the action done to the object
   * - task {string|HuhaTask} Task associated to the event
   * - eventGroup {string} Identifier of the group this event is linked to
   * @param options {object} Object containing the configuration of the class. Options available
   * are:
   * - trackOnGoogleAnalytics (Boolean): Indicates if the task needs to be tracked on Google
   *   Analytics
   * - trackOnSegment (Boolean): Indicates if the task needs to be tracked on Segment
   */
  constructor(props, options) {
    this.name = props.name;
    this.object = props.object;
    this.action = props.action;
    this.category = props.category;
    this.value = props.value;
    this.task = props.task;
    if (props.eventGroup) {
      this.eventGroup = props.eventGroup;
    } else if (this.task && this.task.execId) {
      this.eventGroup = this.task.execId;
    } else {
      this.eventGroup = uuidv1();
    }

    this.trackOnGoogleAnalytics = options.trackOnGoogleAnalytics;
    this.trackOnSegment = options.trackOnSegment;
  }

  /**
   * Tracks the event in external services like Google Analytics or Segment
   */
  track() {
    if (this.trackOnGoogleAnalytics) {
      this.sendToGoogleAnalytics();
    }

    if (this.trackOnSegment) {
      this.sendToSegment();
    }
  }

  /**
   * Tracks the event using a event in Google Analytics
   */
  sendToGoogleAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('event', this.action, {
        event_category: this.category,
        event_label: this.object,
        value: this.value,
      });
    } else if (typeof ga !== 'undefined') {
      ga('send', 'event', this.category, this.action, this.object, this.value);
    }
  }

  /**
   * Tracks the event using a event in Segment
   */
  sendToSegment() {
    if (typeof analytics !== 'undefined') {
      analytics.track(this.name, {
        category: this.category,
        label: this.object,
        action: this.action,
        value: this.value,
        eventGroup: this.eventGroup,
      });
    }
  }
}

/**
 * Class that will store all the tasks that are needed to be analysed
 */
class Huha {
  /**
   * Constructor of the Huha class
   * @param options {object} Object containing the configuration of the class. Options available
   * are:
   * - trackOnGoogleAnalytics (Boolean): Indicates if the task need to be tracked on Google
   *   Analytics
   * - trackOnIntercom (Boolean): Indicates if the task need to be tracked on Intercom
   * - trackOnSegment (Boolean): Indicates if the task need to be tracked on Segment
   */
  constructor(options) {
    this.tasks = [];
    this.events = [];
    const mergedOptions = { ...DEFAULTS, ...options };
    this.trackOnGoogleAnalytics = mergedOptions.trackOnGoogleAnalytics;
    this.trackOnIntercom = mergedOptions.trackOnIntercom;
    this.trackOnSegment = mergedOptions.trackOnSegment;

    this.setUpEvents();
  }

  /**
   * Creates and returns a task with the given name. If another task with the same name already
   * exists, it will be abandoned
   * @param properties of the task {object} contain the next fields:
   * - name {string} Name of the task.
   * - label {string} Label of the task (if it is not defined, by default is the task name)
   * - category {string} Name of the category of the task
   * - value {string} Value of the action done to the object
   * - parentTask {object} huha parent task.
   * - execId {string} Identifier to link events to tasks.
   * - persistent {boolean} Indicates if the task should be persisted.
   * @returns {HuhaTask}
   */
  createTask(properties) {
    const existingTask = this.getTask(properties.name);
    if (typeof existingTask !== 'undefined' && !existingTask.persistent) {
      existingTask.abandon();
    }
    let huhaTask = null;
    if (existingTask && existingTask.persistent) {
      huhaTask = existingTask;
    } else {
      huhaTask = new HuhaTask(properties, {
        trackOnGoogleAnalytics: this.trackOnGoogleAnalytics,
        trackOnIntercom: this.trackOnIntercom,
        trackOnSegment: this.trackOnSegment,
      });
      if (properties.persistent) {
        // If persistent, then saves the huha task in localStorage
        localStorage.setItem(huhaTask.name, JSON.stringify(huhaTask));
      }
    }

    this.tasks.push(huhaTask);

    return huhaTask;
  }

  /**
   * Creates, tracks and returns a event with the given data
   * @param properties of the event {object} contain the next fields:
   * - name {string} Name of the event
   * - object {string} Name of the object that is being manipulated during the event
   * - action {string} Name of the action that is being executed in the object during the event
   * - category {string} Name of the the section of this event, so it can be grouped as categories
   * - value {string} Value of the action done to the object
   * - task {string|HuhaTask} Task associated to the event
   * - eventGroup {string} Identifier of the group this event is linked to
   * @returns {HuhaEvent}
   */
  createEvent(properties) {
    const huhaEvent = new HuhaEvent(properties, {
      trackOnGoogleAnalytics: this.trackOnGoogleAnalytics,
      trackOnSegment: this.trackOnSegment,
    });

    huhaEvent.track();

    this.events.push(huhaEvent);

    return huhaEvent;
  }

  /**
   * Gets an in progress task giving its name. First, we search in the dictionary.
   * If the task is not found, then we search in localStorage.
   * If the task is in localStorage, JSON can not serialize functions, so
   * we create an aux task to get the prototype and set it to the task got.
   * @param name {string} Name of the task
   * @returns {HuhaTask}
   */
  getTask(name) {
    let searchTask = this.tasks.find((task) => task.name === name && task.status === IN_PROGRESS);
    if (!searchTask) {
      searchTask = JSON.parse(localStorage.getItem(name)) || undefined;
      if (searchTask) {
        const properties = { name };
        const auxTask = new HuhaTask(properties, {});
        Object.setPrototypeOf(searchTask, Object.getPrototypeOf(auxTask));

        // If the task found has parentTask, set also the prototype to access to the methods.
        if (searchTask.parentTask) {
          Object.setPrototypeOf(searchTask.parentTask, Object.getPrototypeOf(auxTask));
        }
      }
    }
    return searchTask;
  }

  /**
   * Adds all the event listeners needed
   */
  setUpEvents() {
    // Abandon all tasks in progress if the user exits the page
    global.addEventListener('unload', () => {
      this.abandonInProgressTasks();
    });

    // Listen to events defined directly on the DOM
    const events = ['click', 'focus', 'change'];
    events.forEach((eventName) => {
      document.querySelector('body').addEventListener(eventName, (evt) => {
        if (evt.target.dataset && 'huhaTask' in evt.target.dataset) {
          this.registerEvent(eventName, evt.target);
        }
      }, true);
    });
  }

  /**
   * Registers the action of the given element in the task defined on the element
   * @param capturedEvent {string} Name of the event captured. If this event is the same than the
   * one defined on the element, the action will be registered
   * @param element {object} Element that has triggered the captured event
   */
  registerEvent(capturedEvent, element) {
    const { dataset } = element;
    const taskName = dataset.huhaTask;
    const actionTrigger = dataset.huhaTrigger;
    const eventType = dataset.huhaEvent;

    if (capturedEvent === actionTrigger) {
      if (eventType === 'start') {
        this.createTask({ name: taskName });
      } else {
        const task = this.getTask(taskName);
        if (task) {
          if (eventType === 'complete') {
            task.complete();
          } else if (eventType === 'abandon') {
            task.abandon();
          } else if (eventType === 'interaction') {
            task.addInteraction();
          } else if (eventType === 'error') {
            task.addError();
          }
        }
      }
    }
  }

  /**
   * Abandons all the tasks that are in progress
   */
  abandonInProgressTasks() {
    const pendingTasks = this.tasks.filter((task) => task.status === IN_PROGRESS);
    pendingTasks.forEach((task) => {
      if (!task.persistent) {
        task.abandon();
      }
    });
  }
}

module.exports = Huha;
module.exports.HuhaTask = HuhaTask;
module.exports.HuhaEvent = HuhaEvent;
