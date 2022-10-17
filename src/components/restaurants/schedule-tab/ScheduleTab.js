 import "./ScheduleTab.css";
 import { useState } from "react";
//  import { initialTabs as tabs } from "./ingredients";
 import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import weekday from "../../../data/week.days"

 function  ScheduleTab({dayOfWeek, hours }) {
   const [selectedTab, setSelectedTab] = useState(dayOfWeek[0]);

  useEffect(()=>{
    const d = new Date(Date.now());
    let day = d.getDay()
    setSelectedTab(weekday[day])
  },[]) 

   return (
     <div className="window">
       <nav>
         <ul className="schedules">
           {dayOfWeek.map((day) => (
             <li
               key={day.id}
               className={day === selectedTab ? "selected schedules" : "schedules"}
               onClick={() => setSelectedTab(day)}
             >
               {`${day[0].toUpperCase()}${day[1]}${day[2]}`}
               {day === selectedTab ? (
                 <motion.div className="underline" layoutId="underline" />
               ) : null}
             </li>
           ))}
         </ul>
       </nav>
       <main>
         <AnimatePresence exitBeforeEnter>
           <motion.div
             className='justify-content-center  '
             key={selectedTab}
             initial={{ y: 10, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: -10, opacity: 0 }}
             transition={{ duration: 0.2 }}
           >
            {hours && hours.map((hour, i)=>{
                    return (
                      <div className="d-flex row m-3 justify-content-center " key={hour.id}>
                        <p className="text-center mb-1 fw-bolder border-bottom">Shift Nº{i+1}</p>
                        <p className="text-center m-0">{hour.openHours} - {hour.closeHours}</p>
                      </div>
                    )
            })}

            
           </motion.div>
         </AnimatePresence>
       </main>
     </div>
   );
 }

export default ScheduleTab