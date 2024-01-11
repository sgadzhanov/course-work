'use client'
import { Roboto } from 'next/font/google'
import Countdown from "react-countdown"

const roboto = Roboto({ weight: '500', subsets: ['latin'] })

export default function CountDown() {
  const promotionEnds = new Date('2024-01-20')
  return (
    <div className='text-yellow-300 text-4xl lg:text-5xl font-bold'>
      <div className={roboto.className}>
        <Countdown
          date={promotionEnds}
        />
      </div>
    </div>
  )
}
// 3 days:
// 1 second = 1000ms
// 1 min = 60 * 1000ms
// 1 hour = 60 * 60 * 1000ms
// 24 hours = 24 * 60 * 60 * 1000ms
// 3 days = 3 * 24 * 60 * 60 * 1000

// export default function Countdown() {
//   const targetDate = new Date();
//   targetDate.setDate(targetDate.getDate() + 3);

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   function calculateTimeLeft() {
//     const difference = targetDate.getTime() - new Date().getTime();

//     if (difference <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     }

//     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//     return {
//       days: days < 10 ? `0${days}` : days,
//       hours: hours < 10 ? `0${hours}` : hours,
//       minutes: minutes < 10 ? `0${minutes}` : minutes,
//       seconds: seconds < 10 ? `0${seconds}` : seconds,
//     };
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const { days, hours, minutes, seconds } = timeLeft;

//   return (
//     <div className='text-yellow-300 text-4xl font-bold'>
//       {`${days}:${hours}:${minutes}:${seconds}`}
//     </div>
//   );
// }
