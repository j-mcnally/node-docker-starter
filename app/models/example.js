import { Model } from 'mongorito'
import UniquePlugin from '../plugins/unique'
import DateConverter from '../plugins/date_converter'
import DecimalConverter from '../plugins/decimal_converter'

class Example extends Model {}
// Example.use(UniquePlugin({modelClass: Example, uniqueBy: 'id'}))
// Example.use(DateConverter({fields: []}))
// Example.use(DecimalConverter({fields: []}))

export default Example;

