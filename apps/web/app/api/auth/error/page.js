export default function AuthError() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>인증 오류</h1>
      <p>
        로그인에 실패했습니다. 사용자 ID와 비밀번호를 확인하거나, 네트워크
        상태를 점검해 주세요.
      </p>
      <a href="/auth">로그인 페이지로 돌아가기</a>
    </div>
  );
}
