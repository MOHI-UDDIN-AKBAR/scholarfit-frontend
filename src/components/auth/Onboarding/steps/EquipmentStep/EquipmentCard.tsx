import clsx from 'clsx';
import type { OnboardingEquipmentCard } from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';

type EquipmentCardProps = {
  equipmentCard: OnboardingEquipmentCard;
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipmentCard: { equipment, equipmentIcon, equipmentTitle },
}) => {
  return (
    <label className="equipment-card">
      <input type="checkbox" name="equipment" value={equipment} className="sr-only" />
      <div className="card-content">
        <div className={clsx('card-icon', equipmentIcon.iconStyle ? equipmentIcon.iconStyle : '')}>
          <Icon name={equipmentIcon.icon}></Icon>
        </div>
        <div className="card-text">
          <span className="card-title">{equipmentTitle}</span>
        </div>
      </div>
    </label>
  );
};

export default EquipmentCard;
