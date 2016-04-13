module.exports = Object.freeze({
  
  MAX_SIZE : 30 * 1024 * 1024,
  SUPPORT_MIME_TYPES : ['image/jpg', 'image/jpeg', 'image/png'],
  UPLOAD_PATH : './uploads/',
  CREATE_MSG : {status: 201, text: ' created '},
  LIM_SIZE_ERR : ' limit size err ',
  MIME_TYPE_ERR : ' Unsupported mime type ',
  NO_ERR_LN : 0 ,
  PAGE_NOT_FOUND_MSG : ' Page not found ',
  NOT_ACCEPTABLE_MSG : ' Not Acceptable ',
  DB_ATTR_REC_MSG : 'name or src attr are not provided',
  DB_CREATE_ERR_MSG : 'There was a problem adding the information to the database.',
  DB_CREATE_SUCCESS_MSG : 'creating new collection : ',
  
});