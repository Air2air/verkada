import { useState } from "react";
import "./App.css";

function App() {
  const data = [
    {
      preview:
        "https://verkada-public-data.s3-us-west-2.amazonaws.com/frontend-interview/preview.png",
      events: [
        {
          title: "Person of Interest",
          subtitle: "Filip Kaliszan",
          site: "3rd Floor",
          detail: "v",
          image:
            "https://verkada-public-data.s3-us-west-2.amazonaws.com/frontend-interview/event1.png",
          timestamp: 1612247209,
        },
        {
          title: "Motion",
          subtitle: "People Detected",
          site: "Outside",
          detail: "Front Door",
          image:
            "https://verkada-public-data.s3-us-west-2.amazonaws.com/frontend-interview/event2.png",
          timestamp: 1612207950,
        },
        {
          title: "Crowd",
          subtitle: "2 or more people",
          site: "London",
          detail: "Intersection",
          image:
            "https://verkada-public-data.s3-us-west-2.amazonaws.com/frontend-interview/event3.png",
          timestamp: 1612202420,
        },
      ],
    },
  ];

  const [bigImage, setBigImage] = useState(data[0].events[0].image);
  const [searchTerm, setSearchTerm] = useState("");

  const handleThumbnailClick = (image) => {
    setBigImage(image);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = data[0].events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <ImageComponent
        data={data}
        bigImage={bigImage}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <ListComponent
        data={filteredEvents}
        handleThumbnailClick={handleThumbnailClick}
      />
    </div>
  );
}

const ImageComponent = ({ data, bigImage, searchTerm, handleSearch }) => {
  return (
    <div>
      <div className="image-row">
        <img
          src={bigImage}
          className="image-row-image"
          style={{ maxHeight: "50vh", display: "block", margin: "auto" }}
        />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

const ListComponent = ({ data, handleThumbnailClick }) => {
  return (
    <div>
      {data.map((event, index) => (
        <div
          className="list-row"
          key={index}
          onClick={() => handleThumbnailClick(event.image)}
        >
          <div className="thumbnail">
            <img
              src={event.image}
              className="thumbnail-image"
              alt={event.subtitle}
            />
          </div>
          <div className="title-name">
            <h3>{event.title}</h3>
            <h4>{event.subtitle}</h4>
          </div>
          <div className="description">
            <p>{event.site}</p>
          </div>
          <div className="timestamp">
            <p>{new Date(event.timestamp * 1000).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
