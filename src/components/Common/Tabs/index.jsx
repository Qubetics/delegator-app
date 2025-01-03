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
          label={`All Validators (${validatorsCount?.allValidators})`}
          {...a11yProps(0)}
        />
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={` Active (${validatorsCount?.active})`}
          {...a11yProps(1)}
        />
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={` Inactive (${validatorsCount?.inactive})`}
          {...a11yProps(2)}
        />
        <StyledTab
          className={isDisable ? "disabled" : ""}
          label={`Deactivating (${validatorsCount?.deactivating})`}
          {...a11yProps(3)}
        />
      </StyledTabs>
    </StyledBox>
  );
};

export default Tabs;
