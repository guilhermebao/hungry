import Vue from 'vue'

export const sucessMessageListener = 'successMessage'
export const errorMessageListener = 'errorMessage'
export const actionListener = 'action'
export const continuosListener = 'continuos'

export const newPopup = 'newpopup'
export const closePopup = 'closepopup'
export const closeAllPopup = 'closeallpopup'

export const messageBus = new Vue()

export const sucessMessage = (message) => {
	messageBus.$emit(sucessMessageListener, message)
}

export const errorMessage = (message) => {
	messageBus.$emit(errorMessageListener, message)
}

export const sendAction = (data) => {
	messageBus.$emit(actionListener, data)
}

export const getAction = (callback) => {
	messageBus.$once(actionListener, (data) => {
		callback(data)
	})
}

export const sendContinuosAction = (type, data) => {
	messageBus.$emit(continuosListener, {
		type,
		payload: data
	})
}

export const getContinuosAction = (callback) => {
	messageBus.$on(continuosListener, (data) => {
		callback(data)
	})
}

export const openPopupBus = (data) => {
	messageBus.$emit(newPopup, {
		component: data.component,
		props: data.props
	})
}

export const closePopupBus = () => {
	messageBus.$emit(closePopup)
}

export const closeAllPopupBus = () => {
	messageBus.$emit(closeAllPopup)
}
