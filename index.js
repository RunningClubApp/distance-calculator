module.exports = {
  /**
   * Calculates the distance between 2 lat/lng objects
   * @param {Object} one - The first { lat: x, lng: y } coordinate
   * @param {Object} two - The second { lat: x, lng: y } coordinate
   * @returns The distance in metres between one and two
   */
  DistanceBetweenTwoPoints: (one, two) => {
    const R = 6371e3 // metres
    const φ1 = one.lat * Math.PI / 180 // φ, λ in radians
    const φ2 = two.lat * Math.PI / 180
    const Δφ = (two.lat - one.lat) * Math.PI / 180
    const Δλ = (two.lng - one.lng) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = R * c // in metres
    return d
  },
  /**
   * Calculates the distance of a path
   * @param {Array} path - An in order list of {lat, lng} objects
   * @returns The distance covered by the path
   */
  DistanceOfPath: (path) => {
    if (path.length === 2) {
      return module.exports.DistanceBetweenTwoPoints(path[0], path[1])
    } else if (path.length > 2) {
      const d1 = module.exports.DistanceBetweenTwoPoints(path[0], path[1])
      path.splice(0, 1)
      const d2 = module.exports.DistanceOfPath(path)

      return d1 + d2
    } else {
      return 0
    }
  }
}
