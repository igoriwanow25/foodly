const axios = {
  get: jest.fn(() => Promise.resolve({ data: 'mock image data' })),
};
export default axios;
