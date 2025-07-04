import React from 'react';
import { Play, Pause, Music, Heart, MoreVertical } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  file: File;
  coverUrl?: string;
  isLiked?: boolean;
}

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  isPlaying: boolean;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrack,
  onTrackSelect,
  isPlaying
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (tracks.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Music size={32} className="text-white/30" />
        </div>
        <h3 className="text-white/80 font-semibold mb-2">No music yet</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          Upload your favorite tracks to start<br />building your personal library
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-240px)] custom-scrollbar">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white/90 font-semibold text-lg">Your Library</h3>
          <span className="text-white/50 text-sm bg-white/5 px-3 py-1 rounded-full">
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </span>
        </div>
        
        <div className="space-y-1">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            
            return (
              <div
                key={track.id}
                onClick={() => onTrackSelect(track)}
                className={`
                  group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]
                  ${isCurrentTrack 
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 shadow-lg shadow-purple-500/10' 
                    : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                  }
                `}
              >
                {/* Track Number / Play Button */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                    ${isCurrentTrack 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                      : 'bg-white/5 group-hover:bg-white/10'
                    }
                  `}>
                    {isCurrentTrack && isPlaying ? (
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : isCurrentTrack ? (
                      <Pause size={16} className="text-white" />
                    ) : (
                      <span className={`text-sm font-medium transition-all duration-200 ${
                        isCurrentTrack ? 'text-white' : 'text-white/60 group-hover:text-white'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  
                  {/* Play button overlay on hover */}
                  {!isCurrentTrack && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center">
                        <Play size={14} className="text-black ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`
                      font-semibold truncate transition-colors duration-200
                      ${isCurrentTrack ? 'text-white' : 'text-white/90 group-hover:text-white'}
                    `}>
                      {track.title}
                    </h4>
                    {track.isLiked && (
                      <Heart size={14} className="text-red-500 flex-shrink-0" fill="currentColor" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`
                      truncate transition-colors duration-200
                      ${isCurrentTrack ? 'text-white/80' : 'text-white/60 group-hover:text-white/80'}
                    `}>
                      {track.artist}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className={`
                      transition-colors duration-200 flex-shrink-0
                      ${isCurrentTrack ? 'text-white/60' : 'text-white/40 group-hover:text-white/60'}
                    `}>
                      {formatFileSize(track.file.size)}
                    </span>
                  </div>
                </div>

                {/* Duration & More Options */}
                <div className="flex items-center gap-2">
                  <span className={`
                    text-sm transition-colors duration-200
                    ${isCurrentTrack ? 'text-white/80' : 'text-white/50 group-hover:text-white/70'}
                  `}>
                    {formatDuration(track.duration)}
                  </span>
                  
                  <button 
                    className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle more options
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackList;