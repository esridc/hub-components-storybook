import { getThrottleMS } from '../location';
describe('location', () => {
  describe('getThrottleMS', () => {
    let totalResults;
    let batchSize;
    let totalWaitTime;
    let numRequestsThreshold;
    let thresholdExceededWaitTime;
    beforeEach(() => {
      totalResults = 50;
      batchSize = 10;
      totalWaitTime = 2500;
      numRequestsThreshold = 10;
      thresholdExceededWaitTime = 250;
    });
    it('should return throttle wait time', () => {
      const waitTime = getThrottleMS(totalResults, batchSize, totalWaitTime, numRequestsThreshold, thresholdExceededWaitTime);
      expect(waitTime).toEqual(500);
    });
    it('should return thresholdExceededWaitTime when numRequests > numRequestsThreshold', () => {
      numRequestsThreshold = 4;
      thresholdExceededWaitTime = 350;
      const waitTime = getThrottleMS(totalResults, batchSize, totalWaitTime, numRequestsThreshold, thresholdExceededWaitTime);
      expect(waitTime).toEqual(350);
    });
  });
});
