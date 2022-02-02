import { isLetter } from "../../utils/isLetter"

export default function caesarEncrypt(message: string, shift: number) {
	const messageLetters = message.split('')
	const encryptedMessage = messageLetters.map(letter => {
		if(!isLetter(letter)) return letter
		const letterCode = letter.charCodeAt(0)
		const isCapital = letter.toUpperCase() === letter
		const startingPoint = isCapital ? 65 : 97
		const absoluteShift = (letterCode- startingPoint + shift) % 26 >= 0
		? (letterCode- startingPoint + shift) % 26
		: 26 + (letterCode- startingPoint + shift) % 26
		const encryptedCode = startingPoint + absoluteShift
		const encryptedLetter = String.fromCharCode(encryptedCode)
		return encryptedLetter
	})

	return encryptedMessage.join('')
}