/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const ModalSm = ({
    open,
    onCloseModal = () => {
        console.log("No modal close function defined");
    },
    style,
    children,
    title,
}) => {
    return (
        <Modal
            open={open}
            onClose={() => onCloseModal()}
            center
            styles={{
                modal: {
                    borderRadius: "1rem",
                    maxWidth: "400px",
                    width: "95%",
                    margin: 0,
                    padding: "1rem",
                    ...style,
                },
            }}
        >
            <h2>{"title"}</h2>
            <div css={modal_body}>{children}</div>
        </Modal>
    );
};

export default ModalSm;

const modal_body = css`
    margin-top: 1rem;
`
