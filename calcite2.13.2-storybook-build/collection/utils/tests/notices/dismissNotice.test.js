import * as CommonModule from '@esri/hub-common';
import { dismissNotice } from '../../notices/dismissNotice';
import * as LocalStorageModule from '../../notices/internal/utils';
describe('dismissNotice:', () => {
  const noticeId = '123';
  const context = {
    isAuthenticated: true,
    userHubSettings: {
      notices: {
        dismissed: [],
      },
    },
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('authenticated: update localStorage and userSettings', async () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: [] });
    const setHubNoticesInLocalStorageMock = jest.spyOn(LocalStorageModule, 'setHubNoticesInLocalStorage').mockReturnValue();
    const updateUserHubSettingsMock = jest.spyOn(CommonModule, 'updateUserHubSettings').mockResolvedValue();
    await dismissNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(setHubNoticesInLocalStorageMock).toHaveBeenCalledWith({ dismissed: [noticeId] });
    expect(updateUserHubSettingsMock).toHaveBeenCalledWith(context.userHubSettings, context);
    const uhs = updateUserHubSettingsMock.mock.calls[0][0];
    const dismissed = CommonModule.getWithDefault(uhs, 'notices.dismissed', []);
    expect(dismissed).toEqual([noticeId]);
    // Call again with the same Id, and it should not store it for a second time
    await dismissNotice(noticeId, context);
    expect(updateUserHubSettingsMock).toBeCalledTimes(1);
  });
  it('anonymous: update localStorage', async () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: [] });
    const setHubNoticesInLocalStorageMock = jest.spyOn(LocalStorageModule, 'setHubNoticesInLocalStorage').mockReturnValue();
    const updateUserHubSettingsMock = jest.spyOn(CommonModule, 'updateUserHubSettings').mockResolvedValue();
    context.isAuthenticated = false;
    await dismissNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(setHubNoticesInLocalStorageMock).toHaveBeenCalledWith({ dismissed: [noticeId] });
    expect(updateUserHubSettingsMock).not.toHaveBeenCalled();
  });
});
