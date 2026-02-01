import React from 'react';
import Icon from '../Icon/Icon';

type SearchProps = {
  containerClassName?: string;
  wrapperClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Search: React.FC<SearchProps> = ({
  children,
  containerClassName = 'max-w-lg mx-auto',
  wrapperClassName = 'relative rounded-md shadow-sm',
  iconWrapperClassName = 'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
  iconClassName = 'text-gray-400',
  ...rest
}) => {
  return (
    <section className={containerClassName} {...rest}>
      <div className={wrapperClassName}>
        <div className={iconWrapperClassName}>
          <Icon name="search" className={iconClassName} />
        </div>

        {children}
      </div>
    </section>
  );
};

export default Search;
