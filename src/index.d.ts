import * as React from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';
import { TextFieldProps } from '@material-ui/core/TextField';

export interface ConfirmOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: DialogProps;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  reasonTextProps?: TextFieldProps;
}

export interface ConfirmProviderProps {
  defaultOptions?: ConfirmOptions;
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>;

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>;
