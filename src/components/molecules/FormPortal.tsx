import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface FormPortalProps {
    children: ReactNode;
}

const FormPortal = ({ children }: FormPortalProps) => {
    return createPortal(children, document.getElementsByTagName("body")[0]);
};

export default FormPortal;
