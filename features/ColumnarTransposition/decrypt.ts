import { SEPARATOR } from "../../const/SEPARATOR"
import { SPACE_REPLACER_REGEX } from "../../const/SPACE_REPLACER"

const decryptMessage = (message:string, key:string) => {
  const keyLetters = key.split('').map(l => l.toLowerCase()).map((l, i) => ({ letter: l, index: i}))
  const chunkedMessage = message.replace(SPACE_REPLACER_REGEX, ' ').split(SEPARATOR).map(l => l.split(''))
  const maxChunkSize = Math.ceil(message.split(SEPARATOR).join('').length / key.length)
  const sortedKeys = keyLetters.sort((a, b) => {
    return a.letter.localeCompare(b.letter)
  })
  const lettersMessage = sortedKeys.map(({letter, index}, i) => {
    const letters = chunkedMessage[i]
    return {
      letter,
      letters,
      index
    }
  }
  )
  const sorted = lettersMessage.sort((a, b) => {
    const value = a.index - b.index
    return value
  })
  let decryptedMessage = ""
  for(let j = 0; j < maxChunkSize; j++){
    for(let i = 0; i < sorted.length; i++){
      decryptedMessage = sorted[i].letters.shift() || ""
    }
  }
  return decryptedMessage
}

export default decryptMessage