import React, { useEffect, useState, useRef } from "react";
import isEmpty from "lodash.isempty";
import MasonryInfiniteScroller from "react-masonry-infinite";

import { searchUnsplashImages } from "apis/unsplash";
import Input from "components/Common/Input";
import useDebounce from "hooks/useDebounce";

const UnsplashImagePicker = ({ onSubmit }) => {
  const masonryRef = useRef(null);

  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query || "latest");

  useEffect(() => {
    fetchUnsplashPhotos(1);
  }, [debouncedQuery]);

  const fetchUnsplashPhotos = async (page) => {
    try {
      setLoading(true);
      setError(false);

      const response = await searchUnsplashImages(page, debouncedQuery);
      const {
        data: { results, total_pages },
      } = response;

      if (page === 1) {
        setImages(results);
      } else {
        setImages([...images, ...results]);
      }

      setPageNo(page + 1);
      setHasMore(page < total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;

    pageNo > 1 && fetchUnsplashPhotos(pageNo);
  };

  return (
    <div className="neeto-editor-unsplash-wrapper">
      <Input
        name="text"
        value={query}
        placeholder="Search Unsplash"
        onChange={({ target: { value } }) => {
          setQuery(value);
        }}
      />
      {error && (
        <p className="neeto-editor-unsplash-gallery__text">
          Something went wrong! Please try again later.
        </p>
      )}
      {!error && !loading && isEmpty(images) && (
        <p className="neeto-editor-unsplash-gallery__text">No results</p>
      )}
      {!error && (
        <div className="neeto-editor-unsplash-container">
          <MasonryInfiniteScroller
            ref={masonryRef}
            pack={true}
            style={{ width: "100%" }}
            sizes={[
              { columns: 3, gutter: 0 },
              { mq: "768px", columns: 3, gutter: 0 },
              { mq: "1024px", columns: 3, gutter: 0 },
            ]}
            hasMore={hasMore}
            loadMore={loadMore}
            position={true}
            useWindow={false}
            className="neeto-editor-unsplash-gallery"
            loader={<Loader key={0} />}
          >
            {images &&
              images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="neeto-editor-unsplash-gallery__item"
                  >
                    <div
                      className="neeto-editor-unsplash-gallery__item-placeholder"
                      style={{
                        paddingBottom: `${(image.height / image.width) * 100}%`,
                      }}
                    >
                      <div
                        className="neeto-editor-unsplash-gallery__item-inner"
                        id={`unsplashImage${index}`}
                      >
                        <img
                          src={image.urls.regular}
                          onClick={() => onSubmit(image.urls.small)}
                        />
                        <a
                          href={`https://unsplash.com/@${image.user.username}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {image.user.name}{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </MasonryInfiniteScroller>
          {!hasMore && (
            <p className="neeto-editor-unsplash-gallery__text">
              End of results
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const Loader = () => (
  <div className="neeto-editor-unsplash-gallery__loader">
    <span className="neeto-editor-unsplash-gallery__spinner-icon"></span>
  </div>
);

export default UnsplashImagePicker;
