import { SET_ACTIVE_CARD, SET_COUNT_DOWN, SET_CARD_PROP } from "../actions/cards";

import uuid from 'uuid'



const initState = {
	cards: createCards(),
	countDown: 0,
}

export default function(state = initState, action) {
	switch (action.type) {
		
		case SET_COUNT_DOWN:
			return {
				...state,
				countDown: action.count
			};				
		
		case SET_CARD_PROP:
			const cards = state.cards.slice()
			const wantedIndex = cards.findIndex(item=>item.uuid===action.card.uuid)
			const val = action.val


			if(val !== null) {
				cards[wantedIndex][action.prop] = val 
			} else {
				cards[wantedIndex][action.prop] = !cards[wantedIndex][action.prop]
			}
			return {
				...state,
				cards
			};	
		default:
			return state;
	}
}

function createCards(){

	const items = Array(18).fill().map((item,index) =>{
		let id = index + 1
		return {
			id, 
			active: false, 
			opened: false,
			clear: false,
			finished: 0
		}
	})

	let concatedItems = [ ...items, ...items]
	concatedItems.sort(() => Math.random() - 0.5);
	return concatedItems.map(item=>{ 
		return {
			...item,
			uuid: uuid()
		}
	})
}



