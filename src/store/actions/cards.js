import { takeEvery, select, put, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD";
export const SET_COUNT_DOWN = "SET_COUNT_DOWN";
export const SET_CARD_PROP = "SET_CARD_PROP";


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

function* clearCards(cards) {
	for(let i=0; i<cards.length;i++) {
		yield put(setCardProp(cards[i], 'active', false))
		yield put(setCardProp(cards[i], 'opened', false))
	}
}

let channel = null

let start = 0

function* setActiveCardLogic(action) {
	
	let time = yield select(state=>state.cards.countDown)
	let cards = yield select(state=>state.cards.cards)
	let clickCard = action.activeCard

	yield put(setCardProp(clickCard, 'opened', true))
	if(time === 0) {
		start = Date.now()
		yield put(setCardProp(clickCard, 'active', true))
		let count = 5
		channel = yield call(countdown, count);

		yield put({type: SET_COUNT_DOWN, count})
		yield takeEvery(channel, function* (secs) {
			count--
			yield put({type: SET_COUNT_DOWN, count})
			if(count === 0) {
				yield clearCards(cards)
			} 
			
		});

	} else {

		let currentActiveCard = cards.find(item=>item.active)
		if(clickCard.id === currentActiveCard.id && clickCard.uuid !== currentActiveCard.uuid) {
			let end = Date.now()
			let interval = end - start
			yield clearCards(cards)
			yield put(setCardProp(currentActiveCard, 'clear'))
			yield put(setCardProp(currentActiveCard, 'finished', (interval/1000).toFixed(2)))

			yield put(setCardProp(clickCard, 'clear'))
			yield put(setCardProp(clickCard, 'finished', (interval/1000).toFixed(2)))

			yield put({type: SET_COUNT_DOWN, count: 0})
			channel.close()
		}

	}

}

export function* watchRehydrateCards() {
	yield takeEvery(SET_ACTIVE_CARD, setActiveCardLogic)
}


