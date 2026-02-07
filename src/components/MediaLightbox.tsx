 import { useState, useEffect, useRef } from "react";
 import { Dialog, DialogContent } from "@/components/ui/dialog";
 import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
 
 interface MediaItem {
   type: "video" | "image";
   src: string;
 }
 
 interface MediaLightboxProps {
   media: MediaItem[];
   initialIndex: number;
   isOpen: boolean;
   onClose: () => void;
 }
 
 const MediaLightbox = ({ media, initialIndex, isOpen, onClose }: MediaLightboxProps) => {
   const [currentIndex, setCurrentIndex] = useState(initialIndex);
   const [isMuted, setIsMuted] = useState(false);
   const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobile = useIsMobile();
 
   useEffect(() => {
     setCurrentIndex(initialIndex);
   }, [initialIndex]);
 
   useEffect(() => {
     if (videoRef.current) {
       videoRef.current.muted = isMuted;
     }
   }, [isMuted, currentIndex]);
 
   const goToPrev = () => {
    if (media.length === 0) return;
     setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
   };
 
   const goToNext = () => {
    if (media.length === 0) return;
     setCurrentIndex((prev) => (prev + 1) % media.length);
   };
 
   const handleKeyDown = (e: React.KeyboardEvent) => {
     if (e.key === "ArrowLeft") goToPrev();
     if (e.key === "ArrowRight") goToNext();
     if (e.key === "Escape") onClose();
   };
 
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Don't render if media is empty
  if (!media || media.length === 0) {
    return null;
  }

  const currentMedia = media[currentIndex] || media[0];
 
   return (
     <Dialog open={isOpen} onOpenChange={onClose}>
       <DialogContent 
        className={`p-0 border-0 overflow-hidden ${
          isMobile 
            ? "w-screen h-screen max-w-none max-h-none rounded-none bg-black" 
            : "max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] max-h-[85vh] w-auto h-auto bg-background shadow-2xl rounded-xl"
        }`}
         onKeyDown={handleKeyDown}
       >
        <div 
          className={`relative flex items-center justify-center bg-black ${
            isMobile ? "w-full h-full" : "min-h-[50vh] max-h-[80vh]"
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
           {/* Close button */}
           <button
             onClick={onClose}
            className={`absolute z-50 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors ${
              isMobile ? "top-4 right-4 p-2" : "top-3 right-3 p-1.5"
            }`}
           >
            <X className={isMobile ? "w-6 h-6" : "w-5 h-5"} />
           </button>
 
          {/* Previous button - hidden on mobile (use swipe) */}
          {!isMobile && (
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
 
           {/* Media content */}
          <div className={`flex items-center justify-center w-full h-full ${isMobile ? "p-0" : "p-4"}`}>
             {currentMedia.type === "video" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                 <video
                   ref={videoRef}
                   src={currentMedia.src}
                  className={`object-contain ${
                    isMobile ? "w-full h-full" : "max-w-full max-h-[70vh] rounded-lg"
                  }`}
                   autoPlay
                   loop
                   controls
                   muted={isMuted}
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  playsInline
                  onContextMenu={(e) => e.preventDefault()}
                 />
                 <button
                   onClick={() => setIsMuted(!isMuted)}
                  className={`absolute bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors ${
                    isMobile ? "bottom-20 left-4 p-2" : "bottom-12 left-2 p-1.5"
                  }`}
                 >
                  {isMuted ? <VolumeX className={isMobile ? "w-5 h-5" : "w-4 h-4"} /> : <Volume2 className={isMobile ? "w-5 h-5" : "w-4 h-4"} />}
                 </button>
               </div>
             ) : (
               <img
                 src={currentMedia.src}
                 alt={`Gallery image ${currentIndex + 1}`}
                className={`object-contain ${
                  isMobile ? "w-full h-full" : "max-w-full max-h-[70vh] rounded-lg"
                }`}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
               />
             )}
           </div>
 
          {/* Next button - hidden on mobile (use swipe) */}
          {!isMobile && (
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
 
           {/* Dots indicator */}
          <div className={`absolute left-1/2 -translate-x-1/2 flex ${isMobile ? "bottom-8 gap-2" : "bottom-3 gap-1.5"}`}>
             {media.map((_, idx) => (
               <button
                 key={idx}
                 onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-colors ${
                  isMobile ? "w-2.5 h-2.5" : "w-2 h-2"
                } ${
                  idx === currentIndex ? "bg-white" : "bg-white/40"
                 }`}
               />
             ))}
           </div>

          {/* Swipe hint for mobile */}
          {isMobile && media.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs">
              Swipe to navigate
            </div>
          )}
         </div>
       </DialogContent>
     </Dialog>
   );
 };
 
 export default MediaLightbox;