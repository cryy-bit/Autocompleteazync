import React, { createElement } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

const AutoComplete = props => {

    console.warn(props.loading);

   
    return (
        <Autocomplete
            id="mxAutoComplete"
            open={props.isOpen}
            onOpen={() => {
                props.setIsOpen(true);
            }}
            onClose={() => {
                props.setIsOpen(false);
            }}
            onChange={(event, value, reason) => {
                event.preventDefault();
                props.handleOnSelect(value, reason);
            }}
            autoHighlight
            filterOptions={(x)=>x}
            loading={props.loading}
            loadingText={"Loading..."}
            getOptionLabel={optionList => `${optionList.companyName}`}
            isOptionEqualToValue={(optionList, value) => optionList.id === value.id}
            options={props.optionList}
            sx={{ width: 300 }}
            noOptionsText={"Not found" }
            renderOptions={(props, optionList) => (
                <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 }, height: 100 }} {...props}>
                    <img
                        loading="lazy"
                        tabIndex="0"
                        width="20"
                        height="auto"
                        src={`${optionList.avatar}`}
                        srcSet={`${optionList.avatar}`}
                        alt="com-img"
                    ></img>

                    {optionList.companyName}
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    value={props.stringInput.value}
                    onChange={event => {
                        event.preventDefault();
                        props.handleInputChange(event.target.value);
                    }}
                    label={props.label}
                >
                    {""}
                </TextField>
            )}
        />
    );
};

export default AutoComplete;
