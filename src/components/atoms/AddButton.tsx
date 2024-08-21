import { Button } from "@mui/material";

type AddButtonType = {
    clickHandler: () => void;
    text: string;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    variant?: "text" | "contained" | "outlined";
};

const AddButton = ({
    clickHandler,
    text,
    color = "primary",
    variant = "contained",
}: AddButtonType) => {
    return (
        <Button variant={variant} onClick={clickHandler} color={color}>
            {text}
        </Button>
    );
};

export default AddButton;
