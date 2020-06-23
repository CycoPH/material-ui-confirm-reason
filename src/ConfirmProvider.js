import React, { useState, useCallback, Fragment } from 'react';
import ConfirmContext from './ConfirmContext';
import ConfirmationDialog from './ConfirmationDialog';

const DEFAULT_OPTIONS = {
	title: 'Are you sure?',
	description: '',
	confirmationText: 'Ok',
	cancellationText: 'Cancel',
	dialogProps: {},
	confirmationButtonProps: {},
	cancellationButtonProps: {},
	reason: undefined,
	reasonTextProps: {},
};

const buildOptions = (defaultOptions, options) => {
	const dialogProps = {
		...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
		...(options.dialogProps || {}),
	};
	const confirmationButtonProps = {
		...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
		...(options.confirmationButtonProps || {}),
	};
	const cancellationButtonProps = {
		...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
		...(options.cancellationButtonProps || {}),
	};
	const reasonTextProps = {
		...(defaultOptions.reasonTextProps || DEFAULT_OPTIONS.reasonTextProps),
		...(options.reasonTextProps || {}),
	};

	return {
		...DEFAULT_OPTIONS,
		...defaultOptions,
		...options,
		dialogProps,
		confirmationButtonProps,
		cancellationButtonProps,
		reasonTextProps,
	}
};

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...defaultOptions });
	const [resolveReject, setResolveReject] = useState([]);
	const [resolve, reject] = resolveReject;

	const confirm = useCallback((options = {}) => {
		return new Promise((resolve, reject) => {
      setOptions(buildOptions(defaultOptions, options));
			setResolveReject([resolve, reject]);
		});
	}, []);

	const handleClose = useCallback(() => {
		setResolveReject([]);
	}, []);

	const handleCancel = useCallback(() => {
		reject();
		handleClose();
	}, [reject, handleClose]);

	const handleConfirm = useCallback(() => {
		var reasonVal;
		if (options.reason) {
			reasonVal = document.getElementById("material-ui-confirm-reason").value;
			if (options.reason.check && typeof options.reason.check === 'function') {
				var failedMsg = options.reason.check(reasonVal);
				if (failedMsg) {
					setOptions( {
						...options,
						reason: {
							...options.reason,
							error: true,
							errorMsg: failedMsg,
						}
					});
					return;
				}
			}
		}
		resolve(reasonVal);
		handleClose();
	}, [resolve, handleClose]);

	return (
		<Fragment>
			<ConfirmContext.Provider value={confirm}>
				{children}
			</ConfirmContext.Provider>
			<ConfirmationDialog
				open={resolveReject.length === 2}
				options={options}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		</Fragment>
	);
};

export default ConfirmProvider;
