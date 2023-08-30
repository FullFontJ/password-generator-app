import { useState } from "react";

interface ChildComponentProps {
    title: string;
    isChecked: boolean;
    onCheckboxChange: (isChecked: boolean) => void;
  }
  

export default function OpcionInclude({title, isChecked, onCheckboxChange }: ChildComponentProps){
    const [valueCheckbox, setvalueCheckbox] = useState('');
    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        onCheckboxChange(isChecked);
    };
    return(
    <>
        <div className='flex flex-row gap-2'>
            <input className=' bg-blue-500 border-blue-500' type="checkbox" checked={isChecked} onChange={handleCheckboxClick}  />
            <p className='text-customWhite font-bold tracking-wider'>{title}</p>
        </div>
    </>
    );
}