const NotesSection: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-lg font-medium text-gray-900">Workout Notes</h2>
      <div>
        <label htmlFor="workoutNotes" className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          id="workoutNotes"
          name="notes"
          rows={4}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="Add any additional notes, tips, or reminders for this workout..."
        ></textarea>
        <p className="mt-2 text-sm text-gray-500">
          These notes will be visible when you perform this workout.
        </p>
      </div>
    </div>
  );
};

export default NotesSection;
