import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function ShowcaseFiltersAndOrder(props) {
  // States:
  // - See the explanation of why we use State Hook in the /index.js page.
  // - Visibility of order options:
  const [orderOptionsVisible, setOrderOptionsVisibility] = useState(false);
  // - Visibility of filter options:
  const [filterOptionsVisible, setFilterOptionsVisibility] = useState(false);

  // Effects:
  // - See the explanation of why we use Effect Hook in the Masthead.js component.
  // - If the body is bigger than our $tablet-width (see the /styles/assets.scss file), then we start with our order and filter options visible.
  useEffect(() => {
    if (document.body.clientWidth > 768) {
      setOrderOptionsVisibility(true);
      setFilterOptionsVisibility(true);
    }
  }, []);

  // Functions to handle the click on the visibility option of the order and filter options:
  const clickOrderOptionsVisibility = () => {
    setOrderOptionsVisibility(!orderOptionsVisible);
  };
  const clickFilterOptionsVisibility = () => {
    setFilterOptionsVisibility(!filterOptionsVisible);
  };

  var filterCountLabel;
  if (props.filterCount > 0) {
    filterCountLabel = (
      <span className="orange-text">{props.filterCount} ativo(s)</span>
    );
  }
  const iconOpen = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path>
    </svg>
  );
  const iconClose = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="m15.842432 15.325157-3.844941-3.914745-3.914745 3.844942a.99702056.99702056 0 1 1 -1.3972596-1.422627l4.6311026-4.5485257a.996.996 0 0 1 1.409943.012683l4.548526 4.6311024a.996.996 0 0 1 -.01268 1.409943c-.393403.376477-1.033467.380719-1.419943-.01277z" />
    </svg>
  );
  const orderOpen = (
    <>
      <span>ordenação</span>
      {iconOpen}
    </>
  );
  const orderClose = (
    <>
      <span>ordenação:</span>
      {iconClose}
    </>
  );
  const filterOpen = (
    <>
      <span>filtros {props.filterCount > 0 ? filterCountLabel : ""}</span>
      {iconOpen}
    </>
  );
  const filterClose = (
    <>
      <span>filtros:</span>
      {iconClose}
    </>
  );

  return (
    <div id="showcase-filters-order">
      <div
        className="order-header"
        onClick={() => {
          clickOrderOptionsVisibility();
        }}
      >
        {orderOptionsVisible ? orderClose : orderOpen}
      </div>
      <ul className={orderOptionsVisible ? "visible" : "invisible"}>
        <li>
          <div className="title">{props.bookPublicationYear.title}:</div>
          <ul>
            <li
              className={
                props.isOrderActive(
                  props.bookPublicationYear.publicationYearDescId
                )
                  ? "active"
                  : ""
              }
            >
              <div
                onClick={() => {
                  props.clickOrder(
                    props.bookPublicationYear.publicationYearDescId
                  );
                }}
              >
                {props.bookPublicationYear.publicationYearDescTitle}
              </div>
            </li>
            <li
              className={
                props.isOrderActive(
                  props.bookPublicationYear.publicationYearAscId
                )
                  ? "active"
                  : ""
              }
            >
              <div
                onClick={() => {
                  props.clickOrder(
                    props.bookPublicationYear.publicationYearAscId
                  );
                }}
              >
                {props.bookPublicationYear.publicationYearAscTitle}
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div className="title">{props.bookPrices.title}:</div>
          <ul>
            <li
              className={
                props.isOrderActive(props.bookPrices.priceAscId) ? "active" : ""
              }
            >
              <div
                onClick={() => {
                  props.clickOrder(props.bookPrices.priceAscId);
                }}
              >
                {props.bookPrices.priceAscTitle}
              </div>
            </li>
            <li
              className={
                props.isOrderActive(props.bookPrices.priceDescId)
                  ? "active"
                  : ""
              }
            >
              <div
                onClick={() => {
                  props.clickOrder(props.bookPrices.priceDescId);
                }}
              >
                {props.bookPrices.priceDescTitle}
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <div
        className="filter-header"
        onClick={() => {
          clickFilterOptionsVisibility();
        }}
      >
        {filterOptionsVisible ? filterClose : filterOpen}
      </div>
      <ul className={filterOptionsVisible ? "visible" : "invisible"}>
        <li>
          <div
            onClick={() => {
              props.clickFilterType(props.bookFormats.id);
            }}
            className={
              "title " +
              (props.isFilterTypeActive(props.bookFormats.id) ? "active" : "")
            }
          >
            {props.bookFormats.title}:
          </div>
          <ul>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookFormats.formatLivroId,
                props.bookFormats.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookFormats.formatLivroId,
                    props.bookFormats.id
                  );
                }}
              >
                {props.bookFormats.formatLivroTitle}
              </div>
            </li>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookFormats.formatEbookId,
                props.bookFormats.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookFormats.formatEbookId,
                    props.bookFormats.id
                  );
                }}
              >
                {props.bookFormats.formatEbookTitle}
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={() => {
              props.clickFilterType(props.bookConditions.id);
            }}
            className={
              "title " +
              (props.isFilterTypeActive(props.bookConditions.id)
                ? "active"
                : "")
            }
          >
            {props.bookConditions.title}:
          </div>
          <ul>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookConditions.conditionNovoId,
                props.bookConditions.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookConditions.conditionNovoId,
                    props.bookConditions.id
                  );
                }}
              >
                {props.bookConditions.conditionNovoTitle}
              </div>
            </li>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookConditions.conditionUsadoId,
                props.bookConditions.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookConditions.conditionUsadoId,
                    props.bookConditions.id
                  );
                }}
              >
                {props.bookConditions.conditionUsadoTitle}
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={() => {
              props.clickFilterType(props.bookPriceRanges.id);
            }}
            className={
              "title " +
              (props.isFilterTypeActive(props.bookPriceRanges.id)
                ? "active"
                : "")
            }
          >
            {props.bookPriceRanges.title}:
          </div>
          <ul>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookPriceRanges.priceRangeUpTo30Id,
                props.bookPriceRanges.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookPriceRanges.priceRangeUpTo30Id,
                    props.bookPriceRanges.id,
                    true
                  );
                }}
              >
                {props.bookPriceRanges.priceRangeUpTo30Title}
              </div>
            </li>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookPriceRanges.priceRangeUpTo60Id,
                props.bookPriceRanges.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookPriceRanges.priceRangeUpTo60Id,
                    props.bookPriceRanges.id,
                    true
                  );
                }}
              >
                {props.bookPriceRanges.priceRangeUpTo60Title}
              </div>
            </li>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookPriceRanges.priceRangeUpTo90Id,
                props.bookPriceRanges.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookPriceRanges.priceRangeUpTo90Id,
                    props.bookPriceRanges.id,
                    true
                  );
                }}
              >
                {props.bookPriceRanges.priceRangeUpTo90Title}
              </div>
            </li>
            <li
              className={props.isFilterActiveOrPartial(
                props.bookPriceRanges.priceRangeUpTo150Id,
                props.bookPriceRanges.id
              )}
            >
              <div
                onClick={() => {
                  props.clickFilter(
                    props.bookPriceRanges.priceRangeUpTo150Id,
                    props.bookPriceRanges.id,
                    true
                  );
                }}
              >
                {props.bookPriceRanges.priceRangeUpTo150Title}
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={() => {
              props.clickFilterType(props.bookCategories.id);
            }}
            className={
              "title " +
              (props.isFilterTypeActive(props.bookCategories.id)
                ? "active"
                : "")
            }
          >
            {props.bookCategories.title}:
          </div>
          <ul>
            {props.bookCategories.categories.map((category, index) => (
              <li
                key={index}
                className={props.isFilterActiveOrPartial(
                  category.slug,
                  props.bookCategories.id
                )}
              >
                <div
                  onClick={() => {
                    props.clickFilter(category.slug, props.bookCategories.id);
                  }}
                >
                  {category.name}
                </div>
                <ul>
                  {category.subcategories.map((subcategory, index) => (
                    <li
                      key={index}
                      className={props.isFilterActiveOrPartial(
                        subcategory.slug,
                        props.bookSubcategories.id
                      )}
                    >
                      <div
                        onClick={() => {
                          props.clickFilter(
                            subcategory.slug,
                            props.bookSubcategories.id,
                            false,
                            category.slug,
                            props.bookCategories.id
                          );
                        }}
                      >
                        {subcategory.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
