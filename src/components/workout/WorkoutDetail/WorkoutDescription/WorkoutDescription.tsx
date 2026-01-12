type WorkoutDescriptionProps = {
  description: string;
};

const WorkoutDescription: React.FC<WorkoutDescriptionProps> = ({ description }) => {
  return (
    <section className="px-6 py-6 overflow-hidden bg-white shadow sm:rounded-lg sm:px-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">About This Workout</h2>
      <div className="text-gray-600">
        <p>{description}</p>
      </div>
    </section>
  );
};

export default WorkoutDescription;
