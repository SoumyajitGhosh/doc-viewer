import './App.css'
import PDFViewer from './components/pdfViewer'

function App() {
  return (
    <>
      <PDFViewer src={"/sample.pdf"} />
    </>
  )
}

export default App
