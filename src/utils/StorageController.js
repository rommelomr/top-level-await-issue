import { useStorage } from '@vueuse/core'

export default {
  /*
        Method that extract data from a key stored
    */
  validateName(name) {
    if (name == null)
      return {
        success: false,
        status: 0,
        status_text: 'error',
        message: 'key must not be null',
      }
    return {
      success: true,
      status: 1,
      status_text: 'success',
      data: name,
    }
  },
  validateData(data) {
    if (data == null)
      return {
        success: false,
        status: 0,
        status_text: 'error',
        message: 'data must not be null',
      }
    if (typeof data != 'object')
      return {
        success: false,
        status: 0,
        status_text: 'error',
        message: 'data must be of type "object. "' + typeof data + 'given',
      }

    return {
      success: true,
      status: 1,
      status_text: 'success',
      data: data,
    }
  },
  fullValidations(name, data) {
    let name_validation = this.validateName(name)
    let data_validation = this.validateData(data)

    let is_success = name_validation.success && data_validation.success
    if (is_success) {
      return {
        success: true,
        status: 1,
        status_text: 'success',
        name: name_validation.data,
        data: data_validation.data,
      }
    } else {
      return {
        status: false,
        statusText: 'error',
        message: name_validation.success
          ? data_validation.message
          : name_validation.message,
      }
    }
  },
  /*
        Method that extract data from a LocalStorage.
        input: 'key'
        output (if key exist):
        {
            success: true,
            status: 1,
            statusText: 'success',
            data: {stored:data}
        }
        output (if key doesn't exist):
        {
            success: false,
            status: 0,
            statusText: 'error',
            message: 'key [key] is empty'
        }
        

    */
  async get(name) {
    let validation = this.validateName(name)
    if (!validation.success) return validation.message

    return new Promise((resolve, reject) => {
      let _storage = useStorage(name, '')
      if (_storage.value == '') {
        _storage.value = null
        reject({
          success: false,
          status: 0,
          statusText: 'error',
          message: 'key \"'+name+'\" is empty',
        })
      } else {
        let _data = JSON.parse(_storage.value)
        resolve({
          success: true,
          status: 1,
          statusText: 'success',
          message: 'Data loaded from \"'+name+'\" key',
          data: _data,
        })
      }
    })
  },
  /*
  Method that create a new key-value in the stored
  */
 async add(name, data) {
   let validation = this.fullValidations(name, data)
   if (!validation.success) return validation.message
   
   return new Promise((resolve, reject) => {
     let string = JSON.stringify(data)
     let storage = useStorage(name, data)
     let string_storage = JSON.stringify(storage.value)
     
     
     if (string == string_storage) {
       resolve({
         success: true,
         status: 1,
         statusText: 'success',
         message: 'Data added',
         data: data,
        })
      } else {
        reject({
          success: false,
          status: 0,
          statusText: 'error',
          message:
            'Key \"'+name+'\" is currently used. To overwrite this key use the method overwrite()',
          data: storage.value,
        })
      }
    })
  },
  /*
    Method that overwrite a vey-value in the localstorage
  */ 
  async overwrite(name, data) {
    let validation = this.fullValidations(name, data)
    if (!validation.success) return validation.message

      return new Promise((resolve,reject) => {
        let string = JSON.stringify(data)
        let storage = useStorage(name, '')
        let storage_backup = storage;        
        storage.value = string
        if(storage.value == ''){
          storage.value = storage_backup.value;
          reject({
            success: false,
            status: 0,
            statusText: 'error',
            message: 'Key \"'+name+'\" was not provided',
          })
        }else{
          resolve({
            success: true,
            status: 1,
            statusText: 'success',
            message: 'Data overwritten',
            data: data,
          })
        }

        
      })
  },
  async delete(name) {
      return new Promise((resolve) => {
        let storage = useStorage(name,'')
        storage.value = null

        resolve({
          success: true,
          status: 1,
          statusText: 'success',
          message: 'Key \"'+name+'\" was deleted',
        })
      })
  }
}
