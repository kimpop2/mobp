/*
 * Copyright (c) 2014, COPYRIGHTⓒ2014 eBiz-Pro. ALL RIGHTS RESERVED.
 *
 */
angular.module('mobp.config', [])
 
.constant('SERVER_PATH', {
  url: 'http://52.79.52.210/api/v1'
})

.constant('AUTH_PATH', {
  url: 'http://52.79.52.210/api/auth'
})

.constant('CALL_NUMBER', {
	salary: '01000000000',
	duty:  '01000000000'
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized   : 'auth-not-authorized'
})

.constant('USER_ROLES', {
  user: 'user'
})
;
