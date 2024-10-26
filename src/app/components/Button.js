/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { motion } from "framer-motion";

const Button = ({
    width,
    height,
    children,
    onClick = () => {
        console.log("click");
    },
    style
}) => {
    console.log({...style})
    return (
        <motion.button
            css={button({width, height})}
            style={{...style}}
            onClick={() => {
                onClick();
            }}
            whileTap={{scale: .96}}
        >
            {children}
        </motion.button>
    );
};

export default Button;

const button = ({width}) => css`
    width: ${width};
    font-family: inherit;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    min-width: 150px;
    background-color: var(--foreground);
    color: var(--background);
    font-size: clamp(0.9rem, 2vw, 1rem);

    :disabled {
        background-color: var(--foreground-light);
        cursor: not-allowed;
    }
`;
