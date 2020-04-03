# Material-UI confirm with reason [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/CycoPH/material-ui-confirm-reason/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/material-ui-confirm-reason.svg)](https://www.npmjs.com/package/material-ui-confirm-reason) [![Build Status](https://travis-ci.com/github/CycoPH/material-ui-confirm-reason.svg?branch=master)](https://travis-ci.com/github/CycoPH/material-ui-confirm-reason) 

> Confirming user choice is a good thing to do, it should also be easy to do.

This package provides simple confirmation dialogs built on top of [@material-ui/core](https://material-ui.com/)
and straightforward to use thanks to React Hooks. Based on the work of [Jonatan Klosko's material-ui-confirm](https://github.com/jonatanklosko/material-ui-confirm).

## Installation

```sh
npm install --save material-ui-confirm-reason
```

## Demo

Run with ZZ
```sh 
npm run storybook
```

## Usage

Wrap your app inside the `ConfirmProvider` component.\
*Note: If you're using Material UI `ThemeProvider`, make sure `ConfirmProvider` is a child of it.*

```js
import React from 'react';
import { ConfirmProvider } from 'material-ui-confirm';

const App = () => {
  return (
    <ConfirmProvider>
      {/* ... */}
    </ConfirmProvider>
  );
};

export default App;
```

Call the `useConfirm` hook wherever you need the `confirm` function.

```js
import React from 'react';
import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';

const Item = () => {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({ description: 'This action is permanent!' })
      .then(() => { /* ... */ });
  };

  return (
    <Button onClick={handleClick}>
      Click
    </Button>
  );
};

export default Item;
```

## API

#### `ConfirmProvider`

This component is required in order to render a dialog in the component tree.

##### Props:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`defaultOptions`** | `object` | `{}` | Overrides the default options used by [`confirm`](#useconfirm-confirm). |

#### `useConfirm() => confirm`

This hook returns the `confirm` function.

#### `confirm([options]) => Promise`

This function opens a confirmation dialog and returns a promise
representing the user choice (resolved, with reason, on confirmation and rejected otherwise).

##### Options:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`title`** | `string` | `'Are you sure?'` | Dialog title. |
| **`description`** | `string` | `''` | Dialog content. |
| **`confirmationText`** | `string` | `'Ok'` | Confirmation button caption. |
| **`cancellationText`** | `string` | `'Cancel'` | Cancellation button caption. |
| **`dialogProps`** | `object` | `{}` | Material-UI [Dialog](https://material-ui.com/api/dialog/#props) props. |
| **`confirmationButtonProps`** | `object` | `{}` | Material-UI [Button](https://material-ui.com/api/button/#props) props for the confirmation button. |
| **`cancellationButtonProps`** | `object` | `{}` | Material-UI [Button](https://material-ui.com/api/dialog/#props) props for the cancellation button. |
| **`reason`** | `object` | `undefined` | Supply to show and possibly validate a reason field |
| **`reasonTextProps`** | `object` | `{}` | Material-UI [TextField](https://material-ui.com/components/text-fields) props for the text field. |

##### Reason options:
To have a `Reason` field displayed and the typed in text supplied with the confirmation button configure the `reason` field with the following options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`error`** | `bool` | false | Set to true to show the text in red. |
| **`errorMsg`** | `string` | Empty string | Helper text shown under the text field. |
| **`check`** | `function` | undefined | Function that will be called to check is the text in the reason field is ok (string) => {... return "error msg;" or return;}. |
