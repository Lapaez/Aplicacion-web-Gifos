import React, { useEffect, useState } from "react";
import axios from "axios";

const Trending = ({modo}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "ujI1Zuy6lPUNN7wR2oRBEUEnYC7BaqXW",
            limit: 15
          }
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <p>Hay un error</p>;
    }
    return currentItems.map(el => {
      return (
        <>
          <img key={el.id} className="img padding-20" src={el.images.fixed_height.url} />
        </>
      );
    });
  };
  
  return (
    <div
        className={`${
          modo
            ? "margin-top-20 flex fondo-light flex-wrap margin-bottom-30 justify-content-center "
            : "margin-top-20 flex fondo-dark flex-wrap margin-bottom-30 justify-content-center "
        }`}
      >
         {renderGifs()}
      </div>
  );
};

export default Trending;
