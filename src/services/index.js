import http from '../config/http';

export const getTest = (params) => {
  return http('/xxx/xxx', {method: 'post', params})
}