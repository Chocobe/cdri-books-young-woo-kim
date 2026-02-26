import CDRIAccordion from '@/common/components/ui/CDRIAccordion/CDRIAccordion';
import BookItem from './components/BookItem';
import { TBookModel } from '@/common/apis/bookApis/bookApis.type';

interface IBookListProps {
  books: TBookModel[];
}

function BookList(props: IBookListProps) {
  const {
    books,
  } = props;

  return (
    <CDRIAccordion>
      {books.map(book => {
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
      })}
    </CDRIAccordion>
  );
}

export default BookList;
