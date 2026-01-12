import { useAppDispatch } from '../../../../../../store/hooks';
import { toggleWorkoutProgramModal } from '../../../../../../store/slices/workout-slices/workoutBuilderSlice';
import Button from '../../../../../ui/Button/Button';
import Icon from '../../../../../ui/Icon/Icon';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-medium text-gray-900">Training Programs/Days</h2>
      <Button type="button" onClick={() => dispatch(toggleWorkoutProgramModal(true))}>
        <Icon name="plus" className="mr-2"></Icon>
        Add Program
      </Button>
    </div>
  );
};

export default Header;
