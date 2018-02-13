import {ActionTypes} from 'mongorito';

export default (options = {}) => {
  return () => {
    const {
      fields = []    
    } = options;
    return ({model}) => next => async action => {
      if (action.type == ActionTypes.SAVE) {
        for(let i=0; i < fields.length; i++) {
          let f = fields[i];
          let d = await model.get(f);
          if (d != null) {
            d = new Date(d);
            let s = await model.set(f, d)
            action.fields[f] = d
          }
          
        }
      }
      return next(action);
    }
  }
}


