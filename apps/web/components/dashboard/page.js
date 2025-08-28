import { useSession, signOut } from "next-auth/react";
import { Typography, Button, Card, Row, Col } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  if (!session) {
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Typography.Title level={2}>대시보드</Typography.Title>
            <Typography.Text>
              환영합니다, {session.user.name}님!
            </Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="사용자 정보">
            <p>
              <strong>사용자명:</strong> {session.user.username}
            </p>
            <p>
              <strong>닉네임:</strong> {session.user.name}
            </p>
            <p>
              <strong>권한:</strong> {session.user.role}
            </p>
            <p>
              <strong>토큰 만료시간:</strong> {session.expirationTime}초
            </p>
            <p>
              <strong>액세스 토큰:</strong>{" "}
              {session.accessToken?.substring(0, 50)}...
            </p>
          </Card>
        </Col>

        <Col span={24}>
          <Button type="primary" danger onClick={handleLogout}>
            로그아웃
          </Button>
        </Col>
      </Row>
    </div>
  );
}
