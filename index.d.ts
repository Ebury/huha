export enum HuhaTaskStatus {
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
  ABANDONED = 'Abandoned',
}

export interface HuhaOptions {
  trackOnGoogleAnalytics?: boolean,
  trackOnIntercom?: boolean,
  trackOnSegment?: boolean,
}

export interface HuhaTaskProps {
  name: string,
  label?: string,
  category?: string,
  value?: string,
  parentTask?: HuhaTask | null,
  execId?: string,
  persistent?: boolean,
}

export class HuhaTask implements HuhaOptions {
  name: string;
  label?: string;
  category?: string;
  value?: string;
  status: HuhaTaskStatus;
  effort: number;
  errors: number;
  start: number;
  end?: number;
  execId: string;
  persistent: boolean;
  parentExecId?: string;
  parentTask?: HuhaTask | null;
  trackOnGoogleAnalytics?: boolean;
  trackOnIntercom?: boolean;
  trackOnSegment?: boolean;

  constructor(props: HuhaTaskProps, options: HuhaOptions);

  addInteraction(): void;
  addError(): void;
  finish(status: HuhaTaskStatus): void;
  complete(): void;
  abandon(): void;
  track(): void;

  get time(): number;

  sendToGoogleAnalytics(): void;
  sendToIntercom(): void;
  sendToSegment(): void;

  updateFromLocalStorage(): void;
  removeFromLocalStorage(): void;
}

export interface HuhaEventProps {
  name: string,
  object?: string,
  action?: string,
  category?: string,
  value?: string,
  task?: string | HuhaTask | null,
  eventGroup?: string,
}

export class HuhaEvent implements HuhaOptions {
  name: string;
  object?: string;
  action?: string;
  category?: string;
  value?: string;
  task?: string | HuhaTask | null;
  eventGroup?: string;
  trackOnGoogleAnalytics?: boolean;
  trackOnIntercom?: boolean;
  trackOnSegment?: boolean;

  constructor(props: HuhaEventProps, options: HuhaOptions);

  track(): void;
  sendToGoogleAnalytics(): void;
  sendToSegment(): void;
}

export default class Huha implements HuhaOptions {
  tasks: HuhaTask[];
  events: HuhaEvent[];

  trackOnGoogleAnalytics?: boolean;
  trackOnIntercom?: boolean;
  trackOnSegment?: boolean;

  constructor(options: HuhaOptions);

  createTask(properties: HuhaTaskProps): HuhaTask;
  createEvent(properties: HuhaEventProps): HuhaEvent;
  getTask(name: string): HuhaTask | null;

  setUpEvents(): void;
  registerEvent(capturedEvent: string, element: Element): void;

  abandonInProgressTasks(): void;
}
