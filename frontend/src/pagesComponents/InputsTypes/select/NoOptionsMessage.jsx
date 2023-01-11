import { components } from 'react-select';

export const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">Seleccione uno de nuestros servicios</span> 
      </components.NoOptionsMessage>
    );
  };