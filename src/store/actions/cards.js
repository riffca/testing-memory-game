import { takeEvery, select, put, call } from 'redux-saga/effects'
import { countup, countdown } from '@/utils'

export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD";
export const SET_COUNT_DOWN = "SET_COUNT_DOWN";
export const SET_CARD_PROP = "SET_CARD_PROP";
export const SET_TIMER = "SET_TIMER";
export const SET_GAME_STATE = "SET_GAME_STATE";
export const SET_GAME_LEVEL = "SET_GAME_LEVEL";


export function setActiveCard(card) {
	return {
		type: SET_ACTIVE_CARD,
		activeCard: card
	};
}

export function setCardProp(card=null,prop=null,val=null) {
	return {
		type: SET_CARD_PROP,
		prop,
		card,
		val
	};
}



function* clearCards(cards) {
	for(let i=0; i<cards.length;i++) {
		yield put(setCardProp(cards[i], 'active', false))
		yield put(setCardProp(cards[i], 'opened', false))
	}
}

let timerChannel = null
let maxTime = 10
function* timerGameLogic(action) {
	timerChannel = yield call(countup, maxTime);
	let cards = yield select(state=>state.cards.cards)

	yield put({type: SET_GAME_STATE, active: true})
	yield takeEvery(timerChannel, function* (secs) {
		yield put({type: SET_TIMER, val: secs})
		if(maxTime <= secs) {
			yield put({type: SET_GAME_STATE, active: false})
			yield put({type: SET_TIMER, val: 0})
			yield clearCards(cards)
		}
	})
}

let fiveSecChannel = null
function* setActiveCardLogic(action) {
	
	let time = yield select(state=>state.cards.countDown)
	let cards = yield select(state=>state.cards.cards)
	let clickCard = action.activeCard

	yield put(setCardProp(clickCard, 'opened', true))
	if(time === 0) {
		yield put(setCardProp(clickCard, 'active', true))
		let count = 5
		fiveSecChannel = yield call(countdown, count);


		yield put({type: SET_COUNT_DOWN, count})
		yield takeEvery(fiveSecChannel, function* (secs) {
			count--
			yield put({type: SET_COUNT_DOWN, count})
			if(count === 0) {
				yield clearCards(cards)
			} 
			
		});

	} else {

		let currentActiveCard = cards.find(item=>item.active)
		if(clickCard.id === currentActiveCard.id) {
			yield clearCards(cards)

			yield put(setCardProp(currentActiveCard, 'clear'))
			yield put(setCardProp(clickCard, 'clear'))

			yield put({type: SET_COUNT_DOWN, count: 0})
			fiveSecChannel.close()

			const updatedCards = yield select(state=>state.cards.cards)
			const gameTime = yield select(state=>state.cards.timer)

			if(updatedCards.every(item=>item.clear)) {
				timerChannel.close()
				yield put({type: SET_GAME_STATE, active: false})
				let results =JSON.parse(localStorage.getItem('card-results'))
				if(!results) results = []
				results.push({ date: Date.now(), timer: gameTime })
				localStorage.setItem('card-results',JSON.stringify(results))
			}

		} else {


			let soft = yield select(state=>state.cards.softGame)
			if(soft) {
				let openedCards = cards.filter(item=>item.opened)
				let itemsToDelete = []
				openedCards.forEach(a=>{
					openedCards.forEach(b=>{
						if(a.id === b.id && a.uuid !== b.uuid) {
							itemsToDelete.push(a)
						}
					})
				})
				for(let i=0; i<itemsToDelete.length;i++) {
					yield put(setCardProp(itemsToDelete[i], 'clear', true))
				}
			} 
		}

	}

}


export function* watchRehydrateCards() {
	yield takeEvery(SET_ACTIVE_CARD, setActiveCardLogic)
	yield takeEvery('START_CARD_GAME', timerGameLogic)
}


