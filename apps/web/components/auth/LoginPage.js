"use client";

import React, { useState } from "react";
import { Typography, Input, Button, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userId, setUserId] = useState("admin");
  const [privateKey, setPrivateKey] = useState("1234");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username: userId,
        password: privateKey,
        redirect: false,
      });

      if (result?.error) {
        message.error("로그인에 실패했습니다.");
      } else if (result?.ok) {
        message.success("로그인에 성공했습니다.");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      message.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <Typography.Title
          level={2}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          로그인
        </Typography.Title>
      </div>

      <form onSubmit={handleLogin}>
        <div style={styles.container}>
          <div style={styles.inputGroup}>
            <Input
              name="userId"
              type="text"
              value={userId}
              placeholder="아이디"
              size="large"
              onChange={(e) => setUserId(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Input.Password
              name="privateKey"
              value={privateKey}
              placeholder="비밀번호"
              size="large"
              onChange={(e) => setPrivateKey(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.buttonWrapper}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={styles.loginButton}
              block
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth: "420px",
    margin: "0 auto",
    padding: "2rem 1rem",
    background: "#f5f5f5",
  },
  header: {
    marginBottom: "2rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  input: {
    borderRadius: "6px",
  },
  buttonWrapper: {
    marginTop: "1rem",
  },
  loginButton: {
    height: "45px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
  },
};
