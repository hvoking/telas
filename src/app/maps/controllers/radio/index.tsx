// App imports
import './styles.scss';

// Context imports
import { useScroll } from 'context/scroll';

export const RadioSelector = () => {
  const { 
    view1, setScroll1, 
    view2, setScroll2, 
    view3, setScroll3, 
    view4, setScroll4, 
  } = useScroll();

  return (
      <div className="selector-wrapper">
        <input 
          onChange={() => setScroll1((prev: any) => !prev)}
          name="sidebar-selector" 
          type="radio" 
          value="bairro" 
          checked={view1}
        />
        <input 
          onChange={() => setScroll2((prev: any) => !prev)}
          name="sidebar-selector" 
          type="radio" 
          value="censo"
          checked={view2}
        />
        <input 
          onChange={() => setScroll3((prev: any) => !prev)}
          name="sidebar-selector" 
          type="radio" 
          value="parcels"
          checked={view3}
        />
        <input 
          onChange={() => setScroll4((prev: any) => !prev)}
          name="sidebar-selector" 
          type="radio" 
          value="empresas"
          checked={view4}
        />
      </div>
    )
}

RadioSelector.displayName="RadioSelector";