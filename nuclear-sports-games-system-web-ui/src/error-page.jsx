import { useEffect, useState } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Typography, Button } from '@douyinfe/semi-ui';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5); // 倒计时时间

  // 自动返回上一页的逻辑
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1); // 每秒减少1秒
      } else {
        navigate(-1); // 自动返回上一页
      }
    }, 1000);

    // 清理定时器，防止内存泄漏
    return () => clearTimeout(timer);
  }, [timeLeft, navigate]);

  // 手动返回上一页的按钮
  const handleGoBack = () => {
    navigate(-1); // 手动返回上一页
  };

  const handleGoHome = () => {
    navigate("/"); // 返回首页
  };

  return (
    <div id="error-page" style={
      {
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        width: "100%"
      }
    }>
      <Title>{error.status}</Title>
      <Text style={{ marginBottom: '8px' }}>我们无法访问此页面，因为产生了以下错误</Text>
      <Text strong style={{ marginBottom: '8px' }}>
        <i>{error.statusText || error.message}</i>
      </Text>


      <div style={{ marginBottom: '8px',
      display: "flex",
        "flex-direction": "row",}}>
      <Button onClick={handleGoBack} style={{ marginRight: '8px' }}>返回上一页面({timeLeft}s)</Button>
      <Button type="secoyixiendary" onClick={handleGoHome}>返回首页</Button>
      </div>
    </div>
  );
}