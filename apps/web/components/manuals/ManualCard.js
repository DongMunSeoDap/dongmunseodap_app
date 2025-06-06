import React from "react";
import { Card, Typography, Button, Badge, Tooltip } from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const { Text, Title } = Typography;
const { Meta } = Card;

export default function ManualCard({ manual }) {
  const router = useRouter();

  const handleViewManual = () => {
    // 챗봇 페이지로 이동 (기존 채팅 기능 활용)
    router.push(
      `/chat?query=${encodeURIComponent(manual.title)}&manualId=${manual.id}`
    );
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    // PDF 다운로드 로직
    const link = document.createElement("a");
    link.href = manual.pdfUrl;
    link.download = manual.pdfFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("Downloading PDF:", manual.pdfFileName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (size) => {
    return size;
  };

  const getCategoryColor = (category) => {
    const colors = {
      가전제품: "blue",
      전자기기: "green",
      자동차: "red",
      카메라: "purple",
      기타: "default",
    };
    return colors[category] || "default";
  };

  return (
    <Card
      hoverable
      style={styles.card}
      bodyStyle={styles.cardBody}
      cover={
        <div style={styles.coverContainer}>
          <div style={styles.thumbnailPlaceholder}>
            <FileTextOutlined style={styles.thumbnailIcon} />
          </div>
          <Badge
            count={manual.category}
            color={getCategoryColor(manual.category)}
            style={styles.categoryBadge}
          />
        </div>
      }
      actions={[
        <Tooltip title="AI 채팅으로 질문하기" key="chat">
          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={handleViewManual}
            style={styles.actionButton}
          >
            질문하기
          </Button>
        </Tooltip>,
        <Tooltip title="다운로드" key="download">
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            style={styles.actionButton}
          >
            다운로드
          </Button>
        </Tooltip>,
      ]}
    >
      <div style={styles.content}>
        <Title level={5} style={styles.title}>
          {manual.title}
        </Title>

        <div style={styles.brandModel}>
          <Text strong style={styles.brand}>
            {manual.brand}
          </Text>
          <Text type="secondary" style={styles.model}>
            {manual.model}
          </Text>
        </div>

        <Text type="secondary" style={styles.description}>
          {manual.description}
        </Text>

        <div style={styles.metadata}>
          <div style={styles.metaItem}>
            <CalendarOutlined style={styles.metaIcon} />
            <Text type="secondary" style={styles.metaText}>
              {formatDate(manual.uploadDate)}
            </Text>
          </div>

          <div style={styles.metaItem}>
            <EyeOutlined style={styles.metaIcon} />
            <Text type="secondary" style={styles.metaText}>
              {manual.downloadCount.toLocaleString()}
            </Text>
          </div>

          <div style={styles.metaItem}>
            <FileTextOutlined style={styles.metaIcon} />
            <Text type="secondary" style={styles.metaText}>
              {manual.pageCount}p
            </Text>
          </div>

          <div style={styles.metaItem}>
            <Text type="secondary" style={styles.metaText}>
              {formatFileSize(manual.fileSize)}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
}

const styles = {
  card: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    border: "1px solid #f0f0f0",
    height: "100%",
  },
  cardBody: {
    padding: "clamp(12px, 3vw, 16px)",
  },
  coverContainer: {
    position: "relative",
    height: "clamp(100px, 15vw, 120px)",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1677ff",
    opacity: 0.1,
  },
  thumbnailIcon: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    color: "#1677ff",
  },
  categoryBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    marginBottom: "4px",
    lineHeight: "1.3",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    fontSize: "clamp(14px, 3.5vw, 16px)",
  },
  brandModel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
    flexWrap: "wrap",
  },
  brand: {
    color: "#1677ff",
    fontSize: "clamp(12px, 3vw, 14px)",
  },
  model: {
    fontSize: "clamp(10px, 2.5vw, 12px)",
  },
  description: {
    fontSize: "clamp(11px, 2.8vw, 13px)",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: "12px",
  },
  metadata: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "8px",
    borderTop: "1px solid #f0f0f0",
    flexWrap: "wrap",
    gap: "8px 4px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    minWidth: "fit-content",
  },
  metaIcon: {
    fontSize: "clamp(10px, 2.5vw, 12px)",
    color: "#999",
  },
  metaText: {
    fontSize: "clamp(10px, 2.5vw, 12px)",
    whiteSpace: "nowrap",
  },
  actionButton: {
    padding: "4px 8px",
    fontSize: "clamp(10px, 2.5vw, 12px)",
    height: "auto",
  },
};
