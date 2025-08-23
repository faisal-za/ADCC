"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = () => {
    const shareUrl = url || window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url: shareUrl,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="ml-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
      title="Share"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
}