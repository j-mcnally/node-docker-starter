import Example from './models/example'
import DB from './db/connection'
class Models {
  static async load() {
    let result = await DB.connect()
    DB.register(Order)
    return result;
  }
}

Models.db = DB
Models.Example = Example

export default Models;
