import React, { createElement, useState, useRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import debounce from "lodash.debounce";
import populateOptionList from "./populateOptionList";
import AutoComplete from "./AutoComplete";

const LiveSearch = props => {
    let optionList = [];
    const { dataSource, stringInput, useAvatar, avatar, dataMapping, label, association, onSelect } = props;
    const [isOpen, setIsOpen] = useState(false);
    const loading = isOpen;
    const hasChanged = useRef(false);

    const reasonEnum = {
        SELECT: "selectOption",
        CLEAR: "clear",
        REMOVE: "removeOption"
    };

    const propStatus = {
        AVAILABLE: "available",
        LOADING: "loading"
    };

    const handleInputChange = debounce(value => {
        stringInput.setValue(value);
        hasChanged.current = true;
        reloadData();
    }, 200);

    const reloadData = reason => {
        if (
            (dataSource.status === propStatus.AVAILABLE && isOpen && hasChanged.current) ||
            (dataSource.status === propStatus.AVAILABLE &&
                (reason === reasonEnum.CLEAR || reason === reasonEnum.REMOVE) &&
                hasChanged.current)
        ) {
            dataSource.reload();
            hasChanged.current = false;
        }
    };

    const handleOnSelect = (value, reason) => {
        if (reason === reasonEnum.SELECT) {
            console.warn(value);
            association.setValue(dataSource.items.find(item => item.id === value.id));
            if (onSelect && onSelect.canExecute) {
                onSelect.execute();
            }
        }

        if (reason === reasonEnum.CLEAR || reason === reasonEnum.REMOVE) {
            hasChanged.current = true;
            stringInput.setValue("");
            reloadData(reason);
        }
    };

    if (dataSource.status === propStatus.AVAILABLE) {
        populateOptionList(dataSource, dataMapping, avatar, useAvatar, optionList);
    }

    return (
        <Stack sx={{ width: 300 }}>
            <AutoComplete
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                loading={loading}
                handleOnSelect={handleOnSelect}
                handleInputChange={handleInputChange}
                optionList={optionList}
                stringInput={stringInput}
                label={label}
                useAvatar={useAvatar}
            />
        </Stack>
    );
};

export default LiveSearch;
