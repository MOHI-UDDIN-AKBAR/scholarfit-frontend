import clsx from 'clsx';
import HeaderContent from '../../shared/HeaderContent';
import {
  onboardingEquipmentCards,
  onboardingHeaderContent,
} from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import EquipmentCard from './EquipmentCard';

const EquipmentStep: React.FC = () => {
  return (
    <section
      id="step-3"
      className={clsx(
        'onboarding-step'
        // 'hidden'
      )}
    >
      <HeaderContent headerContent={onboardingHeaderContent.equipmentStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {onboardingEquipmentCards.map((equipmentCard) => (
              <EquipmentCard equipmentCard={equipmentCard} key={equipmentCard.equipment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentStep;
