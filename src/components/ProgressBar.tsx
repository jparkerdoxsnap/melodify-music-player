import React, { useState } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  onDragStart,
  onDragEnd
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onDragStart?.();
    handleSeek(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleSeek(e);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.();
      onSeek(dragTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const time = (clickX / width) * duration;
    
    if (isDragging) {
      setDragTime(time);
    } else {
      onSeek(time);
    }
  };

  const displayTime = isDragging ? dragTime : currentTime;
  const progress = duration > 0 ? (displayTime / duration) * 100 : 0;

  return (
    <div className="w-full space-y-4">
      <div
        className="relative h-3 bg-white/10 rounded-full cursor-pointer group"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        
        {/* Progress track */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-200 shadow-lg shadow-purple-500/25"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
        
        {/* Thumb */}
        <div 
          className={`
            absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-xl transition-all duration-200
            ${isDragging || progress > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}
          `}
          style={{ left: `${Math.max(0, Math.min(100, progress))}%`, marginLeft: '-10px' }}
        />
        
        {/* Hover effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-white/80 font-medium tabular-nums">
          {formatTime(displayTime)}
        </span>
        <span className="text-white/50 font-medium tabular-nums">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;