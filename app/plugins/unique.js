import {ActionTypes} from 'mongorito';

export default (options = {}) => {
  return () => {
    const {
      uniqueBy = 'uniqueBy',
      modelClass = 'modelClass'
    } = options;
    return ({model}) => next => async action => {
      if (action.type == ActionTypes.SAVE) {
        let query = {}
        let mVal = await model.get(uniqueBy)
        query[uniqueBy] = mVal
        let exisits = await modelClass.count(query)
        if (exisits > 0) 
          throw new Error(`${typeof(model)} must have unique ${uniqueBy}`)
      }
      return next(action);
    }
  }
}


