
export default function randomPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(`tomchentw`);
      } else {
        reject(new Error(`Hey you've got some random error from your API response...`));
      }
    }, 750 + Math.random() * 500);
  });
}
