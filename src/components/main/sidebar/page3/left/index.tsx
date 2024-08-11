// App imports
import { Area } from './area';
import { Catchment } from './catchment';
import './styles.scss';

export const Left = () => {
  return (
    <div className="left-wrapper">
      <div className="left-items-wrapper">
        <Catchment/>
        <Area/>
      </div>
    </div>
  )
}

Left.displayName="Left"