import { Chrono } from 'react-chrono';
import './App.css';

// Define the timeline items
const items = [
  {
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "http://someurl/image.jpg",
      },
    },
  },
  {
    title: "May 1942",
    cardTitle: "Dunkkkkirk",
    url: "http://www.history.com",
    cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "http://someurl/image.jpg",
      },
    },
  },
  // Add more items as needed
];

function App() {
  return (
    <div style={{ width: "500px", height: "400px" }}>
      <Chrono items={items} mode="VERTICAL_ALTERNATING" />
    </div>
  );
}

export default App;
