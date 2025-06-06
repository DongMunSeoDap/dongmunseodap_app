import React from "react";
import { Select } from "antd";
import {
  AppstoreOutlined,
  MobileOutlined,
  CarOutlined,
  CameraOutlined,
  ToolOutlined,
  HomeOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    {
      value: "all",
      label: "전체 카테고리",
      icon: <AppstoreOutlined />,
    },
    {
      value: "가전제품",
      label: "가전제품",
      icon: <HomeOutlined />,
    },
    {
      value: "전자기기",
      label: "전자기기",
      icon: <MobileOutlined />,
    },
    {
      value: "자동차",
      label: "자동차",
      icon: <CarOutlined />,
    },
    {
      value: "카메라",
      label: "카메라",
      icon: <CameraOutlined />,
    },
    {
      value: "컴퓨터",
      label: "컴퓨터",
      icon: <LaptopOutlined />,
    },
    {
      value: "기타",
      label: "기타",
      icon: <ToolOutlined />,
    },
  ];

  return (
    <Select
      style={{ width: "100%" }}
      placeholder="카테고리 선택"
      value={selectedCategory}
      onChange={onCategoryChange}
      optionLabelProp="label"
    >
      {categories.map((category) => (
        <Option
          key={category.value}
          value={category.value}
          label={category.label}
        >
          <div style={styles.optionContent}>
            {category.icon}
            <span style={styles.optionText}>{category.label}</span>
          </div>
        </Option>
      ))}
    </Select>
  );
}

const styles = {
  optionContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  optionText: {
    marginLeft: "4px",
  },
};
