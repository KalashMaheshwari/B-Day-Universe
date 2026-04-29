import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Note {
  freq: number;
  duration: number;
}

const MusicPlayer = ({ isEntered }: { isEntered: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Frequencies for notes
  const notes = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.00,
    A4: 440.00,
    Bb4: 466.16,
    C5: 523.25,
  };

  // Happy Birthday Melody
  const melody: Note[] = [
    { freq: notes.C4, duration: 0.3 },
    { freq: notes.C4, duration: 0.1 },
    { freq: notes.D4, duration: 0.4 },
    { freq: notes.C4, duration: 0.4 },
    { freq: notes.F4, duration: 0.4 },
    { freq: notes.E4, duration: 0.8 },
    
    { freq: notes.C4, duration: 0.3 },
    { freq: notes.C4, duration: 0.1 },
    { freq: notes.D4, duration: 0.4 },
    { freq: notes.C4, duration: 0.4 },
    { freq: notes.G4, duration: 0.4 },
    { freq: notes.F4, duration: 0.8 },
    
    { freq: notes.C4, duration: 0.3 },
    { freq: notes.C4, duration: 0.1 },
    { freq: notes.C5, duration: 0.4 },
    { freq: notes.A4, duration: 0.4 },
    { freq: notes.F4, duration: 0.4 },
    { freq: notes.E4, duration: 0.4 },
    { freq: notes.D4, duration: 0.8 },
    
    { freq: notes.Bb4, duration: 0.3 },
    { freq: notes.Bb4, duration: 0.1 },
    { freq: notes.A4, duration: 0.4 },
    { freq: notes.F4, duration: 0.4 },
    { freq: notes.G4, duration: 0.4 },
    { freq: notes.F4, duration: 0.8 },
  ];

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.connect(audioContextRef.current.destination);
      // Set initial volume based on mute state
      masterGainRef.current.gain.value = isMuted ? 0 : 0.15;
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const play8BitNote = (freq: number, duration: number, startTime: number) => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'square';
    osc.frequency.value = freq;

    // Note envelope (relative to master gain)
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(1, startTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.8, startTime + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const playSong = () => {
    if (!audioContextRef.current) return;
    
    setIsPlaying(true);
    const ctx = audioContextRef.current;
    let startTime = ctx.currentTime + 0.1;

    melody.forEach((note) => {
      play8BitNote(note.freq, note.duration, startTime);
      startTime += note.duration + 0.1;
    });

    const totalDuration = melody.reduce((acc, n) => acc + n.duration + 0.1, 0) * 1000;
    loopTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        playSong();
      }
    }, totalDuration);
  };

  const stopSong = () => {
    setIsPlaying(false);
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
    }
  };

  // Auto-play logic when entering
  useEffect(() => {
    if (isEntered) {
      const timer = setTimeout(() => {
        initAudio();
        if (!isPlaying) {
          playSong();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
    return () => stopSong();
  }, [isEntered]);

  const toggleMute = () => {
    initAudio();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    if (masterGainRef.current) {
      // Instant volume change
      masterGainRef.current.gain.value = newMuteState ? 0 : 0.15;
    }

    // Ensure playing if unmuting
    if (!newMuteState && !isPlaying) {
      playSong();
    }
  };

  if (!isEntered) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="bg-[#1a1a2e] text-[#E7FFAC] border-4 border-[#1a1a2e] p-3 rounded-full shadow-[4px_4px_0_#FFB5E8] interactive hover:translate-y-1 hover:shadow-[0px_0px_0_#FFB5E8] transition-all"
        title={isMuted ? 'Unmute Music' : 'Mute Music'}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 animate-pulse" />}
      </button>
      
      {!isMuted && (
        <div className="bg-white border-2 border-[#1a1a2e] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] animate-bounce">
          ♪ 8-Bit Banger ♪
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
