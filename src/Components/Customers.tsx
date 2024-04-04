import axios from 'axios';
import { useEffect, useState } from 'react';
import Singlepage from './Singlepage';


interface Customer {
  id: number;
  customer_name: string;
  title: string;
  address: string;
}

const Customers: React.FC = () => {

  const [leftside, setLeftside] = useState<Customer[]>([]);
  const [page, setPage] = useState<number>(1); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null); 

  useEffect(() => {
    fetchData();
  }, [page]); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Customer[]>(`https://cube-test-server.onrender.com/data?page=${page}`);
      setLeftside(prevData => [...prevData, ...response.data]); 
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    if (scrollTop + clientHeight === scrollHeight && !loading) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  const handleCardClick = (customer: Customer) => {
    setSelectedCustomer(customer); 
  };

  const handleBackClick = () => {
    setSelectedCustomer(null); 
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "35%", padding: "3px", overflowY: 'auto', marginRight: "20px" }} onScroll={handleScroll}>
        {leftside?.map((e: Customer, index: number) => (
          <div key={e.id} style={{
            width: "100%",
            padding: "5px",
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            backgroundColor: "#FFFFFF",
            marginBottom: "10px" 
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "#F3E5F5";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "#FFFFFF";
          }}
            onClick={() => handleCardClick(e)}>
            <h3>{e.customer_name}</h3>
            <p style={{ textAlign: "left" }}>{e.title}</p>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {selectedCustomer ? (
          <div>
            <Singlepage customer={selectedCustomer} onBack={handleBackClick} />
          </div>
        ) : (
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            {loading && <div>Loading...</div>}
  
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
