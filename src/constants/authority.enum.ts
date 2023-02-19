export enum AuthorityEnum {
  SETTING_READ = 'setting:read',
  SETTING_WRITE = 'setting:write',
  SETTING_DELETE = 'setting:delete',
  SETTING_LIST = 'setting:list',

  AUTH_PROFILE = 'auth:profile',
  AUTH_REVOKE = 'auth:revoke',

  MONITOR_HEALTH = 'monitor:health',

  RBAC_WRITE = 'rbac:write',
  RBAC_READ = 'rbac:read',
  RBAC_DELETE = 'rbac:delete',
  RBAC_LIST = 'rbac:list'
}