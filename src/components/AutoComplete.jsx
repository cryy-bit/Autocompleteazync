import React, { createElement } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

const AutoComplete = props => {
    console.warn(props.useAvatar);
    return (
        <Autocomplete
            onBlur={props.onBlur}
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
                props.handleAutoCompleteChange(value, reason);
            }}
            autoHighlight
            filterOptions={x => x}
            loading={props.loading}
            loadingText={"Loading..."}
            getOptionLabel={optionList => `${optionList.companyName}`}
            isOptionEqualToValue={(optionList, value) => optionList.id === value.id}
            options={props.optionList}
            sx={{ width: 1 }}
            noOptionsText={"Not found"}
            renderOption={(optionProps, optionList) => (
                <Box component="li" key={optionList.id} sx={{ fontSize: "14px" }} {...optionProps}>
                    {props.useAvatar && (
                        <img
                            loading="lazy"
                            tabIndex="0"
                            width="24"
                            height="24"
                            src={`${optionList.avatar}`}
                            srcSet={`${optionList.avatar}`}
                            alt="com-img"
                            style={{ borderRadius: "2px", marginRight: "5px" }}
                        ></img>
                    )}
                    {optionList.companyName}
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    size="small"
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
