import * as CommonModule from '@esri/hub-common';
import { resetNotice } from '../../notices/resetNotice';
import * as LocalStorageModule from '../../notices/internal/utils';
describe('resetNotice:', () => {
  const noticeId = '123';
  const context = {
    isAuthenticated: true,
    userHubSettings: {
      notices: {
        dismissed: ['123', '456'],
      },
    },
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should reset notice for authenticated user', async () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: ['123', '456'] });
    const setHubNoticesInLocalStorageMock = jest.spyOn(LocalStorageModule, 'setHubNoticesInLocalStorage').mockReturnValue();
    const updateUserHubSettingsMock = jest.spyOn(CommonModule, 'updateUserHubSettings').mockResolvedValue();
    await resetNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(setHubNoticesInLocalStorageMock).toHaveBeenCalledWith({ dismissed: ['456'] });
    expect(updateUserHubSettingsMock).toHaveBeenCalledWith({ notices: { dismissed: ['456'] } }, context);
  });
  it('should reset notice for anonymous user', async () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: ['123', '456'] });
    const setHubNoticesInLocalStorageMock = jest.spyOn(LocalStorageModule, 'setHubNoticesInLocalStorage').mockReturnValue();
    const updateUserHubSettingsMock = jest.spyOn(CommonModule, 'updateUserHubSettings').mockResolvedValue();
    context.isAuthenticated = false;
    await resetNotice(noticeId, context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(setHubNoticesInLocalStorageMock).toHaveBeenCalledWith({ dismissed: ['456'] });
    expect(updateUserHubSettingsMock).not.toHaveBeenCalled();
  });
});
