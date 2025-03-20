import './App.css'
import PDFViewer from './components/pdfViewer'
import ImageViewer from "./components/imgViewer";
import ExcelViewer from "./components/excelViewer";

function App() {
  return (
    <>
      <PDFViewer src={"/sample.pdf"} />
      <ImageViewer src={"/sample.JPG"} />
      <ExcelViewer />
    </>
  );
}

export default App
