import { shouldShowNotice } from '../../notices/shouldShowNotice';
import * as LocalStorageModule from '../../notices/internal/utils';
describe('shouldShowNotice:', () => {
  const noticeId = '123';
  let context;
  beforeEach(() => {
    context = {
      isAuthenticated: true,
      userHubSettings: {
        notices: {
          dismissed: [],
        },
      },
    };
    jest.clearAllMocks();
  });
  it('anonymous: should show notice when not dismissed', () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: [] });
    context.isAuthenticated = false;
    const result = shouldShowNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(result).toBe(true);
  });
  it('anonymous: should not show notice when dismissed', () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: [noticeId] });
    context.isAuthenticated = false;
    const result = shouldShowNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(result).toBe(false);
  });
  it('authd: should show notice when not dismissed', async () => {
    const dismissed = [];
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed });
    context.userHubSettings.notices.dismissed = dismissed;
    context.isAuthenticated = true;
    const result = shouldShowNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(result).toBe(true);
  });
  it('authd: should not show notice when dismissed', async () => {
    const dismissed = [noticeId];
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed });
    context.userHubSettings.notices.dismissed = dismissed;
    context.isAuthenticated = true;
    const result = shouldShowNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
