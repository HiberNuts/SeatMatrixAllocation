import React from "react";
import { Card } from "reactstrap";

export const PreviewCard = ({ className, bodyClass, ...props }) => {
  return (
    <Card className={`card-preview ${className ? className : ""}`}>
      <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
    </Card>
  );
};

export const PreviewAltCard = ({ className, bodyClass, ...props }) => {
  return (
    <Card className={`${className ? className : ""}`}>
      <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
    </Card>
  );
};

export const PreviewTable = ({ ...props }) => {
  return (
    <Card className="card card-bordered card-preview">
      <table className={`table preview-reference ${props.size ? `table-${props.size}` : ""}`}>{props.children}</table>
    </Card>
  );
};
