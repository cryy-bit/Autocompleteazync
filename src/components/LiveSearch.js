import React, { useState, useEffect, createElement } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";

const LiveSearch = props => {
    // const dataSourceIdList = props.dataSource.items;
    let optionList = [];

    const { dataSource, stringInput, dataMapping } = props;

    
    if (dataSource.status === "available"){
        dataSource.items.forEach(id => {
            optionList.push(dataMapping.get(id).value);
        });
    }

    return (
        <Stack sx={{ width: 300 }}>
            <Autocomplete
                id="mxAutoComplete"
                getOptionLabel={optionList => `${optionList}`}
                options={optionList}
                sx={{ width: 300 }}
                noOptionsText={"Not found"}
                renderOptions={(props, optionList) => (
                    <Box component="li" {...props}>
                        {optionList}
                    </Box>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        value={stringInput.value}
                        onChange={(event) => {
                            event.preventDefault();
                            stringInput.setValue(event.target.value);

                            if (dataSource.status === "available") {
                                console.warn(dataSource);
                                dataSource.reload();
                            }               
                            console.warn(stringInput.value);
                        }}
                        label="Search for things"
                    >
                        {" "}
                    </TextField>
                )}
            />
        </Stack>
    );
};

export default LiveSearch;
