const Huha = require('./huha');

test('it should be instantiated', () => {
  const huha = new Huha();
  expect(huha).toBeDefined();
});

test('it should create a new persistent root task if it does not exist', () => {
  const huha = new Huha();
  // name, parentTask, execId, persistent
  const task = huha.createTask('mockTask', null, 'id-1', true);
  expect(task).toBeDefined();
  expect(task.parentExecId).toBeNull();
  expect(task.persistent).toBeTruthy();
  expect(task.status).toBe('In progress');
  expect(task.trackOnSegment).toBeTruthy();
});

test('it should create a child task ', () => {
  const huha = new Huha();
  // name, parentTask, execId, persistent
  const parentTask = huha.createTask('parentTask', null, 'id-1', true);
  const childTask = huha.createTask('childTask', parentTask, 'id-2', true);
  expect(childTask.parentExecId).toBe('id-1');
});