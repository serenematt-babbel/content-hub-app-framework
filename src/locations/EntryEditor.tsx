import React, { useState } from 'react';
import { TextInput, FormLabel, Select } from '@contentful/f36-components';
import { EditorExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const Entry = () => {
  const sdk = useSDK<EditorExtensionSDK>();
  sdk.editor.editorInterface.controls?.map((control) => console.log(control));

  const [selectValue, setSelectValue] = useState('default');
  const [active, setActive] = useState(true);

  const handleOnChange = (event: any) => {
    setSelectValue(event.target.value);
    // Attempt disabling some fields if a selected value matches
    if (event.target.value === 'campaign') {
      setActive(true);
      return;
    }

    setActive(false);
  };

  return (
    <>
      <Select
        style={{ marginTop: 30 }}
        id="optionSelect-controlled"
        name="optionSelect-controlled"
        value={selectValue}
        onChange={handleOnChange}
      >
        <Select.Option value="default">Default</Select.Option>
        <Select.Option value="campaign">Campaign</Select.Option>
      </Select>

      {active && (
        <div style={{ marginTop: 30 }}>
          <FormLabel>Special field for campaign</FormLabel>
          <TextInput type="text"></TextInput>
        </div>
      )}

      <FormLabel style={{ marginTop: 30 }}>Field for all layouts</FormLabel>
      <TextInput type="text"></TextInput>
    </>
  );
};

export default Entry;
