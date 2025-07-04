import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Upload, Music, Shuffle, Repeat, Heart, MoreHorizontal } from 'lucide-react';
import TrackList from './TrackList';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  file: File;
  coverUrl?: string;
  isLiked?: boolean;
}

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, isDragging, repeatMode]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newTracks: Track[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const track: Track = {
          id: Math.random().toString(36).substr(2, 9),
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'Unknown Artist',
          duration: 0,
          file,
          isLiked: false,
        };
        newTracks.push(track);
      }
    });

    setTracks(prev => [...prev, ...newTracks]);
    
    if (!currentTrack && newTracks.length > 0) {
      setCurrentTrack(newTracks[0]);
    }
  };

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentTrack || tracks.length === 0) return;
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    let nextIndex;
    
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentIndex + 1) % tracks.length;
    }
    
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (!currentTrack || tracks.length === 0) return;
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    let prevIndex;
    
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * tracks.length);
    } else {
      prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    }
    
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(0.8);
    } else {
      handleVolumeChange(0);
    }
  };

  const toggleLike = () => {
    if (!currentTrack) return;
    
    setTracks(prev => prev.map(track => 
      track.id === currentTrack.id 
        ? { ...track, isLiked: !track.isLiked }
        : track
    ));
    
    setCurrentTrack(prev => prev ? { ...prev, isLiked: !prev.isLiked } : null);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      const audio = audioRef.current;
      audio.src = URL.createObjectURL(currentTrack.file);
      audio.volume = volume;
      
      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length > 0) {
      const newTracks: Track[] = audioFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Unknown Artist',
        duration: 0,
        file,
        isLiked: false,
      }));
      
      setTracks(prev => [...prev, ...newTracks]);
      
      if (!currentTrack && newTracks.length > 0) {
        setCurrentTrack(newTracks[0]);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <audio ref={audioRef} />
      
      {/* Sidebar - Track List */}
      <div className="lg:w-96 bg-black/40 backdrop-blur-2xl border-r border-white/5 shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Music className="text-white" size={20} />
              </div>
              Melodify
            </h1>
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative group"
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-purple-500/25"
            >
              <Upload size={20} />
              Add Music
            </button>
            
            <div className="absolute inset-0 border-2 border-dashed border-purple-400/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <p className="text-white/50 text-sm mt-3 text-center">
            Drag & drop files or click to browse
          </p>
        </div>
        
        <TrackList
          tracks={tracks}
          currentTrack={currentTrack}
          onTrackSelect={playTrack}
          isPlaying={isPlaying}
        />
      </div>

      {/* Main Player */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000" />
        </div>

        {/* Current Track Display */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
          {currentTrack ? (
            <div className="text-center max-w-lg w-full">
              <div className="relative mb-8 group">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-purple-500/25">
                  <Music size={100} className="text-white/80" />
                </div>
                
                {/* Vinyl record effect */}
                <div className={`absolute inset-4 border-4 border-white/20 rounded-full transition-transform duration-1000 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                
                {/* Floating action buttons */}
                <button
                  onClick={toggleLike}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl transition-all duration-300 transform hover:scale-110 ${
                    currentTrack.isLiked 
                      ? 'bg-red-500/80 text-white shadow-red-500/25' 
                      : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Heart size={20} fill={currentTrack.isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="space-y-2 mb-8">
                <h2 className="text-4xl font-bold text-white leading-tight">{currentTrack.title}</h2>
                <p className="text-white/70 text-xl">{currentTrack.artist}</p>
              </div>
              
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-80 h-80 bg-white/5 rounded-3xl mb-8 flex items-center justify-center border border-white/10 backdrop-blur-xl">
                <Music size={100} className="text-white/30" />
              </div>
              <h2 className="text-3xl font-bold text-white/70 mb-4">Ready to play</h2>
              <p className="text-white/50 text-lg">Add some music to get started</p>
            </div>
          )}
        </div>

        {/* Enhanced Player Controls */}
        <div className="bg-black/40 backdrop-blur-2xl border-t border-white/10 p-6 relative z-10">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Track Info */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {currentTrack && (
                <>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Music size={24} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate text-lg">{currentTrack.title}</h3>
                    <p className="text-white/60 text-sm truncate">{currentTrack.artist}</p>
                  </div>
                  <button
                    onClick={toggleLike}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      currentTrack.isLiked 
                        ? 'text-red-500 hover:bg-red-500/10' 
                        : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <Heart size={18} fill={currentTrack.isLiked ? 'currentColor' : 'none'} />
                  </button>
                </>
              )}
            </div>

            {/* Main Controls */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleShuffle}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isShuffled 
                      ? 'text-purple-400 bg-purple-400/10' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shuffle size={18} />
                </button>
                
                <PlayerControls
                  isPlaying={isPlaying}
                  onPlayPause={togglePlayPause}
                  onNext={playNext}
                  onPrevious={playPrevious}
                  disabled={!currentTrack}
                />
                
                <button
                  onClick={toggleRepeat}
                  className={`p-2 rounded-full transition-all duration-200 relative ${
                    repeatMode !== 'off' 
                      ? 'text-purple-400 bg-purple-400/10' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Repeat size={18} />
                  {repeatMode === 'one' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onToggleMute={toggleMute}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;