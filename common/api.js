const http = uni.$u.http

// post请求，获取菜单
export const login = (params) => http.post('/user/login', params, {})



export const getSTS = (params) => http.get('/common/sts', {params: params, custom: {auth: true}})
export const getFormid = (params) => http.get('/common/formid', {params: params, custom: {auth: true}})



export const goodsAdd = (params) => http.post('/goods/add', params, {custom: {auth: true}})
export const goodsSearch = (params) => http.post('/goods/search', params, {custom: {auth: true, notToLogin:true}})
export const goodsDelete = (params) => http.post("/goods/delete", params, {custom: {auth: true}})
export const goodsFinishStatus = (params) => http.post("/goods/finish", params, {custom: {auth: true}})

export const goodsTagAdd = (params) => http.post("/goods/tag/add", params, {custom: {auth: true}})
export const goodsTagSearch = (params) => http.get('/goods/tag/search', {params: params, custom: {auth: true}})

export const goodsCategoryAdd = (params) => http.post("/goods/category/add", params, {custom: {auth: true}})
export const goodsCategorySearch = (params) => http.get('/goods/category/search', {params: params, custom: {auth: true}})

