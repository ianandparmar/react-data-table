import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";

export const CountriesTable = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Country name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country native name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country region",
      selector: (row) => row.region,
    },
    {
      name: "Country flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha3Code)}
        >
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  return (
    <DataTable
      title="Country List"
      columns={columns}
      data={filteredCountries}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={<button className="btn btn-small btn-info">Export</button>}
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className="w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      // subHeaderAlign ="left"
    />
  );
};
