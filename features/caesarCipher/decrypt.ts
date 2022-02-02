import { isLetter } from "../../utils/isLetter"

export default function caesarDecrypt(message: string, shift: number) {
	const messageLetters = message.split('')
	const decryptedMessage = messageLetters.map(letter => {
		if(!isLetter(letter)) return letter
		const letterCode = letter.charCodeAt(0)
		const isCapital = letter.toUpperCase() === letter
		const startingPoint = isCapital ? 65 : 97
		const absoluteShift = (letterCode- startingPoint - shift) % 26 >= 0
		? (letterCode- startingPoint - shift) % 26
		: 26 + (letterCode- startingPoint - shift) % 26
		const decryptedCode = startingPoint + absoluteShift
		console.log({ decryptedCode})
		const decryptedLetter = String.fromCharCode(decryptedCode)
		return decryptedLetter
	})

	return decryptedMessage.join('')
}
