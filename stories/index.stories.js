import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { storiesOf, addDecorator } from '@storybook/react';
import { ConfirmProvider, useConfirm } from '../src/index';

const confirmationAction = action('confirmed');

const Basic = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => confirm().then(confirmationAction)}>
      Click
    </Button>
  );
};

const WithDescription = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({ description: 'This action is permanent!' })
        .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomText = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        title: 'Reset setting?',
        description: 'This will reset your device to its factory settings.',
        confirmationText: 'Accept',
        cancellationText: 'Cancel',
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithDialogProps = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        dialogProps: { fullWidth: false, disableEscapeKeyDown: true },
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomButtonProps = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
        cancellationButtonProps: { variant: 'outlined' },
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomCallbacks = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm()
        .then(confirmationAction)
        .catch(action('cancelled'))
        .finally(action('closed'));
    }}>
      Click
    </Button>
  );
};

const WithCustomElements = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        title: (
          <Tooltip title="Fancy tooltip here!">
            <span>
              Reset setting?
            </span>
          </Tooltip>
        ),
        description: (
          <LinearProgress />
        ),
        confirmationText: 'Accept',
        cancellationText: 'Cancel',
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const BasicWithReason = () => {
	const confirm = useConfirm();
	return (
	  <Button onClick={() => 
			confirm({reason:true})
				  .then(confirmationAction)
		          .catch(action('cancelled'))
        		  .finally(action('closed'))
	  }>
		Click
	  </Button>
	);
};

const ReasonWithCustomCheck = () => {
	const confirm = useConfirm();
	return (
	  <Button onClick={() => {
		confirm({
		  reason: {
			check: (text) => {
				if (text.length < 10) return "Reason has to be at least 10 long";
				if (text.length > 20) return "Reason can be at most 20 long";
			}
		  },
		})
		.then(confirmationAction);
	  }}>
		Click
	  </Button>
	);
}

const ReasonWithCustomCheckErrorPreSet = () => {
	const confirm = useConfirm();
	return (
	  <Button onClick={() => {
		confirm({
		  confirmationText: "Delete",
		  reason: {
			error: true,
			errorMsg: "Give a good reason why we should delete",
			check: (text) => {
				if (text.length === 0) return "At least something";
			}
		  },
		})
		.then(confirmationAction);
	  }}>
		Click
	  </Button>
	);
  };

const ReasonWithAutoComplete = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        confirmationText: "Delete",
        reason: true,
        reasonTextProps: {inputProps: {autoComplete: "on"}}
      })
        .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

storiesOf('Confirmation dialog', module)
  .addDecorator(getStory => (
    <ConfirmProvider>{getStory()}</ConfirmProvider>
  ))
  .add('basic', () => <Basic />)
  .add('with description', () => <WithDescription />)
  .add('with custom text', () => <WithCustomText />)
  .add('with custom dialog props', () => <WithDialogProps />)
  .add('with custom button props', () => <WithCustomButtonProps />)
  .add('with custom callbacks', () => <WithCustomCallbacks />)
  .add('with custom elements', () => <WithCustomElements />)
  .add('basic with reason', () => <BasicWithReason />)
  .add('reason with check function', () => <ReasonWithCustomCheck />)
  .add('reason with check function and preset error', () => <ReasonWithCustomCheckErrorPreSet />)
  .add('reason with auto complete in text field', () => <ReasonWithAutoComplete />)
  ;
