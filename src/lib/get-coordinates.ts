function success(position: GeolocationPosition): [number, number] {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  return [lat, lon];
}

export default function getCoordinates(): undefined | Promise<[number, number]> {
  if (!navigator.geolocation) {
    return;
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(success(position));
    }, reject);
  })
}