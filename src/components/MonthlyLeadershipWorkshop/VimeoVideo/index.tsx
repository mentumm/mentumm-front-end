import React, { useRef, useEffect } from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import Player from "@vimeo/player";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  container: {
    padding: "56.25% 0 0 0",
    position: "relative",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

type VimeoVideoProps = {
  videoId: string;
  onPlay: Function;
};

const VimeoVideo: React.FC<VimeoVideoProps> = ({ videoId, onPlay }) => {
  const classes = useStyles();

  const iframeRef = useRef(null);

  useEffect(() => {
    const player = new Player(iframeRef.current);

    player.on("play", function () {
      if (onPlay) {
        onPlay();
      }
    });

    return () => {
      player.off("play");
    };
  });

  return (
    <>
      <div className={classes.container}>
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={classes.video}
          title="Coaching Conversations"
        ></iframe>
      </div>
    </>
  );
};

export default VimeoVideo;
