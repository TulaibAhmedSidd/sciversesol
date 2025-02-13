'use client'
import { useEffect, useState } from 'react';
import PlanCard from '../components/PlanCard';
import styles from '../styles/Plans.module.css';
import Alert from '@components/Alert'
import { checkArrNull } from "../utils/helperFunc"
import Loading from '../components/Loading'
// const plans = [
//   {
//     name: '5KW Solar Plan',
//     price: 6000,
//     equipment: [
//       { name: 'Solar Panels', quantity: 15, price: 3000 },
//       { name: 'Inverter', quantity: 1, price: 1200 },
//       { name: 'Battery', quantity: 1, price: 800 },
//       { name: 'Mounting Structures', quantity: 1, price: 500 },
//     ],
//     totalPrice: 6000,
//     description: 'Perfect for smaller homes or businesses with moderate energy needs.',
//     applianceSetup: {
//       fans: 5,
//       leds: 20,
//       tvs: 1,
//       acs: 1,
//       fridges: 1,
//     }
//   },
//   {
//     name: '10KW Solar Plan',
//     price: 10000,
//     equipment: [
//       { name: 'Solar Panels', quantity: 25, price: 5000 },
//       { name: 'Inverter', quantity: 1, price: 1800 },
//       { name: 'Battery', quantity: 1, price: 1000 },
//       { name: 'Mounting Structures', quantity: 1, price: 700 },
//     ],
//     totalPrice: 10000,
//     description: 'Ideal for medium-sized homes or small to medium businesses.',
//     applianceSetup: {
//       fans: 10,
//       leds: 30,
//       tvs: 2,
//       acs: 2,
//       fridges: 1,
//     }
//   },
//   {
//     name: '20KW Solar Plan',
//     price: 18000,
//     equipment: [
//       { name: 'Solar Panels', quantity: 50, price: 10000 },
//       { name: 'Inverter', quantity: 1, price: 2500 },
//       { name: 'Battery', quantity: 2, price: 1600 },
//       { name: 'Mounting Structures', quantity: 1, price: 1000 },
//     ],
//     totalPrice: 18000,
//     description: 'For larger homes or businesses with high energy consumption.',
//     applianceSetup: {
//       fans: 20,
//       leds: 50,
//       tvs: 4,
//       acs: 4,
//       fridges: 2,
//     }
//   },
// ];

export default function Plans() {
  const [plans, setPlans] = useState([]);

  // Fetch plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/plan");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container+' min-h-[70vh]' }>
      <div className='bg_space_for_title'>
        <h1 className={styles.title + " lightcolor"}>Our Solar Plans</h1>
      </div>
      <div className=' p-3'>
        <Alert
          message="Dont worry we will, take this plan details to whatsApp!"
          type="info"
        />
      </div>
      <div className={styles.planList}>
        {
          loading ?
            <Loading text='Loading Plans'/>
            :
            checkArrNull(plans) ? (
              <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                No plans available, please come later.
              </li>
            ) :
              plans?.map((plan) => (
                <PlanCard key={plan?.name} plan={plan} />
              ))
        }
      </div>
    </div>
  );
}
