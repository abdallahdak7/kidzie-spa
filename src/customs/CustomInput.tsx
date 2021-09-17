import { Form, Input } from "antd";
import React from "react";

interface IProps {
  name: string;
  style?: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: any) => void;
}

export const CustomInput = ({
  placeholder,
  name,
  style,
  onChange,
  required,
  type,
}: IProps) => {
  return (
    <Form.Item name={name}>
      <Input
        required={required}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        size="large"
        style={
          style || {
            border: "2px solid #ba9541",
          }
        }
      />
    </Form.Item>
  );
};
