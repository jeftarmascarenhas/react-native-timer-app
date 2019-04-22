export const formatNumber = number => `0${number}`.slice(-2)

export const getRemaining = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

export const createArray = (length) => {
  const arr = []
  let i = 0
  while (i < length) {
    arr.push(i.toString())
    i += 1
  }
  return arr
}
