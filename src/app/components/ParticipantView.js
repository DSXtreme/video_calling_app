/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import { Col, Row } from "react-grid-system";
import ReactPlayer from "react-player";

const ParticipantView = (props) => {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div css={conatiner}>
            <p>Participant: {displayName}</p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            <div css={video_conatiner}>
                {webcamOn && (
                    <ReactPlayer
                        //
                        playsinline // extremely crucial prop
                        pip={false}
                        light={false}
                        controls={false}
                        muted={true}
                        playing={true}
                        style={{
                            borderRadius: "1rem",
                            overflow: "hidden"
                        }}
                        url={videoStream}
                        //
                        height={"199px"}
                        width={"100%"}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ParticipantView;

const conatiner = css`
    margin-top: 1rem;
`

const video_conatiner = css`
    margin-top: 1rem;
`
