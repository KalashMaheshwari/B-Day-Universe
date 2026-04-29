import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, ChevronUp, ChevronDown } from 'lucide-react';

interface VideoItem {
  id: number;
  url: string;
  likes: number;
  caption: string;
}

const VideoSection = () => {
  const [muted, setMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scroll = (direction: 'up' | 'down') => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = container.clientHeight;
    
    if (direction === 'up') {
      container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    const elements = containerRef.current?.querySelectorAll('.reel-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(err => console.log("Autoplay prevented", err));
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    const progressBar = progressBarRefs.current[index];
    if (video && progressBar) {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percent}%`;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const videos: VideoItem[] = [
    {
      id: 1,
      url: "/reel1.mp4",
      likes: 120,
      caption: "Let the celebrations begin! 🎉"
    },
    {
      id: 2,
      url: "/reel2.mp4",
      likes: 340,
      caption: "Make a wish! 🎂✨"
    },
    {
      id: 3,
      url: "/reel3.mp4",
      likes: 210,
      caption: "Sparkling moments 💥"
    },
    {
      id: 4,
      url: "/reel4.mp4",
      likes: 450,
      caption: "Cheers to another amazing year! 🥂"
    }
  ];

  const toggleLike = (id: number) => {
    if (likedVideos.includes(id)) {
      setLikedVideos(likedVideos.filter(vId => vId !== id));
    } else {
      setLikedVideos([...likedVideos, id]);
    }
  };

  return (
    <section className="relative h-screen w-full bg-[#1a1a2e] overflow-hidden flex flex-col items-center justify-center reel-player z-10 border-y-8 border-[#1a1a2e]">
      {/* Title */}
      <div className="absolute top-6 left-6 z-40 bg-[#FFB5E8] text-[#1a1a2e] border-4 border-[#1a1a2e] px-6 py-2 font-mono font-black uppercase tracking-widest transform -rotate-3 shadow-[4px_4px_0_#1a1a2e]">
        Universe Reels 🎬
      </div>

      {/* Vertical Video Container */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="relative max-w-md w-full h-full">
        <div 
          ref={containerRef}
          className="h-full w-full bg-black flex flex-col snap-y snap-mandatory overflow-y-scroll no-scrollbar relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {videos.map((video, index) => {
          const isLiked = likedVideos.includes(video.id);
          
          return (
            <div 
              key={video.id}
              data-index={index}
              className="reel-item h-full w-full flex-shrink-0 snap-start relative flex items-center justify-center"
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.url}
                className="h-full w-full object-cover pointer-events-none"
                loop
                muted={muted}
                playsInline
                onTimeUpdate={() => handleTimeUpdate(index)}
              />
              
              {/* Seek Bar */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/20 cursor-pointer z-40 hover:h-[6px] transition-all"
                onClick={(e) => handleSeek(e, index)}
              >
                <div 
                  ref={(el) => { progressBarRefs.current[index] = el; }}
                  className="h-full bg-[#FF6B6B]"
                  style={{ width: '0%' }}
                />
              </div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

              {/* Sidebar Actions */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-30">
                <button 
                  onClick={() => toggleLike(video.id)}
                  className={`p-4 rounded-full border-4 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] transition-transform active:scale-90 ${isLiked ? 'bg-[#FF6B6B] text-white' : 'bg-white text-[#1a1a2e]'}`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-white' : 'fill-none'}`} />
                </button>
                <span className="text-white font-mono text-xs text-center font-bold drop-shadow-md">
                  {isLiked ? video.likes + 1 : video.likes}
                </span>
              </div>

              {/* Caption & Info */}
              <div className="absolute bottom-8 left-4 right-16 z-30 text-left">
                <div className="bg-[#E7FFAC] border-2 border-[#1a1a2e] px-3 py-1 rounded-md inline-block mb-2 shadow-[2px_2px_0_#1a1a2e]">
                  <span className="font-mono text-xs font-black text-[#1a1a2e] uppercase tracking-widest">@celebration</span>
                </div>
                <p className="text-white font-sans font-bold text-lg drop-shadow-md">
                  {video.caption}
                </p>
              </div>
            </div>
          );
          })}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-4 md:right-auto md:left-[calc(100%+1.5rem)] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 items-center">
          {/* Mute Toggle */}
          <button 
            onClick={() => setMuted(!muted)}
            className="bg-[#E7FFAC] text-[#1a1a2e] p-3 rounded-full border-4 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] interactive hover:translate-y-1 hover:shadow-[0px_0px_0_#1a1a2e] transition-all mb-2"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-6 h-6 font-black" /> : <Volume2 className="w-6 h-6 font-black" />}
          </button>

          <button 
            onClick={() => scroll('up')}
            className="bg-[#FFB5E8] text-[#1a1a2e] p-3 rounded-full border-4 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] interactive hover:translate-y-1 hover:shadow-[0px_0px_0_#1a1a2e] transition-all"
            title="Previous Video"
          >
            <ChevronUp className="w-6 h-6 font-black" />
          </button>
          
          <button 
            onClick={() => scroll('down')}
            className="bg-[#85E3FF] text-[#1a1a2e] p-3 rounded-full border-4 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] interactive hover:translate-y-1 hover:shadow-[0px_0px_0_#1a1a2e] transition-all"
            title="Next Video"
          >
            <ChevronDown className="w-6 h-6 font-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
