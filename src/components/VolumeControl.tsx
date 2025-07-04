import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div 
      className="flex items-center gap-3 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onToggleMute}
        className="p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-110"
      >
        <VolumeIcon size={20} />
      </button>
      
      <div className={`
        transition-all duration-300 overflow-hidden
        ${isHovered ? 'w-32 opacity-100' : 'w-0 opacity-0'}
        lg:w-32 lg:opacity-100
      `}>
        <div className="relative group/slider">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-200"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all duration-200 pointer-events-none"
            style={{ left: `${volume * 100}%`, marginLeft: '-8px' }}
          />
        </div>
      </div>
      
      <span className="text-white/60 text-sm font-medium min-w-[3ch] text-right">
        {Math.round(volume * 100)}
      </span>
    </div>
  );
};

export default VolumeControl;