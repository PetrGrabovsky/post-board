import clsx from 'clsx';
import { FC, useActionState } from 'react';

import { FormGroup } from './FormGroup';

const DEFAULT_FORM_STATE = { name: '', text: '', errors: { name: '', text: '' } };

const FIELD_CLASS_NAME = clsx(
  'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none',
  'focus:ring-indigo-500',
);

const validateForm = (name: string, text: string) => {
  const errors = { ...DEFAULT_FORM_STATE.errors };

  if (name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (text.trim().length === 0) {
    errors.text = 'Text is required';
  } else if (text.trim().length < 3) {
    errors.text = 'Text must be at least 3 characters long';
  }

  return errors;
};

interface IPostFormProperties {
  onSubmit: (name: string, text: string) => void;
}

export const PostForm: FC<IPostFormProperties> = ({ onSubmit }) => {
  const [state, submitAction] = useActionState<
    { name: string; text: string; errors: { name: string; text: string } },
    FormData
  >(
    (_, payload) => {
      const name = payload.get('name') as string;
      const text = payload.get('text') as string;

      const errors = validateForm(name, text);

      if (errors.name || errors.text) {
        return { text, name, errors };
      }

      onSubmit(name, text);

      return { ...DEFAULT_FORM_STATE };
    },
    { ...DEFAULT_FORM_STATE },
  );

  const {
    errors: { name: nameError, text: textError },
    name: nameValue,
    text: textValue,
  } = state;

  return (
    <form action={submitAction}>
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
        <button className='w-fit bg-green-600 px-6 py-3 font-bold text-white' type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
};
