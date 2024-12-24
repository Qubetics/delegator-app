/*eslint-disable*/
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AmountContext = createContext();

export const AmountProvider = ({ children }) => {
  const [updatedAmount, setUpdatedAmount] = useState(false);

  return (
    <AmountContext.Provider value={{ updatedAmount, setUpdatedAmount }}>
      {children}
    </AmountContext.Provider>
  );
};

export const GetAmountValue = () => useContext(AmountContext);

AmountProvider.propTypes = {
  children: PropTypes.node,
};
