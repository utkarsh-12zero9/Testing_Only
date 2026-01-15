export default function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      document.body.removeChild(script);
      reject('Razorpay SDK failed to load. Are you online?');
    };
    document.body.appendChild(script);
  });
};