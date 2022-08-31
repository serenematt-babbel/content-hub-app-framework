import React, { useState } from 'react';
import { Select } from '@contentful/f36-components';
import { EditorExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';

const Field = () => {
  const sdk = useSDK<EditorExtensionSDK>();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/

  const [selectValue, setSelectValue] = useState('default');
  const handleOnChange = (event: any) => {
    setSelectValue(event.target.value);
    // Attempt disabling some fields if a selected value matches
    if (event.target.value === 'campaign') {
      const headerFields = ['headerButtonText', 'headerButtonTarget', 'headerImage'];
      sdk.editor.editorInterface.controls?.map((control) => {
        console.log(control);
        // Note: Even though `control` includes field info containing `disabled` property,
        // you cannot edit the disabled property :(
        // if (headerFields.includes(control.field)) {
        //   control.field.disabled = true;
        // }
      });
    }
  };

  return (
    <Select id="optionSelect-controlled" name="optionSelect-controlled" value={selectValue} onChange={handleOnChange}>
      <Select.Option value="default">Default</Select.Option>
      <Select.Option value="campaign">Campaign</Select.Option>
    </Select>
  );
};

export default Field;
