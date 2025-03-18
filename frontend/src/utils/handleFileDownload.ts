import axios from "axios";

export function handleFileDownload(filePath: string): void {
  const fileUrl = `http://localhost:8080/uploads/${filePath}`;

  axios
    .get(fileUrl, { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filePath.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error("파일 다운로드 오류:", error);
    });
}
