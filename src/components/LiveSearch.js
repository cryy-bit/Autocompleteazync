import React, { createElement, useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import debounce from "lodash.debounce";

const LiveSearch = props => {
    // const dataSourceIdList = props.dataSource.items;
    let optionList = [];

    const { dataSource, stringInput, dataMapping, label } = props;
    const [isOpen, setIsOpen] = useState(false);
    const loading = isOpen;
    const hasChanged = useRef(false);

    const reasonEnum = {
        SELECT: "selectOption",
        CLEAR: "clear",
        REMOVE: "removeOption"
    }

    const propStatus = {
        AVAILABLE: "available",
        LOADING:"loading"
    }

    const handleInputChange = debounce(value => {
        stringInput.setValue(value);
        hasChanged.current = true;
        reloadData();
    }, 200);

    const reloadData = (reason) => {
        if ((dataSource.status === propStatus.AVAILABLE && isOpen && hasChanged.current) || 
        (dataSource.status === propStatus.AVAILABLE && reason === reasonEnum.CLEAR && hasChanged.current))  {
            dataSource.reload();
            hasChanged.current = false;
        }
    };

    const handleOnSelect = (value, reason) => {
        if (reason === reasonEnum.SELECT) {
            console.warn(value);
        }

        if (reason === reasonEnum.CLEAR) {
            hasChanged.current = true;
            stringInput.setValue("");
            reloadData(reason);
        }
    };

    if (dataSource.status === propStatus.AVAILABLE) {
        dataSource.items.map(item => {
            let newObject = { id: item.id, companyName: dataMapping.get(item).value };
            optionList.push(newObject);
        });
    }

    return (
        <Stack sx={{ width: 300 }}>
            <Autocomplete
                id="mxAutoComplete"
                open={isOpen}
                onOpen={() => {
                    setIsOpen(true);
                }}
                onClose={() => {
                    setIsOpen(false);
                }}
                onChange={(event, value, reason) => {
                    event.preventDefault();
                    handleOnSelect(value, reason);
                }}
                loading={loading}
                loadingText={"Loading..."}
                getOptionLabel={optionList => `${optionList.companyName}`}
                isOptionEqualToValue={(optionList, value) => optionList.id === value.id}
                options={optionList}
                sx={{ width: 300 }}
                noOptionsText={"Not found"}
                renderOptions={(props, optionList) => (
                    <Box component="li" {...props}>
                        {optionList.companyName}
                    </Box>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        value={stringInput.value}
                        onChange={event => {
                            event.preventDefault();
                            handleInputChange(event.target.value);
                        }}
                        label={label}
                    >
                        {""}
                    </TextField>
                )}
            />
        </Stack>
    );
};

export default LiveSearch;
