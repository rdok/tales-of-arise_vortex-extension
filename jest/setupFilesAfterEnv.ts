global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
};

beforeEach(() => {
  Object.defineProperty(global, "performance", {
    writable: true,
  });
});

afterEach(() => {
  // To mock modules from reusable make functions.
  // Achieves cleaner and easier to read unit tests.
  jest.resetModules();
  // jest.resetAllMocks();
});
