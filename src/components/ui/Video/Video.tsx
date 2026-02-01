import React, { useState, useRef } from 'react';
import Icon from '../Icon/Icon';

type VideoProps = {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
};

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  controls = false,
  loop = false,
  muted = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {isLoading && !isError && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <span className="animate-pulse">Loading video...</span>
        </div>
      )}

      {isError ? (
        <div className="flex items-center justify-center py-20 text-red-500">
          Failed to load video
        </div>
      ) : (
        <>
          <video
            muted={muted}
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            controls={controls}
            loop={loop}
            onLoadedData={handleVideoLoaded}
            onError={handleError}
            className={`w-full ${isLoading ? 'hidden' : 'block'}`}
          />

          {!controls && !isPlaying && !isLoading && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center transition bg-black/40 backdrop-blur-sm hover:bg-black/30"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80">
                <Icon name="play" />
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Video;
