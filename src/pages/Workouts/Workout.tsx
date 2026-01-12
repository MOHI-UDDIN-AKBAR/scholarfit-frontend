import Header from '../../components/workout/Workout/Header/Header';
import TabContent from '../../components/workout/Workout/TabContent/TabContent';

const Workout: React.FC = () => {
  return (
    <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Header />
      <TabContent />
    </main>
  );
};

export default Workout;
