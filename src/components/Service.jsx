const Service = () => {
    return (
      <div className='flex justify centerw h-100vh'>
      <div className="w-[328px] h-[212px] relative">
    <div className="w-[328px] h-[212px] left-0 top-0 absolute bg-white rounded-lg shadow" />
    <div className="w-[46px] h-1.5 left-[16px] top-[114px] absolute">
    </div>
    <div className="w-[328px] h-[0px] left-[328px] top-[75px] absolute origin-top-left rotate-180 border border-neutral-200"></div>
    <div className="w-10 h-[0px] left-[164px] top-[172px] absolute origin-top-left rotate-90 border border-neutral-200"></div>
    <div className="w-[328px] h-[0px] left-[328px] top-[172px] absolute origin-top-left rotate-180 border border-neutral-200"></div>
    <div className="left-[16px] top-[16px] absolute text-zinc-700 text-base font-bold font-['Roboto']">Basic Service</div>
    <div className="left-[16px] top-[91px] absolute text-zinc-700 text-base font-bold font-['Roboto']">General Motors</div>
    <div className="left-[16px] top-[43px] absolute text-neutral-500 text-sm font-normal font-['Roboto']">Booking ID: 123456789</div>
    <div className="left-[16px] top-[128px] absolute text-neutral-500 text-xs font-bold font-['Roboto']">DATE</div>
    <div className="left-[219px] top-[128px] absolute text-neutral-500 text-xs font-bold font-['Roboto']">PICK-UP TIME</div>
    <div className="left-[16px] top-[142px] absolute text-neutral-500 text-xs font-normal font-['Roboto']">21st Sept 2021, Monday</div>
    <div className="left-[219px] top-[142px] absolute text-neutral-500 text-xs font-normal font-['Roboto']">9:00-9:30am</div>
    <div className="px-[5px] py-px left-[245px] top-[16px] absolute bg-emerald-500 bg-opacity-10 rounded border border-green-600 justify-start items-start gap-2.5 inline-flex">
      <div className="text-green-600 text-[10px] font-bold font-['Roboto']">CONFIRMED</div>
    </div>
    <div className="left-[65px] top-[184px] absolute text-blue-600 text-sm font-bold font-['Roboto']">CALL</div>
    <div className="left-[219px] top-[184px] absolute text-red-500 text-sm font-bold font-['Roboto']">CANCEL</div>
  </div>
  </div>
    )
  }
  
  export default Service