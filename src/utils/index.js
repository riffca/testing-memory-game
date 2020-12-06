import { eventChannel, END } from 'redux-saga'


export function formatDate(time) {
	var date = new Date(time);
	var datestring = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
	date.getHours() + ":" + date.getMinutes();
	return datestring
}

export function countdown(secs) {
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

export function countup(max=300) {
	let secs = 0
	return eventChannel(emitter => {
			const iv = setInterval(() => {
				secs++ 
				if (secs <= max) {
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