import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  disabled?: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  disabled = false
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrevious}
        disabled={disabled}
        className={`
          p-3 rounded-full transition-all duration-200 transform hover:scale-110
          ${disabled 
            ? 'text-white/20 cursor-not-allowed' 
            : 'text-white/80 hover:text-white hover:bg-white/10 active:scale-95'
          }
        `}
      >
        <SkipBack size={22} />
      </button>
      
      <button
        onClick={onPlayPause}
        disabled={disabled}
        className={`
          p-5 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl
          ${disabled 
            ? 'bg-white/10 text-white/30 cursor-not-allowed' 
            : 'bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white shadow-white/25'
          }
        `}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
      </button>
      
      <button
        onClick={onNext}
        disabled={disabled}
        className={`
          p-3 rounded-full transition-all duration-200 transform hover:scale-110
          ${disabled 
            ? 'text-white/20 cursor-not-allowed' 
            : 'text-white/80 hover:text-white hover:bg-white/10 active:scale-95'
          }
        `}
      >
        <SkipForward size={22} />
      </button>
    </div>
  );
};

export default PlayerControls;