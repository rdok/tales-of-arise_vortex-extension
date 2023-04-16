global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
};

beforeEach(() => {});

afterEach(() => {
  // To mock modules from reusable make functions.
  // Achieves cleaner and easier to read unit tests.
  jest.resetModules();
  // jest.resetAllMocks();
});
