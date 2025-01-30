import { getHubNoticesFromLocalStorage, setHubNoticesInLocalStorage } from '../../../notices/internal/utils';
describe('notice utils', () => {
  describe('getHubNoticesFromLocalStorage', () => {
    it('should return an empty array when localStorage is empty', () => {
      const win = {
        localStorage: {
          getItem: jest.fn().mockReturnValue(null),
        },
      };
      const result = getHubNoticesFromLocalStorage(win);
      expect(result).toEqual({ dismissed: [] });
      expect(win.localStorage.getItem).toHaveBeenCalledWith('ESRI_HUB_NOTICES');
    });
    it('should return the decoded notices from localStorage', () => {
      const encoded = 'eyJkaXNtaXNzZWQiOlsibm90aWNlczEyMyJdfQ==';
      const win = {
        localStorage: {
          getItem: jest.fn().mockReturnValue(encoded),
        },
      };
      const result = getHubNoticesFromLocalStorage(win);
      expect(result).toEqual({ dismissed: ['notices123'] });
      expect(win.localStorage.getItem).toHaveBeenCalledWith('ESRI_HUB_NOTICES');
    });
  });
  describe('setHubNoticesInLocalStorage', () => {
    it('should set hub notices in local storage', () => {
      const hubNotices = { dismissed: ['notice1', 'notice2'] };
      const win = {
        localStorage: {
          setItem: jest.fn(),
        },
      };
      setHubNoticesInLocalStorage(hubNotices, win);
      expect(win.localStorage.setItem).toHaveBeenCalledWith('ESRI_HUB_NOTICES', 'eyJkaXNtaXNzZWQiOlsibm90aWNlMSIsIm5vdGljZTIiXX0=');
    });
  });
});
