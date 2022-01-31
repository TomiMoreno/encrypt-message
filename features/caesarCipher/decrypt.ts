import { isLetter } from "../../utils/isLetter"

export function caesarDecrypt(message: string, shift: number) {
	const messageLetters = message.split('')
	const decryptedMessage = messageLetters.map(letter => {
		if(!isLetter(letter)) return letter
		const letterCode = letter.charCodeAt(0)
		const isCapital = letter.toUpperCase() === letter
		const startingPoint = isCapital ? 65 : 97
		const absoluteShift = shift % 26 < 0 ? 26 + shift % 26 : shift % 26
		const decryptedCode = startingPoint + (letterCode - startingPoint + absoluteShift) % 26
		const decryptedLetter = String.fromCharCode(decryptedCode)
		return decryptedLetter
	})

	return decryptedMessage.join('')
}
