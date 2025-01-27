import { FC, useActionState } from 'react';

import { submitForm } from '../actions/submitForm';
import { DEFAULT_FORM_STATE, NAME_ID, TEXT_ID } from '../constants';
import { EInputVariant } from '../enums';
import { FormGroup } from './FormGroup';
import { Input } from './Input';
import { SubmitButton } from './SubmitButton';

interface IPostFormProperties {
  onSubmit: (name: string, text: string) => Promise<void>;
  apiError?: string;
}

export const PostForm: FC<IPostFormProperties> = ({ onSubmit, apiError }) => {
  const [state, submitAction] = useActionState<
    { name: string; text: string; errors: { name: string; text: string } },
    FormData
  >(submitForm(onSubmit), { ...DEFAULT_FORM_STATE });

  const {
    errors: { name: nameError, text: textError },
    name: nameValue,
    text: textValue,
  } = state;

  return (
    <form action={submitAction}>
      {apiError && <div className='text-red-500'>{apiError}</div>}
      <div>
        <FormGroup error={nameError} id={NAME_ID} label='Your name'>
          <Input
            defaultValue={nameValue}
            id={NAME_ID}
            name={NAME_ID}
            placeholder='Your name'
            type='text'
          />
        </FormGroup>
        <FormGroup error={textError} id={TEXT_ID} label='Your post'>
          <Input
            defaultValue={textValue}
            id={TEXT_ID}
            name={TEXT_ID}
            placeholder='Some post'
            rows={4}
            variant={EInputVariant.TEXTAREA}
          />
        </FormGroup>
      </div>
      <div className='mt-2'>
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
};
