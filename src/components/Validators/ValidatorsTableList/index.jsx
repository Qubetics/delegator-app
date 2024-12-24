/*eslint-disable*/
import { InputAdornment, InputBase, TextField } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import Tabs from "../../Common/Tabs";
import ValidatorsTable from "./ValidatorsTable";
import { Search, TabsSection, Buttoncontainer } from "./styles";
import { MagnifierIcon } from "../../../assets/Icons/SvgIcon";

const ValidatorsTableList = () => {
  const [tabId, setTabId] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [searchDisable, setSearchDisable] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  let regex = /^[A-Za-z0-9\s]*$/;

  const [validatorsCount, setValidatorsCount] = useState({
    active: 0,
    inactive: 0,
    deactivating: 0,
    allValidators: 0,
  });

  const toggleTabHandler = useCallback((_tabId) => {
    setTabId(_tabId);
  }, []);

  const handleSearchChange = (evt) => {
    if (regex.test(evt?.target?.value)) {
      setIsSearch(false)
      const sanitizedValue = evt?.target?.value.replace(/\s+/g, " ");
      setSearchData(sanitizedValue);
    }
  };

  useEffect(() => {
    if (searchData?.length > 0) {
      setSearchDisable(false);
    } else {
      setSearchDisable(true);
      setIsSearch(false);
    }
  }, [searchData]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchData?.length > 0) {
      e.preventDefault();
      setIsSearch(true);
    }
  };

  useEffect(() => {
    if (searchData?.length == 0 && isSearch == false) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [searchData, isSearch]);

  return (
    <>
      <TabsSection>
        <Tabs
          tabId={tabId}
          toggleTabHandler={toggleTabHandler}
          isDisable={isDisable}
          validatorsCount={validatorsCount}
        />
        {/* <Search component="form">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for an address or name"
            inputProps={{ "aria-label": "search validator" }}
            onChange={handleSearchChange}
            value={searchData || ""}
            onKeyPress={handleKeyPress}
          />
          <Buttoncontainer>
            <button
              className={!isDisable ? "disable" : ""}
              onClick={(e) => (e.preventDefault(), setIsSearch(true))}
              disabled={searchDisable}
            >
              Search
            </button>
          </Buttoncontainer>
        </Search> */}

        <Search className="searchfield">
          <TextField
            variant="outlined"
            placeholder="Search for name or address"
            fullWidth
            onChange={handleSearchChange}
            value={searchData || ""}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifierIcon />
                </InputAdornment>
              ),
            }}
          />
          <button
            className={!isDisable ? "disable" : ""}
            onClick={(e) => (e.preventDefault(), setIsSearch(true))}
            disabled={searchDisable}
          >
            Search
          </button>
        </Search>
      </TabsSection >
      <ValidatorsTable
        tabId={tabId}
        searchData={searchData}
        setTabId={setTabId}
        setIsSearch={setIsSearch}
        isSearch={isSearch}
        setValidatorsCount={setValidatorsCount}
      />
    </>
  );
};

export default ValidatorsTableList;
