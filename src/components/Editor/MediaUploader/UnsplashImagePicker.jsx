import React, { useEffect, useState, useRef } from "react";

import { Input, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import MasonryInfiniteScroller from "react-masonry-infinite";

import { searchUnsplashImages } from "apis/unsplash";
import useDebounce from "hooks/useDebounce";
import { isNilOrEmpty } from "utils/common";

const UnsplashImagePicker = ({ onSubmit, unsplashApiKey }) => {
  const { t } = useTranslation();
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

  const fetchUnsplashPhotos = async page => {
    try {
      setLoading(true);
      setError(false);

      const response = await searchUnsplashImages({
        page,
        query: debouncedQuery,
        apiKey: unsplashApiKey,
      });
      const { results, total_pages } = response.data || response;

      if (page === 1) {
        setImages(results);
      } else {
        setImages([...images, ...results]);
      }

      setPageNo(page + 1);
      setHasMore(page < total_pages);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;

    pageNo > 1 && fetchUnsplashPhotos(pageNo);
  };

  const Loader = (
    <div className="neeto-editor-unsplash-gallery__loader">
      <Spinner />
    </div>
  );

  return (
    <div className="neeto-editor-unsplash-wrapper">
      <Input
        autoFocus
        className="neeto-editor-unsplash-search"
        data-cy="neeto-editor-unsplash-image-picker-search-input"
        name="text"
        placeholder={t("placeholders.searchUnsplash")}
        value={query}
        onChange={({ target: { value } }) => {
          setQuery(value);
        }}
      />
      {error && (
        <p
          className="neeto-editor-unsplash-gallery__text"
          data-cy="neeto-editor-unsplash-image-picker-error"
        >
          {t("unsplash.errorMessage")}
        </p>
      )}
      {!error && !loading && isNilOrEmpty(images) && (
        <p
          className="neeto-editor-unsplash-gallery__text"
          data-cy="neeto-editor-unsplash-image-picker-no-results-error"
        >
          {t("unsplash.noResults")}
        </p>
      )}
      {!error && (
        <div className="neeto-editor-unsplash-container">
          <MasonryInfiniteScroller
            pack
            position
            className="neeto-editor-unsplash-gallery"
            hasMore={hasMore}
            loadMore={loadMore}
            loader={Loader}
            ref={masonryRef}
            style={{ width: "100%" }}
            useWindow={false}
            sizes={[
              { columns: 3, gutter: 0 },
              { mq: "768px", columns: 3, gutter: 0 },
              { mq: "1024px", columns: 3, gutter: 0 },
            ]}
          >
            {images &&
              images.map((image, index) => (
                <div
                  className="neeto-editor-unsplash-gallery__item"
                  data-cy={`neeto-editor-unsplash-image-picker-result-${index}`}
                  key={index}
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
                        rel="noreferrer"
                        target="_blank"
                      >
                        {image.user.name}{" "}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </MasonryInfiniteScroller>
          {!hasMore && (
            <p className="neeto-editor-unsplash-gallery__text">
              {t("unsplash.end")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnsplashImagePicker;
