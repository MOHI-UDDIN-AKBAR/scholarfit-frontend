import Icon from '../../../ui/Icon/Icon';

type ExerciseTipProps = {
  exerciseTip: string;
};

const ExerciseTip: React.FC<ExerciseTipProps> = ({ exerciseTip }) => {
  return (
    <li className="grid grid-cols-16">
      <Icon name="check" className="text-green-500" />
      <span className="text-gray-700 col-span-15">{exerciseTip}</span>
    </li>
  );
};

export default ExerciseTip;
