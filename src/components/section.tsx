import { Typography, Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const SectionWrapper = styled(Box)({
  marginBottom: 10,
});

const Section = ({ title, children }: SectionProps) => {
  return (
    <SectionWrapper>
      <Typography variant="h4">{title}</Typography>
      {children}
    </SectionWrapper>
  );
};

export default Section;
