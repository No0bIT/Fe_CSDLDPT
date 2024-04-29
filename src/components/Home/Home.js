import React, { useState } from 'react';
import axios from 'axios';
import "./Home.css";
function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  
  const handleClear= () => {
    setSearched(false);
    setSelectedImage(null);
    setSearchResults([]);
  };
  const handleSearch = async () => {
    setSearched(true);
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/image/search', formData);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='row '>
      <div className='parent-div' style={{ marginBottom: '50px', marginTop: '50px' }}>
        <h1>Tìm kiếm 3 ảnh hoa giống nhất</h1>
      </div>
      <div className='col-sm-12 row' style={{ marginBottom: '20px' }}>
        <div className='col-sm-4 row parent-div'>
          <div className='parent-div'><div className='parent-div'>
            {/* Input file */}
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            {/* Button */}
            <button className="btn btn-info" onClick={() => document.querySelector('input[type="file"]').click()}>Chọn ảnh</button>
        </div> </div>   
          <div className='parent-div'><button type="button" class="btn btn-success" onClick={handleSearch}>Search</button> </div>
          <div className='parent-div'><button type="button" class="btn btn-danger" onClick={handleClear}>Clear</button> </div>
        </div>
        <div className='col-sm-4  parent-div'>
          {
          !selectedImage
          ?  <div className='child-div'><div className='return-image'></div></div>
          :  <div className='return-image'><img src={selectedImage && URL.createObjectURL(selectedImage)} class="img-thumbnail" alt="Selected" style={{ maxWidth: '300px', marginTop: '10px' }} /></div>
        }
        </div>
      </div >
      <div className='line'></div>
      <div style={{ marginTop: '20px' }}>
        {
        !searched || !selectedImage
        ?  <div className='row '>
              <div className='col-sm-4 parent-div'><div className='return-image'></div></div>
              <div className='col-sm-4 parent-div'><div className='return-image'></div></div>
              <div className='col-sm-4 parent-div'><div className='return-image'></div></div>
            </div>
        :
        <div className='row '>
          {
          searchResults.map((result, index) => (
          <div className='col-sm-4 parent-div'>
            <div className='return-image'>
              <img  src={`data:image/jpeg;base64, ${result.image_base64}`}   class="img-thumbnail" alt={`Result ${index + 1}`} style={{ maxWidth: '300px' }} />
            </div> 
          </div> 
          ))}
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
