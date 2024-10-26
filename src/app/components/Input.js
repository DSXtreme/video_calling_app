
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const Input = ({
    width,
    isRequired,
    label,
    height,
    error,
    properties,
    field,
    inputStyles,
    labelStyle
}) => {

    return (
        <div >
            {label
                ? <label
                    css={input_label}
                    style={{ ...labelStyle }}
                >
                    {label} <span css={required_star} style={{ display: isRequired ? "inline" : "none" }}>*</span>
                </label>
                : null
            }

            <input
                css={input_field}
                style={{
                    width: width ? width : "100%",
                    height: height ? height : "40px",
                    border: error
                        ? `2px solid #e92525`
                        : `1px solid black`,
                    ...inputStyles
                }}

                // Basic proeteries of input (type, placeholder etc)
                {...properties}

                // Field of useform controller
                {...field}
            />

            {error &&
                <div css={error_message}>
                    {error}
                </div>
            }
        </div>
    )
}

const input_label = css`
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin: .5rem 0;
`;

const input_field = css`
    width: 100%;
    box-shadow: none;
    padding: 0 0.75rem;
    font-size: 1rem;
    /* outline: none; */
    border: 1px solid black;
    border-radius: .25rem;
    :focus {
        border: none;
    }
`;
const error_message = css`
    font-size: 0.9rem;
    color: #e92525;
    margin-top: 0.35rem;
    margin-bottom: 1rem;
    font-weight: 500;
`;
const required_star = css`
    color: var(--primary-color);
    font-size: 1rem;
    display: inline;
    margin-left: 0.35rem;
`;
