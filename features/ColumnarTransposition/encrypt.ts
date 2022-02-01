import { SPACE_REPLACER } from "../../const/SPACE_REPLACER"
import { SEPARATOR } from "../../const/SEPARATOR"
import arrayToChunks from "../../utils/arrayToChunks"

const boxesEncrypt = (message: string, key: string) => {
  const keyLetters = key.split('').map(l => l.toLowerCase())
  const messageLetters = message.replace(/ /g, SPACE_REPLACER).split('')
  const chunkedMessage = arrayToChunks(messageLetters, key.length)
  const lettersMessage = keyLetters.map((letter, i) => {
    const letters = chunkedMessage.map((chunk) => {
      return chunk[i]
    })
    return {
      letter,
      letters
    }
  })
  const sorted = lettersMessage.sort((a, b) => {
    return a.letter.localeCompare(b.letter)
  })
  const encryptedMessage = sorted.map(({ letters }) => {
    return letters.join('')
  }).join(SEPARATOR)
  return encryptedMessage
}

export default boxesEncrypt