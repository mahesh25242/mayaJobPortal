import { Box } from "@mui/material";
import React from "react";
import JobSeeker from "../../../components/registration/jobSeeker/JobSeeker";

export function Update() {
    const childRef: null | { current: any } = React.useRef();
    
  return (
    <Box>
        <br />
      <JobSeeker ref={childRef} />
    </Box>
  );
}