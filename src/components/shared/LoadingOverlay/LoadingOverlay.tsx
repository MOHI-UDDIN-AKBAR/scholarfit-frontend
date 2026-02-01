import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  blurBackground?: boolean;
  zIndex?: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message,
  blurBackground = true,
  zIndex = 50,
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex }}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`absolute inset-0 ${
          blurBackground
            ? 'bg-white/80 backdrop-blur-sm dark:bg-gray-900/80'
            : 'bg-white/50 dark:bg-gray-900/50'
        }`}
      />
      <div className="relative">
        <LoadingSpinner size="lg" showText={!!message} text={message} variant="primary" />
      </div>
    </div>
  );
};
