import { Form } from "antd";
import Select from "rc-select";
import React from "react";

interface IProps {
  name: string;
  style?: any;
  placeholder?: string;
  required?: any;
}

export const CustomSelect = ({
  name,
  style,
  placeholder,
  required,
}: IProps) => {
  return (
    <Form.Item name={name}>
      <select
        required={required}
        placeholder={placeholder}
        style={
          style || {
            border: "2px solid #ba9541",
          }
        }
      />
    </Form.Item>
  );
};
