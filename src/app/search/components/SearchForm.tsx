import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useEffect } from 'react';

import { FormGroup } from '@/app/components/FormGroup';
import { Input } from '@/app/components/Input';

import { SEARCH_PARAMETER } from '../constants';

const SEARCH_ID = 'search';

interface ISearchFormProperties {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  apiError?: string;
}

export const SearchForm: FC<ISearchFormProperties> = ({ value, onChange, apiError }) => {
  const router = useRouter();

  useEffect(() => {
    const parameters = new URLSearchParams({ [SEARCH_PARAMETER]: value });
    router.replace(`?${parameters.toString()}`);
  }, [router, value]);

  return (
    <div className='w-1/3'>
      <div className='mt-2'>
        <form>
          <FormGroup error={apiError} id={SEARCH_ID} label='Search'>
            <Input
              id={SEARCH_ID}
              name={SEARCH_ID}
              placeholder='Search...'
              type='text'
              value={value}
              onChange={onChange}
            />
          </FormGroup>
        </form>
      </div>
    </div>
  );
};
