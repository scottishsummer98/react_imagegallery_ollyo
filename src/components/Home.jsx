import React, { useState } from "react";

const Home = () => {
  const [images, setImages] = useState([
    { id: "1", src: require("../images/image-1.webp") },
    { id: "2", src: require("../images/image-2.webp") },
    { id: "3", src: require("../images/image-3.webp") },
    { id: "4", src: require("../images/image-4.webp") },
    { id: "5", src: require("../images/image-5.webp") },
    { id: "6", src: require("../images/image-6.webp") },
    { id: "7", src: require("../images/image-7.webp") },
    { id: "8", src: require("../images/image-8.webp") },
    { id: "9", src: require("../images/image-9.webp") },
    { id: "10", src: require("../images/image-10.jpeg") },
    { id: "11", src: require("../images/image-11.jpeg") },
  ]);
  const [selectedImageIndices, setSelectedImageIndices] = useState([]);

  const toggleImageSelection = (index) => {
    if (selectedImageIndices.includes(index)) {
      setSelectedImageIndices(selectedImageIndices.filter((i) => i !== index));
    } else {
      setSelectedImageIndices([...selectedImageIndices, index]);
    }
  };

  const deleteSelectedImages = () => {
    if (selectedImageIndices.length > 0) {
      const updatedImages = images.filter(
        (_, index) => !selectedImageIndices.includes(index)
      );
      setImages(updatedImages);
      setSelectedImageIndices([]);
    }
  };

  const moveSelectedImages = (step) => {
    if (selectedImageIndices.length > 0) {
      const minIndex = Math.min(...selectedImageIndices);
      const maxIndex = Math.max(...selectedImageIndices);

      if (
        (step === -1 && minIndex > 0) ||
        (step === 1 && maxIndex < images.length - 1)
      ) {
        const updatedImages = [...images];
        const newIndices = [...selectedImageIndices].sort((a, b) => a - b);

        for (let i = 0; i < newIndices.length; i++) {
          const currentIndex = newIndices[i];
          const newIndex = currentIndex + step;
          [updatedImages[currentIndex], updatedImages[newIndex]] = [
            updatedImages[newIndex],
            updatedImages[currentIndex],
          ];
          newIndices[i] = newIndex;
        }

        setImages(updatedImages);
        setSelectedImageIndices(newIndices);
      }
    }
  };

  return (
    <div className="home_container">
      {selectedImageIndices.length > 0 ? (
        <>
          <div className="actions_container">
            <div className="action_container_text">
              {selectedImageIndices.length} files selected
            </div>
            <div className="action_container_buttons">
              {selectedImageIndices.length > 1 ? null : (
                <>
                  <button
                    className="move_btn"
                    onClick={() => moveSelectedImages(-1)}
                  >
                    Move Up
                  </button>
                  <button
                    className="move_btn"
                    onClick={() => moveSelectedImages(1)}
                  >
                    Move Down
                  </button>
                </>
              )}

              <button className="delete_btn" onClick={deleteSelectedImages}>
                Delete
              </button>
            </div>
          </div>
          <hr />
        </>
      ) : null}

      {images.length > 0 ? (
        <div className="gallery_container">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${
                selectedImageIndices.includes(index) ? "selected" : ""
              } ${index === 0 ? "featured" : "non_featured"}`}
            >
              <img
                className={`gallery_image_single ${
                  selectedImageIndices.includes(index) ? "selected" : ""
                } ${index === 0 ? "featured" : "non_featured"}`}
                src={image.src}
                alt={`GalleryImage ${image.id}`}
                onClick={() => toggleImageSelection(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        "No Image available!"
      )}
    </div>
  );
};

export default Home;
