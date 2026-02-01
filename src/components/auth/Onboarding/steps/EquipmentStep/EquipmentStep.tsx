import HeaderContent from '../../shared/HeaderContent';
import {
  onboardingEquipmentCards,
  ONBOARDING_HEADER_CONTENT,
} from '../../../../../config/onboarding-content';
import EquipmentCard from './EquipmentCard';

const EquipmentCardGroup: React.FC = () => {
  return (
    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {onboardingEquipmentCards.map((equipmentCard) => (
        <EquipmentCard equipmentCard={equipmentCard} key={equipmentCard.equipment} />
      ))}
    </form>
  );
};

const EquipmentStep: React.FC = () => {
  return (
    <section id="step-3" className="onboarding-step">
      <HeaderContent headerContent={ONBOARDING_HEADER_CONTENT.equipmentStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <EquipmentCardGroup />
        </div>
      </div>
    </section>
  );
};

export default EquipmentStep;
