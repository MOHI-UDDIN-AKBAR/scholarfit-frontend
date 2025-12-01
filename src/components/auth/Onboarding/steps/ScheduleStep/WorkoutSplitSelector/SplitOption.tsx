import type { SplitOptionType } from '../../../../../../config/onboarding-content';

type SplitOptionProps = {
  splitOption: SplitOptionType;
};

const SplitOption: React.FC<SplitOptionProps> = ({
  splitOption: { value, title, description },
}) => {
  return (
    <label className="split-option">
      <input type="radio" name="preferredSplit" value={value} className="sr-only" />
      <div className="flex items-center option-content">
        <div className="option-text">
          <span className="option-title">{title}</span>
          <span className="option-description">{description}</span>
        </div>
        <div className="option-radio"></div>
      </div>
    </label>
  );
};

export default SplitOption;
