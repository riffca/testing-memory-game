import { all } from 'redux-saga/effects'
import { watchRehydrateCards} from './actions/cards'


export default function* rootSaga() {
	yield all([
		watchRehydrateCards()
	])
}