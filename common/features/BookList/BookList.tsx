import useBookStore from '@/common/stores/bookStore/useBookStore';
import useBooksInfiniteQuery from '../BookSearchBar/queries/useBooksInfiniteQuery';
import CDRIAccordion from '@/common/components/ui/CDRIAccordion/CDRIAccordion';
import BookItem from './components/BookItem';

function BookList() {
  const queryParams = useBookStore(state => state.bookSearch.queryParamsForRetrieveBooksApi);
  const {
    data,
  } = useBooksInfiniteQuery({
    queryParams,
  });

  return (
    <CDRIAccordion>
      {data?.pages.flatMap(page => {
        return page.documents.map(book => {
          const {
            isbn,
          } = book;

          return (
            <CDRIAccordion.CustomItem
              key={isbn}
              id={isbn}
            >
              {props => (
                <BookItem
                  key={isbn}
                  id={isbn}
                  book={book}
                  {...props}
                />
              )}
            </CDRIAccordion.CustomItem>
          );
        });
      })}
    </CDRIAccordion>
  );
}

export default BookList;
