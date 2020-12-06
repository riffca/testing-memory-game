import { eventChannel, END } from 'redux-saga'


export function formatDate(template, date) {
	var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
	date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
	return date.toISOString().split(/[-:.TZ]/).reduce(function(template, item, i) {
		return template.split(specs[i]).join(item);
	}, template);
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