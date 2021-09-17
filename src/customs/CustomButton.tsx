import { Input } from "antd";
import React from "react";

interface IProps {
  type?: string;
  style?: any;
  value: string;
  disabled?: any;
  onClick?: () => void;
}

export const CustomButton = ({
  type,
  style,
  value,
  disabled,
  onClick,
}: IProps) => {
  return (
    <Input
      onClick={onClick}
      disabled={disabled}
      value={value}
      type={type || "button"}
      size="large"
      style={
        style || {
          backgroundColor: "#ba9541",
          color: "#FFF",
        }
      }
    />
  );
};
