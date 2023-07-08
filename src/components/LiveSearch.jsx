import React, { createElement, useState, useRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import populateOptionList from "./populateOptionList";
import AutoComplete from "./AutoComplete";

const LiveSearch = props => {
    const propStatus = {
        AVAILABLE: "available",
        LOADING: "loading"
    };

    const reasonEnum = {
        SELECT: "selectOption",
        CLEAR: "clear",
        REMOVE: "removeOption"
    };

    let optionList = [];
    const { dataSource, stringInput, useAvatar, avatar, dataMapping, label, association, onSelect } = props;
    const [isOpen, setIsOpen] = useState(false);
    const loading = dataSource.status === propStatus.LOADING;
    const hasChanged = useRef(false);

    //useEffect is used here to trigger setLimit function in response to
    //isOpen state changes. This is a side-effect that must be handled
    //because we want to make sure the Widget does not retrieve data before
    //it's actually needed!! This is very important on first-render

    useEffect(() => {
        if (isOpen) {
            dataSource.setLimit(undefined);
        } else {
            dataSource.setLimit(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.warn("Load Data");
            reloadData();
        }, 300);

        return () => {
            console.warn("Clean up!");
            clearTimeout(identifier);
        };
    }, [stringInput.value]);

    const handleInputChange = value => {
        stringInput.setValue(value);
        hasChanged.current = true;
    };

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
            console.warn("clearing");
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
                dataSource={dataSource}
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
