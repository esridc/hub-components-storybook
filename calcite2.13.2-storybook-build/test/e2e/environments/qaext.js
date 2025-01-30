import { Organization, User } from '../types';
const { E2E_PASSWORD_QA } = process.env;
if (!E2E_PASSWORD_QA) {
  throw new Error('E2E_PASSWORD_QA Could not be read! Please ensure you have a .env file configured! Use the .env-example file and ask others on the team where to get the values!');
}
export const qaext = {
  portalDomain: 'qaext.arcgis.com',
  agoBaseDomain: 'mapsqa.arcgis.com',
  organizations: {
    [Organization.hubBasicPublic]: {
      subdomain: 'qa-bas-hub',
      users: {
        [User.admin]: {
          username: 'e2e_bas_pub_admin',
          password: E2E_PASSWORD_QA,
          resources: {
            gallery: {
              itemGroup: '08c4099d18ce41b48055e194e12d39fe'
            }
          }
        },
        [User.hubAdmin]: {
          username: 'e2e_bas_pub_collaborator',
          password: E2E_PASSWORD_QA
        },
        [User.publisher]: {
          username: 'e2e_bas_pub_publisher',
          password: E2E_PASSWORD_QA
        }
      }
    },
    [Organization.hubPremiumPublic]: {
      subdomain: 'qa-pre-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_pub_admin',
          password: E2E_PASSWORD_QA
        },
        [User.hubAdmin]: {
          username: 'e2e_pre_pub_collaborator',
          password: E2E_PASSWORD_QA
        },
        [User.publisher]: {
          username: 'e2e_pre_pub_publisher',
          password: E2E_PASSWORD_QA
        },
        [User.communityMember]: {
          username: 'e2e_pre_hub_c_member',
          password: E2E_PASSWORD_QA
        }
      }
    },
    [Organization.hubBasicPrivate]: {
      subdomain: 'qa-bas-p-hub',
      users: {
        [User.admin]: {
          username: 'e2e_bas_priv_admin',
          password: E2E_PASSWORD_QA
        },
        [User.hubAdmin]: {
          username: 'e2e_bas_priv_collaborator',
          password: E2E_PASSWORD_QA
        },
        [User.publisher]: {
          username: 'e2e_bas_priv_publisher',
          password: E2E_PASSWORD_QA
        }
      }
    },
    [Organization.hubPremiumPrivate]: {
      subdomain: 'qa-pre-p-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_priv_admin',
          password: E2E_PASSWORD_QA
        },
        [User.hubAdmin]: {
          username: 'e2e_pre_priv_collaborator',
          password: E2E_PASSWORD_QA
        },
        [User.publisher]: {
          username: 'e2e_pre_priv_publisher',
          password: E2E_PASSWORD_QA
        }
      }
    },
    [Organization.hubBasicAlpha]: {
      subdomain: 'qa-bas-a-hub',
      users: {
        [User.admin]: {
          username: 'qa_bas_a_hub_admin',
          password: E2E_PASSWORD_QA
        }
      }
    },
    [Organization.hubPremiumAlpha]: {
      subdomain: 'qa-pre-a-hub',
      users: {
        [User.admin]: {
          username: 'e2e_pre_a_hub_admin',
          password: E2E_PASSWORD_QA
        },
        [User.publisher]: {
          username: 'e2e_pre_a_hub_publisher',
          password: E2E_PASSWORD_QA
        }
      }
    },
  }
};
