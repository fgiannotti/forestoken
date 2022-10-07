import React, { useContext, createContext } from 'react';

//Context
export const FormContext = createContext(null);

//Provider
export const FormContextProvider = ({ children }) => {
  const [variableState, setVariableState] = React.useState(false);

  //ComponentDidMouunt
  React.useEffect(() => {
    console.log('ComponentDidMouunt');
  }, []);

  // Interface donde será expuesto como proveedor y envolverá.
  return (
    <FormContext.Provider value={{ variableState, setVariableState }}>
      {children}
    </FormContext.Provider>
  );
};

//
export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useFormContext;
