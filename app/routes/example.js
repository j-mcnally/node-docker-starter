import Example from '../models/example'
import { ObjectId } from 'mongorito'

class ExampleRoutes {
  static map(app, Models) {

    

    app.get('/', function(req, res) {
      res.send('Example.');
    });


  }
}

export default ExampleRoutes
