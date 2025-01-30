import { Organization, User } from '../types';
const { E2E_PASSWORD_DEV } = process.env;
if (!E2E_PASSWORD_DEV) {
  throw new Error('E2E_PASSWORD_DEV Could not be read! Please ensure you have a .env file configured! Use the .env-example file and ask others on the team where to get the values!');
}
export const devext = {
  portalDomain: 'devext.arcgis.com',
  agoBaseDomain: 'mapsdevext.arcgis.com',
  organizations: {
    [Organization.hubBasicPublic]: {
      subdomain: 'dev-bas-hub',
      users: {
        [User.admin]: {
          username: 'e2e_bas_pub_admin',
          password: E2E_PASSWORD_DEV,
          resources: {
            gallery: {
              itemGroup: 'cbd983f99caa491abc7a56407029c405'
            }
          }
        },
        [User.hubAdmin]: {
          username: 'e2e_bas_pub_collaborator',
          password: E2E_PASSWORD_DEV
        },
        [User.publisher]: {
          username: 'e2e_bas_pub_publisher',
          password: E2E_PASSWORD_DEV
        }
      }
    },
    [Organization.hubPremiumPublic]: {
      subdomain: 'dev-pre-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_pub_admin',
          password: E2E_PASSWORD_DEV
        },
        [User.hubAdmin]: {
          username: 'e2e_pre_pub_collaborator',
          password: E2E_PASSWORD_DEV
        },
        [User.publisher]: {
          username: 'e2e_pre_pub_publisher',
          password: E2E_PASSWORD_DEV
        },
        [User.communityMember]: {
          username: 'e2e_pre_hub_c_member',
          password: E2E_PASSWORD_DEV
        }
      }
    },
    [Organization.hubBasicPrivate]: {
      subdomain: 'dev-bas-p-hub',
      users: {
        [User.admin]: {
          username: 'e2e_bas_priv_admin',
          password: E2E_PASSWORD_DEV
        },
        [User.hubAdmin]: {
          username: 'e2e_bas_priv_collaborator',
          password: E2E_PASSWORD_DEV
        },
        [User.publisher]: {
          username: 'e2e_bas_priv_publisher',
          password: E2E_PASSWORD_DEV
        }
      }
    },
    [Organization.hubPremiumPrivate]: {
      subdomain: 'dev-pre-p-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_priv_admin',
          password: E2E_PASSWORD_DEV
        },
        [User.hubAdmin]: {
          username: 'e2e_pre_priv_collaborator',
          password: E2E_PASSWORD_DEV
        },
        [User.publisher]: {
          username: 'e2e_pre_priv_publisher',
          password: E2E_PASSWORD_DEV
        }
      }
    },
    [Organization.hubBasicAlpha]: {
      subdomain: 'dev-bas-a-hub',
      users: {
        [User.admin]: {
          username: 'dev_bas_a_hub_admin',
          password: E2E_PASSWORD_DEV
        }
      }
    },
    [Organization.hubPremiumAlpha]: {
      subdomain: 'dev-pre-a-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_a_hub_admin',
          password: E2E_PASSWORD_DEV
        },
        [User.publisher]: {
          username: 'e2e_pre_a_hub_publisher',
          password: E2E_PASSWORD_DEV
        }
      }
    },
  }
};
