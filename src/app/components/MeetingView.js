/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState } from "react";
import ParticipantView from "./ParticipantView";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import Button from "./Button";
import { Col, Row } from "react-grid-system";
import BarLoader from "react-spinners/BarLoader";

const Controls = (props) => {
    const { leave, toggleMic, toggleWebcam, localParticipant } = useMeeting();

    const { webcamOn, micOn } = useParticipant(localParticipant.id);

    return (
        <div css={button_conatiner}>
            {/* leave button */}
            <Button
                style={{ marginLeft: "1rem", height: "40px" }}
                onClick={() => leave()}
            >
                <img width={20} src={"/icons/leave.png"} alt="icon" />
            </Button>

            {/* Mic button */}
            <Button
                style={{ marginLeft: "1rem", height: "40px" }}
                onClick={() => toggleMic()}
            >
                <img
                    width={micOn ? 12 : 25}
                    src={micOn ? "/icons/mic.png" : "/icons/mic_disabled.png"}
                    alt="icon"
                />
            </Button>

            {/* Cam button */}
            <Button
                style={{ marginLeft: "1rem", height: "40px" }}
                onClick={() => toggleWebcam()}
            >
                <img
                    width={20}
                    src={
                        webcamOn
                            ? "/icons/camera.png"
                            : "/icons/camera_disabled.png"
                    }
                    alt="icon"
                />
            </Button>
        </div>
    );
};

const MeetingView = (props) => {
    const [joined, setJoined] = useState(null);

    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const { join, participants } = useMeeting({
        //callback for when meeting is joined successfully
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        //callback for when meeting is left
        onMeetingLeft: () => {
            props.onMeetingLeave();
        },
    });

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    return (
        <div css={conatiner}>
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined == "JOINED" ? (
                <div css={meeting_media_container}>
                    <Controls />
                    {/* For rendering all the participants in the meeting */}
                    <Row>
                        {[...participants.keys()].map((participantId) => (
                            <Col sm={12} md={6} lg={3} key={participantId}>
                                <ParticipantView
                                    participantId={participantId}
                                    key={participantId}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : joined && joined == "JOINING" ? (
                <div css={meeting_intro}>
                    Joining the meeting...
                    <div style={{marginTop: "1rem"}}>
                        <BarLoader style={{width: "100px"}} />
                    </div>
                </div>
            ) : (
                <div css={meeting_intro}>
                    <span>Want to join Meeting ?</span>
                    <Button onClick={joinMeeting}>Join</Button>
                </div>
            )}
        </div>
    );
};

export default MeetingView;

const conatiner = css`
    /* background: red; */

    h3 {
        font-size: 1.5rem;
        height: 55px;
        padding: 0.5rem 1rem;
        background: var(--nav-color);
        color: var(--background);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
`;
const button_conatiner = css`
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const meeting_intro = css`
    height: calc(100dvh - 55px);
    /* background: green; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1.2rem;
    span {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
`;
const meeting_media_container = css`
    padding: 0 1rem;
`;
