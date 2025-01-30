import * as CommonModule from '@esri/hub-common';
import { synchronizeNotices } from '../../notices/synchronizeNotices';
import * as LocalStorageModule from '../../notices/internal/utils';
describe('synchronizeNotices:', () => {
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
  it('should update userHubSettings when notice is dismissed from localStorage but not on user', async () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: [noticeId] });
    const updateUserHubSettingsMock = jest.spyOn(CommonModule, 'updateUserHubSettings').mockResolvedValue();
    context.isAuthenticated = true;
    synchronizeNotices(context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    const chk = CommonModule.cloneObject(context.userHubSettings);
    CommonModule.setProp('notices.dismissed', [noticeId], chk);
    expect(updateUserHubSettingsMock).toHaveBeenCalledWith(chk, context);
  });
  it('should not update userHubSettings when notice is dismissed in both places', async () => {
    const getHubNoticesFromLocalStorageMock = jest.spyOn(LocalStorageModule, 'getHubNoticesFromLocalStorage').mockReturnValue({ dismissed: [noticeId] });
    const updateUserHubSettingsMock = jest.spyOn(CommonModule, 'updateUserHubSettings').mockResolvedValue();
    context.isAuthenticated = true;
    // notice is already dismissed in userHubSettings
    CommonModule.setProp('notices.dismissed', [noticeId], context.userHubSettings);
    synchronizeNotices(context);
    expect(getHubNoticesFromLocalStorageMock).toHaveBeenCalled();
    expect(updateUserHubSettingsMock).not.toHaveBeenCalledWith();
  });
});
