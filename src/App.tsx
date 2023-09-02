import { useEffect, useState } from 'react'
import OpcionInclude from './components/OpcionInclude';

interface CheckboxItem {
  isChecked: boolean;
  label: string;
  character: string;
}

function App() {
  const [logitudPassword, setLogitudPassword] = useState<number>(4);
  const [passwordNew, setPasswordNew] = useState<string>("");
  const [stateStrength, setStateStrength] = useState<string>("easy");
  const [copy, setCopy] = useState<boolean>(false);
  const [checkboxStates, setCheckboxStates] = useState<CheckboxItem[]>([
    { isChecked: true, label: 'Include Uppercase Letters', character: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'},
    { isChecked: false, label: 'Include Lowercase Letters', character: 'abcdefghijklmnopqrstuvwxyz'},
    { isChecked: false, label: 'Include Numbers', character: '0123456789'},
    { isChecked: false, label: 'Include Symbols', character: '!@#$%^&*()_-+='},
  ]);

  function passwordStrength(): void{
    const counterTrue = checkboxStates.filter(objeto => objeto.isChecked === true).length;
    let strength: string[] = ["easy", "medium", "strong", "robust"];
    setStateStrength(strength[counterTrue-1]);
  }

  function characterPassword(): string{
    let passCharacter: string = "";
    let indice: number = 0; 
    while(indice < checkboxStates.length){
      const item = checkboxStates[indice];
      if (item.isChecked == true) {
        passCharacter = passCharacter+""+item.character;
      }
      indice++;
    }
    return passCharacter;
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(passwordNew)
      .then(() => {
        setCopy(true);
      })
      .catch(() => {
        setCopy(false);
      });
  };

  function generatePassword(caracteresPermitidos: string): string {
    let password: string = '';
    const caracteresDisponibles = caracteresPermitidos.length;
  
    for (let i = 0; i < logitudPassword; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresDisponibles);
      password += caracteresPermitidos.charAt(indiceAleatorio);
    }
  
    return password;
  }

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index].isChecked = isChecked;
    setCheckboxStates(newCheckboxStates);
    passwordStrength();
  };

  const handleSliderChange = (e: any) => {
    setLogitudPassword(e.target.value);
  };

  const showPassword = () =>{
    let passwordCharacter = characterPassword();
    let password = generatePassword(passwordCharacter);

    const counterTrue = checkboxStates.filter(objeto => objeto.isChecked === true).length;
    if (counterTrue < 1) {
      alert("Select which characters to include");
    }else{
        if (logitudPassword < 1) {
          alert("Change character length");
        }else{
          setPasswordNew(password);
        }
    }
    
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-customgray mb-4 tracking-widest font-bold text-[20px]">Password Generator</h1>
      <div className="flex flex-row justify-between whitespace-nowrap bg-secundary w-1/3 p-4 rounded-sm gap-2">
        <input className=' bg-secundary text-customgray text-lg font-semibold tracking-tighter w-[90%]' type="text" value={passwordNew} placeholder='Password' disabled/>
        <button onClick={copyPassword} className='text-customWhite font-light border rounded-lg py-1 px-2 focus:border-primary focus:bg-customWhite focus:text-primary'>copy</button>
      </div>
      <div className="mt-4 flex flex-col gap-8 bg-secundary w-1/3 p-5 rounded-sm ">
          <div className='flex flex-row text-customWhite justify-between'>
            <p className='font-semibold'>Character Length</p>
            <p className='font-bold text-[25px]'>{logitudPassword}</p>
          </div>
          <div className="w-full relative ">
            <input
              type="range"
              min="0"
              max="50"
              value={logitudPassword}
              onChange={handleSliderChange}
              className="slider appearance-none w-full h-1 bg-black range-input-thumb"
            />
            <div className="absolute left-0 top-1/2 h-2 slider-fill" 
              style={{ width: `${logitudPassword*2}%` }}
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
                <strong className='uppercase'>{stateStrength}</strong>
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

          <button onClick={showPassword} className='w-full h-12 font-semibold bg-customWhite text-primary text-[18px]'>
            GENERATE
          </button>

      </div>
    </div>
    </>
  )
}

export default App
