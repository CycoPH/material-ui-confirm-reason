import React, { useState, useCallback, Fragment } from 'react';
import ConfirmContext from './ConfirmContext';
import ConfirmationDialog from './ConfirmationDialog';

const _defaultOptions = {
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

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
	const [options, setOptions] = useState({ ..._defaultOptions, ...defaultOptions });
	const [resolveReject, setResolveReject] = useState([]);
	const [resolve, reject] = resolveReject;

	const confirm = useCallback((options = {}) => {
		return new Promise((resolve, reject) => {
			setOptions({ ..._defaultOptions, ...defaultOptions, ...options });
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
