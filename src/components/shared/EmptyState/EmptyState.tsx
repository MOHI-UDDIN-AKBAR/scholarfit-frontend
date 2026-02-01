export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  containerClassName?: string;
  wrapperClassName?: string;
  headingClassName?: string;
  paragraphClassName?: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  containerClassName = 'grid h-full text-center place-items-center',
  wrapperClassName,
  headingClassName = 'text-lg font-semibold text-gray-900',
  paragraphClassName = 'text-gray-600 text-md',
}) => {
  return (
    <div className={containerClassName}>
      <div className={wrapperClassName}>
        {icon && <div className="w-24 h-24 mx-auto text-gray-400">{icon}</div>}
        <h3 className={headingClassName}>{title}</h3>
        {description && <p className={paragraphClassName}>{description}</p>}
        {action && action}
      </div>
    </div>
  );
};

export default EmptyState;
// wrapperClassName='max-w-md space-y-3';
