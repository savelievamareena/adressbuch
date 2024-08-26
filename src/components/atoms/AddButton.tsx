import { Button } from "@mui/material";

type AddButtonType = {
    clickHandler: () => void;
    text: string;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    variant?: "text" | "contained" | "outlined";
    isPending?: boolean;
};

const AddButton = ({
    clickHandler,
    text,
    color = "primary",
    variant = "contained",
    isPending = false,
}: AddButtonType) => {
    return (
        <Button variant={variant} onClick={clickHandler} color={color} disabled={isPending}>
            {text}
        </Button>
    );
};

export default AddButton;
