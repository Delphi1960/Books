import { atom, selector } from 'recoil';

export const booksStateAtom = atom({
  key: "booksStateAtom",
  default: [
    {
      kind: "",
      id: "",
      etag: "",
      selfLink: "",
      volumeInfo: {
        title: "",
        authors: [""],
        averageRating: 0,
        publisher: "",
        publishedDate: "",
        description: "",
        industryIdentifiers: [
          {
            type: "",
            identifier: 0,
          },
          {
            type: "",
            identifier: 0,
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 0,
        printType: "",
        categories: [""],
        maturityRating: "",
        allowAnonLogging: false,
        contentVersion: "",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail: "",
          thumbnail: "",
        },
        language: "",
        previewLink: "",
        infoLink: "",
      },
      saleInfo: {
        country: "",
        saleability: "",
        isEbook: false,
        listPrice: {
          amount: 0,
          currencyCode: "",
        },
        retailPrice: {
          amount: 0,
          currencyCode: "",
        },
        buyLink: "",
        offers: [
          {
            finskyOfferType: 0,
            listPrice: {
              amountInMicros: 0,
              currencyCode: "",
            },
            retailPrice: {
              amountInMicros: 0,
              currencyCode: "",
            },
          },
        ],
      },
      accessInfo: {
        country: "",
        viewability: "",
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: "",
        epub: {
          isAvailable: false,
          acsTokenLink: "",
        },
        pdf: {
          isAvailable: false,
          acsTokenLink: "",
        },
        webReaderLink: "",
        accessViewStatus: "",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet: "",
      },
    },
  ],
});

export const filterAreAvailable = atom({
  key: "filterAreAvailable",
  default: false,
});

export const filterBooksList = atom({
  key: "filterBooksList",
  default: "Все книги",
});
export const filterBooksListSelector = selector({
  key: "filterBooksListSelector",
  get: ({ get }) => {
    const areAvailable = get(filterAreAvailable);
    const price = get(FilterBookAtom);
    const filter = get(filterBooksList);
    const post = get(booksStateAtom);
    switch (filter) {
      case "Только платные":
        return post.filter(
          (item) =>
            item.saleInfo?.saleability === "FOR_SALE" &&
            item.saleInfo?.retailPrice?.amount < price.priceMax &&
            item.saleInfo?.retailPrice?.amount > price.priceMin
        );
      case "Только бесплатные":
        return post.filter((item) => item.saleInfo?.saleability === "FREE");
      default:
        if (areAvailable) {
          return post.filter(
            (item) => item.saleInfo?.saleability !== "NOT_FOR_SALE"
          );
        } else {
          return post;
        }
    }
  },
});

export interface FilterBook {
  priceMin: number;
  priceMax: number;
  inAuthor: string;
  inTitle: string;
}

export const FilterBookAtom = atom<FilterBook>({
  key: "FilterBookAtom",
  default: {
    priceMin: 0,
    priceMax: 500,
    inAuthor: "Стивен Кинг",
    inTitle: "",
  },
});
