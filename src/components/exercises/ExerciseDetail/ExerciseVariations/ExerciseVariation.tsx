import { parseVariationDetail } from '../../../../utils/helpers/exerciseUtils';
import Icon from '../../../ui/Icon/Icon';

type ExerciseVariationProps = { variation: string };

const ExerciseVariation: React.FC<ExerciseVariationProps> = ({ variation }) => {
  const { title, description } = parseVariationDetail(variation);
  return (
    <li className="flex items-center p-4 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center justify-center w-12 h-12 rounded-md shrink-0">
        <Icon name="dumbbell" className="text-blue-600" />
      </div>
      <div className="ml-4">
        <div className="text-base font-medium text-gray-900">{title}</div>
        <div className="text-base text-gray-500">{description}</div>
      </div>
    </li>
  );
};

export default ExerciseVariation;
