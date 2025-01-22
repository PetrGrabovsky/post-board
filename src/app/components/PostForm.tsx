import clsx from 'clsx';
import { FC, useActionState } from 'react';

import { DEFAULT_FORM_STATE, submitForm } from '../actions/submitForm';
import { FormGroup } from './FormGroup';
import { SubmitButton } from './SubmitButton';

const FIELD_CLASS_NAME = clsx(
  'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none',
  'focus:ring-indigo-500',
);

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
        <FormGroup error={nameError} id='name' label='Your name'>
          <input
            className={FIELD_CLASS_NAME}
            defaultValue={nameValue}
            id='name'
            name='name'
            placeholder='Your name'
            type='text'
          />
        </FormGroup>
        <FormGroup error={textError} id='text' label='Your post'>
          <textarea
            className={FIELD_CLASS_NAME}
            defaultValue={textValue}
            id='text'
            name='text'
            placeholder='Some post'
            rows={4}
          />
        </FormGroup>
      </div>
      <div className='mt-2'>
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
};
