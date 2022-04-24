import { Box } from "@mui/material";
import React from "react";
import Employer from "../../../components/registration/employer/Employer";

export function Update() {
  const childRef: null | { current: any } = React.useRef();
  
  return (
    <Box>
      <br/>
      <Employer ref={childRef} />
    </Box>
  );
}