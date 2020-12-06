import { takeEvery, select, put, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

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

function countdown(secs) {
	return eventChannel(emitter => {
			const iv = setInterval(() => {
				secs -= 1
				if (secs >= 0) {
					emitter(secs)
				} else {
					emitter(END)
				}
			}, 1000);
			return () => {
				clearInterval(iv)
			}
		}
	)
}

function countup(max=300) {
	let secs = 0
	return eventChannel(emitter => {
			const iv = setInterval(() => {
				secs++ 
				if (secs < max) {
					emitter(secs)
				} else {
					emitter(END)
				}
			}, 1000);
			return () => {
				clearInterval(iv)
			}
		}
	)
}

function* clearCards(cards) {
	for(let i=0; i<cards.length;i++) {
		yield put(setCardProp(cards[i], 'active', false))
		yield put(setCardProp(cards[i], 'opened', false))
	}
}

let timerChannel = null
function* timerGameLogic(action) {
	timerChannel = yield call(countup, 120);

	yield put({type: SET_GAME_STATE, active: true})
	yield takeEvery(timerChannel, function* (secs) {
		yield put({type: SET_TIMER, val: secs})
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


