const populateOptionList = (dataSource, dataMapping, avatar, useAvatar, optionList) => {

    dataSource.items.map(item => {
        let newObject = { id: item.id, companyName: dataMapping.get(item).value, avatar: useAvatar ? avatar.get(item).value: "" };
        optionList.push(newObject);
    });

    return optionList;
};

export default populateOptionList;
