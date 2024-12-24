/*eslint-disable*/
import { StyledBox, StyledTabs, StyledTab } from './styles';

function a11yProps(index) {
  return {
    id: `common-tab-${index}`,
    'aria-controls': `common-tabpanel-${index}`,
  };
}

const Tabs = ({ tabId, toggleTabHandler, isDisable, validatorsCount }) => {

  const handleChange = (event, newValue) => {
    if (!isDisable) {
      toggleTabHandler(newValue);
    }
  };

  return (
    <StyledBox>
      <StyledTabs value={tabId} onChange={handleChange} aria-label="common tabs">
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={`All VALIDATORS (${validatorsCount?.allValidators})`}
          {...a11yProps(0)}
        />
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={`ACTIVE (${validatorsCount?.active})`}
          {...a11yProps(1)}
        />
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={`INACTIVE (${validatorsCount?.inactive})`}
          {...a11yProps(2)}
        />
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={`DEACTIVATING (${validatorsCount?.deactivating})`}
          {...a11yProps(3)}
        />
      </StyledTabs>
    </StyledBox>
  );
};

export default Tabs;
