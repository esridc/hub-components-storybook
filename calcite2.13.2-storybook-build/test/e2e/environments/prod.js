import { Organization, User } from '../types';
const { E2E_PASSWORD_PROD } = process.env;
if (!E2E_PASSWORD_PROD) {
  throw new Error('E2E_PASSWORD_PROD Could not be read! Please ensure you have a .env file configured! Use the .env-example file and ask others on the team where to get the values!');
}
export const prod = {
  portalDomain: 'www.arcgis.com',
  agoBaseDomain: 'maps.arcgis.com',
  organizations: {
    [Organization.hubBasicPublic]: {
      subdomain: 'prod-bas-hub',
      users: {
        [User.admin]: {
          username: 'e2e_bas_pub_admin',
          password: E2E_PASSWORD_PROD,
          resources: {
            gallery: {
              itemGroup: '1e751ebc09fa40b9a44dbc30becaa207'
            }
          }
        },
        [User.hubAdmin]: {
          username: 'e2e_bas_pub_collaborator',
          password: E2E_PASSWORD_PROD
        },
        [User.publisher]: {
          username: 'e2e_bas_pub_publisher',
          password: E2E_PASSWORD_PROD
        }
      }
    },
    [Organization.hubPremiumPublic]: {
      subdomain: 'prod-pre-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_pub_admin',
          password: E2E_PASSWORD_PROD
        },
        [User.hubAdmin]: {
          username: 'e2e_pre_pub_collaborator',
          password: E2E_PASSWORD_PROD
        },
        [User.publisher]: {
          username: 'e2e_pre_pub_publisher',
          password: E2E_PASSWORD_PROD
        },
        [User.communityMember]: {
          username: 'e2e_pre_hub_c_member',
          password: E2E_PASSWORD_PROD
        }
      }
    },
  }
};
