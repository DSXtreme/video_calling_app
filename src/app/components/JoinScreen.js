"use clinet";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState } from "react";
import ModalSm from "./Modal";
import { Input } from "./Input";
import Button from "./Button";

const JoinScreen = ({ getMeeting, userName, setUserName }) => {
    const [meetingId, setMeetingId] = useState(null);
    const [modalToggle, setModalToggle] = useState(false);
    const [nameInputErr, setnameInputErr] = useState("");
    const [idInputErr, setIdInputErr] = useState("");

    const onJoin = async () => {
        if (!userName) {
            setnameInputErr("Name Reaquired");
        } else {
            await getMeeting(meetingId);
        }
    };

    const openJoinModal = () => {
        if (!meetingId) {
            setIdInputErr("Id Reaquired");
        } else {
            setModalToggle(true);
        }
    };

    return (
        <div css={container}>
            <ModalSm
                open={modalToggle}
                onCloseModal={() => setModalToggle(false)}
            >
                <Input
                    error={nameInputErr}
                    label={"Your Name"}
                    properties={{
                        onChange: (e) => setUserName(e.target.value),
                    }}
                />
                <div css={modal_button_conatiner}>
                    <Button onClick={() => onJoin()}>Join</Button>
                </div>
            </ModalSm>
            <Input
                label={"Meeting id"}
                width={"350px"}
                error={idInputErr}
                properties={{
                    type: "text",
                    onChange: (e) => {
                        setMeetingId(e.target.value);
                    },
                }}
            />
           
            <Button width={"350px"} style={{marginTop: "1rem"}} onClick={openJoinModal}>Join</Button>

            <div css={or_conatiner}>
                or
            </div>

            <Button width={"350px"} style={{marginTop: "1rem"}} onClick={() => setModalToggle(true)}>Create Meeting</Button>
        </div>
    );
};

export default JoinScreen;

const container = css`
    /* background: red; */
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const or_conatiner = css`
 width: 350px;
 text-align: center;
 margin-top: 1rem;

`

const modal_button_conatiner = css`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 1.2rem;
    overflow: clip;
`;
