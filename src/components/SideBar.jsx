// Import useState and useEffect hooks
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Toolbar,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { singleFilter } from "./FilterData";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDomainsAsync,
  getAllDomains,
} from "../features/users/userSlice";

const Sidebar = ({ handleToggleDrawer, open }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usersDomains = useSelector(getAllDomains);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const domain = searchParams.get("domain");
  const gender = searchParams.get("gender");
  const availability = searchParams.get("availability");

  const [selectedFilters, setSelectedFilters] = useState({});
  const [openSections, setOpenSections] = useState({});
  const availabilityFilter = availability === "true";

  const filters = [
    {
      id: "domain",
      name: "Domains",
      options: usersDomains,
    },
  ];

  useEffect(() => {
    setSelectedFilters({
      domain: domain,
      gender: gender,
      availability: availability,
    });

    setOpenSections({
      domain: !!domain,
      gender: !!gender,
      availability: !!availability,
    });
  }, [domain, gender, availability]);

  useEffect(() => {
    const fetchDomains = async () => {
      await dispatch(fetchAllDomainsAsync());
    };
    fetchDomains();
  }, []);

  const handleToggle = (sectionId) => {
    setOpenSections({
      ...openSections,
      [sectionId]: !openSections[sectionId],
    });
  };

  const handleCheckboxFilterChange = (optionValue, sectionId) => {
    handleFilter(optionValue, sectionId);
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const value = e.target.value;
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = searchParams.getAll(sectionId);
    if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
      filterValues = filterValues[0]
        .split(",")
        .filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0)
      searchParams.set(sectionId, filterValues.join(","));
    else searchParams.delete(sectionId);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const DrawerList = (
    <List>
      <ListItem disablePadding></ListItem>
      {filters.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-6 mx-1">
          <h3 className="-my-3 flow-root">
            <button
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              onClick={() => handleToggle(section.id)}
            >
              <span className="font-medium text-gray-900 px-2">
                {section.name}
              </span>
              <span className="ml-6 flex items-center">
                {openSections[section.id] ? (
                  <RemoveIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <AddIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </button>
          </h3>

          {openSections[section.id] && (
            <div className="pt-6">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`filter-mobile-${section.id}-${optionIdx}`}
                    name={`${section.id}[]`}
                    defaultValue={option.value}
                    type="checkbox"
                    checked={selectedFilters[section.id]?.includes(
                      option.value
                    )}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={() =>
                      handleCheckboxFilterChange(option.value, section.id)
                    }
                  />
                  <label
                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {singleFilter.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-6 mx-1">
          <h3 className="-my-3 flow-root">
            <button
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              onClick={() => handleToggle(section.id)}
            >
              <span className="font-medium text-gray-900 px-2">
                {section.name}
              </span>
              <span className="ml-6 flex items-center">
                {openSections[section.id] ? (
                  <RemoveIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <AddIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </button>
          </h3>
          {openSections[section.id] && (
            <div className="pt-6">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={section.name}
                  name={section.name}
                  value={selectedFilters[section.id] || ""}
                  onChange={(e) => handleRadioFilterChange(e, section.id)}
                >
                  {section.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          )}
        </div>
      ))}
    </List>
  );

  return (
    <>
      <Box>
        <Drawer open={open} onClose={handleToggleDrawer}>
          <Box
            sx={{
              width: 200,
              height: "100%",
            }}
          >
            {DrawerList}
          </Box>
        </Drawer>
      </Box>
      <Box flex={1} p={2} sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          // position="fixed"
          sx={{
            width: 200,
            // overflowY: "auto",
            height: "100%",
          }}
        >
          {DrawerList}
        </Box>
      </Box>
      <Toolbar />
    </>
  );
};

export default Sidebar;
