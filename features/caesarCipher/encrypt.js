import { isLetter } from "../../utils/isLetter"

export function caesarEncrypt(message, shift) {
	const messageLetters = message.split('')
	const encryptedMessage = messageLetters.map(letter => {
		if(!isLetter(letter)) return letter
		const letterCode = letter.charCodeAt(0)
		const isCapital = letter.toUpperCase() === letter
		const startingPoint = isCapital ? 65 : 97
		const encryptedCode = startingPoint + ((letterCode - startingPoint + shift) % 26) 
		const encryptedLetter = String.fromCharCode(encryptedCode)
		return encryptedLetter
	})

	return encryptedMessage.join('')
}