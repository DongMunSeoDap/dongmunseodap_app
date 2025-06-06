import React, { useState, useEffect } from "react";
import { Typography, Input, Select, Row, Col, Spin } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import ManualCard from "./ManualCard";
import CategoryFilter from "./CategoryFilter";

const { Title, Text } = Typography;
const { Option } = Select;

export default function ManualListPage() {
  const [manuals, setManuals] = useState([]);
  const [filteredManuals, setFilteredManuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const sampleManuals = [
    {
      id: 1,
      title: "LG 세탁기 WM1234",
      brand: "LG",
      category: "가전제품",
      model: "WM1234",
      uploadDate: "2024-01-15",
      downloadCount: 1250,
      fileSize: "2.4MB",
      pdfUrl: "/manuals/lg-washer-wm1234.pdf",
      pdfFileName: "LG_세탁기_WM1234_사용설명서.pdf",
      description: "스마트 인버터 기술이 적용된 드럼세탁기 사용설명서",
      pageCount: 48,
    },
    {
      id: 2,
      title: "삼성 냉장고 RF60A91R1AP",
      brand: "삼성",
      category: "가전제품",
      model: "RF60A91R1AP",
      uploadDate: "2024-01-10",
      downloadCount: 890,
      fileSize: "3.1MB",
      pdfUrl: "/manuals/samsung-fridge-rf60a91r1ap.pdf",
      pdfFileName: "삼성_냉장고_RF60A91R1AP_사용설명서.pdf",
      description: "패밀리허브 기능이 탑재된 냉장고 사용설명서",
      pageCount: 72,
    },
    {
      id: 3,
      title: "아이폰 15 Pro Max",
      brand: "Apple",
      category: "전자기기",
      model: "A3108",
      uploadDate: "2024-01-12",
      downloadCount: 2100,
      fileSize: "1.8MB",
      pdfUrl: "/manuals/iphone-15-pro-max.pdf",
      pdfFileName: "iPhone_15_Pro_Max_사용설명서.pdf",
      description: "iOS 17 기반 아이폰 15 Pro Max 사용설명서",
      pageCount: 36,
    },
    {
      id: 4,
      title: "현대 쏘나타 DN8",
      brand: "현대",
      category: "자동차",
      model: "DN8",
      uploadDate: "2024-01-08",
      downloadCount: 450,
      fileSize: "5.2MB",
      pdfUrl: "/manuals/hyundai-sonata-dn8.pdf",
      pdfFileName: "현대_쏘나타_DN8_사용설명서.pdf",
      description: "8세대 쏘나타 차량 사용설명서 및 정비매뉴얼",
      pageCount: 124,
    },
    {
      id: 5,
      title: "Canon EOS R6 Mark II",
      brand: "Canon",
      category: "카메라",
      model: "EOS R6 Mark II",
      uploadDate: "2024-01-05",
      downloadCount: 760,
      fileSize: "4.7MB",
      pdfUrl: "/manuals/canon-eos-r6-mark2.pdf",
      pdfFileName: "Canon_EOS_R6_Mark_II_사용설명서.pdf",
      description: "풀프레임 미러리스 카메라 사용설명서",
      pageCount: 98,
    },
  ];

  useEffect(() => {
    // API 호출 시뮬레이션
    setTimeout(() => {
      setManuals(sampleManuals);
      setFilteredManuals(sampleManuals);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortManuals();
  }, [searchQuery, selectedCategory, sortBy, manuals]);

  const filterAndSortManuals = () => {
    let filtered = [...manuals];

    // 검색 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (manual) =>
          manual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manual.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manual.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 카테고리 필터링
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (manual) => manual.category === selectedCategory
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case "popular":
          return b.downloadCount - a.downloadCount;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredManuals(filtered);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* 헤더 */}
        <div style={styles.header}>
          <Title level={2} style={styles.title}>
            사용설명서 라이브러리
          </Title>
          <Text type="secondary" style={styles.subtitle}>
            원하는 제품의 설명서를 쉽게 찾아보세요
          </Text>
        </div>

        {/* 검색 및 필터 */}
        <div style={styles.searchSection}>
          <Input
            size="large"
            placeholder="제품명, 브랜드, 모델명으로 검색..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={styles.searchInput}
          />

          <Row gutter={16} style={styles.filterRow}>
            <Col xs={12} sm={8}>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </Col>
            <Col xs={12} sm={8}>
              <Select
                style={{ width: "100%" }}
                placeholder="정렬 기준"
                value={sortBy}
                onChange={handleSortChange}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="recent">최신순</Option>
                <Option value="popular">인기순</Option>
                <Option value="name">이름순</Option>
              </Select>
            </Col>
          </Row>
        </div>

        {/* 결과 개수 */}
        <div style={styles.resultInfo}>
          <Text type="secondary">
            총 {filteredManuals.length}개의 설명서를 찾았습니다
          </Text>
        </div>

        {/* 설명서 목록 */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <Spin size="large" />
            <Text style={styles.loadingText}>설명서를 불러오는 중...</Text>
          </div>
        ) : (
          <Row gutter={[16, 16]} style={styles.manualsGrid}>
            {filteredManuals.map((manual) => (
              <Col xs={24} sm={12} md={8} key={manual.id}>
                <ManualCard manual={manual} />
              </Col>
            ))}
          </Row>
        )}

        {/* 결과 없음 */}
        {!loading && filteredManuals.length === 0 && (
          <div style={styles.noResults}>
            <Text type="secondary">검색 결과가 없습니다</Text>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#f6f9fc",
    minHeight: "100vh",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    marginBottom: "0.5rem",
    color: "#1677ff",
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
  },
  subtitle: {
    fontSize: "clamp(14px, 3vw, 16px)",
  },
  searchSection: {
    backgroundColor: "#fff",
    padding: "clamp(1rem, 3vw, 1.5rem)",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    marginBottom: "1.5rem",
  },
  searchInput: {
    marginBottom: "1rem",
  },
  filterRow: {
    marginTop: "1rem",
  },
  resultInfo: {
    marginBottom: "1rem",
    textAlign: "left",
    padding: "0 0.5rem",
  },
  manualsGrid: {
    marginTop: "1rem",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "3rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  loadingText: {
    display: "block",
    marginTop: "1rem",
  },
  noResults: {
    textAlign: "center",
    padding: "3rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
};
