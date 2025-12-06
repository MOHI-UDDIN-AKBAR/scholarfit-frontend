import clsx from 'clsx';
import type { OnboardingEquipmentCard } from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import { selectEquipments } from '../../../../../store/slices/onboardingSlice';

type EquipmentCardProps = {
  equipmentCard: OnboardingEquipmentCard;
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipmentCard: { equipment, equipmentIcon, equipmentTitle },
}) => {
  const dispatch = useAppDispatch();

  const handleEquipments = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectEquipments(e.target.value as string));
    }
  };
  const equipments = useAppState((state) => state.onboarding.onboardingData.equipments);

  return (
    <label className="equipment-card">
      <input
        type="checkbox"
        name="equipment"
        value={equipment}
        className="sr-only"
        onChange={handleEquipments}
        checked={equipments?.includes(equipment as string) ? true : false}
      />
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
