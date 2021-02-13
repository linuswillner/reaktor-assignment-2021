/**
 * Utility function to return the next index of a given array,
 * starting over from the beginning should the next increment
 * exceed the array boundaries.
 *
 * @param {String} direction Direction to move in - has to be "left" or "right".
 * @param {Number} currentIndex Index in array from which to begin iterating.
 * @param {Array} array The array on which to iterate.
 */
export default function (direction, currentIndex, array) {
  const indexOfLast = array.length - 1

  if (direction === 'left') {
    const nextIndex = currentIndex - 1
    return nextIndex < 0 ? indexOfLast : nextIndex
  } else if (direction === 'right') {
    const nextIndex = currentIndex + 1
    return nextIndex > indexOfLast ? 0 : nextIndex
  } else {
    throw new Error('Direction must be either "left" or "right"')
  }
}
