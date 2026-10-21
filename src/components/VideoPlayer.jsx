import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ src, tracks = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = document.createElement('video-js');
    el.classList.add('vjs-big-play-centered');
    ref.current.appendChild(el);

    const player = videojs(el, {
      controls: true,
      fluid: true,
      sources: [{ src, type: 'video/mp4' }],
    });
    tracks.forEach((t) => player.addRemoteTextTrack({ kind: 'subtitles', ...t }, false));

    return () => player.dispose();
  }, [src]);

  return <div ref={ref} />;
}