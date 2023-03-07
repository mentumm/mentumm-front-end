import React from "react";

type VimeoVideoProps = {
  videoId: string;
};

const VimeoVideo: React.FC<VimeoVideoProps> = ({ videoId }) => {
  return (
    <>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?h=b7c787a5be&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Keeping Your Team Highly Engaged"
        style={{
          maxWidth: "825px",
          width: "100%",
          height: "425px",
        }}
      />
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
};

export default VimeoVideo;
