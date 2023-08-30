import { useEffect, useState } from 'react'
import OpcionInclude from './components/OpcionInclude';

interface CheckboxItem {
  isChecked: boolean;
  label: string;
}

function App() {
  const [sliderValue, setSliderValue] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState<CheckboxItem[]>([
    { isChecked: false, label: 'Include Uppercase Letters' },
    { isChecked: false, label: 'Include Lowercase Letters' },
    { isChecked: false, label: 'Include Numbers' },
    { isChecked: false, label: 'Include Symbols' },
  ]);

  

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index].isChecked = isChecked;
    setCheckboxStates(newCheckboxStates);
  };

  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-customgray mb-4 tracking-widest font-bold text-[20px]">Password Generator</h1>
      <div className="flex flex-row justify-between whitespace-nowrap bg-secundary w-1/3 p-4 rounded-sm gap-2">
        <input className=' bg-secundary text-customgray text-lg font-bold tracking-tighter w-[90%]' type="text" value="loremloremloremloremloremloremloremlorem" disabled/>
        <button className='text-customWhite font-light border rounded-lg py-1 px-2'>copy</button>
      </div>
      <div className="mt-4 flex flex-col gap-8 bg-secundary w-1/3 p-5 rounded-sm ">
          <div className='flex flex-row text-customWhite justify-between'>
            <p className='font-semibold'>Character Length</p>
            <p className='font-bold text-[25px]'>{sliderValue}</p>
          </div>
          <div className="w-full relative ">
            <input
              type="range"
              min="0"
              max="50"
              step="0"
              value={sliderValue}
              onChange={handleSliderChange}
              className="slider appearance-none w-full h-1 bg-black range-input-thumb"
            />
            <div className="absolute left-0 top-1/2 h-2 slider-fill" 
              style={{ width: `${sliderValue*2}%` }}
            />
          </div>
          <div className='flex flex-col gap-3'>
          {checkboxStates.map((item, index) => (
            <OpcionInclude 
            key={index}
            title={item.label} 
            isChecked={item.isChecked} 
            onCheckboxChange={(isChecked) => handleCheckboxChange(index, isChecked)}/>
      ))}
          </div>

          <div className='flex flex-row w-full p-4 justify-between bg-primary'>
            <p className='text-customgray text-[16px] font-normal'>STRENGTH</p>
            <div className='flex flex-row gap-2'>
              <p className='text-customWhite'>
                <strong>MEDIUM</strong>
              </p>
              <div className='flex flex-row gap-1'>
              {checkboxStates.map((item, index) => {
                if (item.isChecked == true) {
                  return <div key={index} className='w-2 h-full bg-customYellow'></div>;
                }
                
              })}

              {checkboxStates.map((item, index) => {
                if (item.isChecked == false) {
                  return <div key={index}  className='w-2 h-full border-2 border-customWhite border-solid'></div>;
                }
                
              })}
              </div>
            </div>
          </div>

          <button className='w-full h-12 font-semibold bg-customWhite text-primary text-[18px]'>
            GENERATE
          </button>

      </div>
    </div>
    </>
  )
}

export default App
