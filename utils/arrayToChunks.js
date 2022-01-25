export default function arrayToChunks(arr, size){
    const chunkSize = size || 1
    const chunks = []
    for(let i = 0; i < arr.length; i += chunkSize){
        chunks.push(arr.slice(i, i + chunkSize))
    }
    return chunks
}