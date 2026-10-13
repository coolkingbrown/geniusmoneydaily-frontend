"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const YOUTUBE_EMBED_BASE = "https://www.youtube-nocookie.com/embed";

// Full-width inline block (matches the EmbeddedTool/OfferCTA "inline embed"
// card convention used elsewhere in the article body), with the actual
// vertical 9:16 player capped at 360px and centered — stretching a 9:16
// video to the full article width would make it far too tall.
//
// Poster + play button render by default; nothing video-related (iframe or
// native <video>) enters the DOM — and therefore nothing touches the
// network — until the user clicks play. Uses a plain <img> for the poster
// rather than next/image since the CDN domain for video_poster_url isn't
// confirmed yet (see next.config.js remotePatterns).
export default function ArticleVideoCard({ youtubeId, mp4Url, posterUrl, title }) {
  const [playing, setPlaying] = useState(false);

  if (!youtubeId && !mp4Url) return null;

  return (
    <div className="my-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-[360px]">
        <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-slate-900 shadow-md">
          {playing ? (
            youtubeId ? (
              <iframe
                src={`${YOUTUBE_EMBED_BASE}/${youtubeId}?autoplay=1`}
                title={`Video summary: ${title}`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={mp4Url}
                poster={posterUrl || undefined}
                controls
                autoPlay
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              >
                Your browser does not support embedded video.
              </video>
            )
          ) : (
            <>
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`Video summary thumbnail for ${title}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-brand-navy" />
              )}
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play 45-second video summary for ${title}`}
                className="absolute inset-0 w-full h-full flex items-center justify-center group"
              >
                <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all group-hover:scale-105">
                  <Play className="w-7 h-7 text-brand-navy ml-1" fill="currentColor" />
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
