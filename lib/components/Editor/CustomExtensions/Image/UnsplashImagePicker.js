import React, { useEffect, useState } from "react";

import unsplashApi from "apis/unsplash";
import Input from "components/Common/Input";
import useDebounce from "hooks/useDebounce";
import isEmpty from "lodash.isempty";

const UnsplashImagePicker = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    fetchUnsplashPhotos();
  }, [debouncedQuery]);

  const fetchUnsplashPhotos = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await unsplashApi.getPhotos(debouncedQuery);
      setSearchResults(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neeto-editor-url-form__wrapper">
      <Input
        name="text"
        value={query}
        placeholder="Search Unsplash"
        onChange={({ target: { value } }) => setQuery(value)}
      />
      {loading && isEmpty(searchResults) && <div>Loading...</div>}
      {error && <div>Something went wrong! Please try again later.</div>}
      {!error && !loading && isEmpty(searchResults) && <div>No results</div>}
      {!error && !isEmpty(searchResults) && (
        <div className="neeto-editor-url-form--unsplash-wrapper">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="neeto-editor-url-form--unsplash-item"
              onClick={() => onSubmit(result.urls.regular)}
            >
              <img src={result.urls.thumb} alt={result.alt_description} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnsplashImagePicker;
