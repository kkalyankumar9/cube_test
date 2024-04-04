import axios from 'axios';
import React from 'react';

interface Props {
  customer: any;
  onBack: () => void;
}

const Singlepage: React.FC<Props> = ({ customer, onBack }) => {
  const imageUrl = 'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80';
  const numberOfImages = 9; 
  const imagesPerRow = 3; 

  const rows: any[] = [];
  for (let i = 0; i < numberOfImages; i += imagesPerRow) {
    rows.push(Array.from({ length: imagesPerRow }, (_, index) => i + index));
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f6f5f8" }}>
   
      <h2>{customer.customer_name} details here</h2>
      <p>{customer.title}</p>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex',justifyContent:"center",gap:"10px",alignItems:"center", marginBottom: '10px' }}>
          {row.map((imageIndex: number) => (
            <img
              key={imageIndex}
              src={imageUrl}
              alt={`Image ${imageIndex + 1}`}
              style={{ marginRight: '10px', width: '200px', height: '200px' ,borderRadius:"4px"}}
            />
          ))}
        </div>
      ))}
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default Singlepage;
