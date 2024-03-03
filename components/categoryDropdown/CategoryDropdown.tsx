import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CategoryDataType } from '../../api/category/dataTypes';
import CategoryAPI from '../../api/category/request';
import CategoryInterface from '../../interfaces/category.interface';
import styles from './CategoryDropdown.module.scss';

export interface CategoryDropdownProps {
  onCategorySelect: (category: CategoryDataType) => void;
  className?: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    CategoryAPI.all().then((categoriesResponse) => {
      if (categoriesResponse.status === 200) {
        setCategories(categoriesResponse.data);
      }
    });
  }, []);

  const dropdownHandler = () =>
    dropdown ? setDropdown(false) : setDropdown(true);

  const CategoryClickHandler = (category: CategoryDataType) => {
    // props.onCategorySelect(category);
    setDropdown(false);
    const { pathname, query, push } = router;
    // Preserve existing query parameters
    const newQuery = { ...query };
    // Remove existing category from query
    delete newQuery.category;
    // Add the new category to the query
    if (category.name) {
      newQuery.category = category.slug;
    }
    newQuery.preference = newQuery.category || '';
    push({ query: newQuery, pathname });
  };

  const selectedCategory = router.query.category || 'All';
  const categoryLabel = router.query.category
    ? router.query.category
    : 'Category';
  return (
    <>
      <div className={styles.CategoryDropdown + ' ' + (props.className ?? '')}>
        <Tooltip title="Search by category">
          <button
            className={styles.Toggler}
            onClick={dropdownHandler}
            onBlur={() => setDropdown(false)}
          >
            <span>{categoryLabel}</span>
            <span className="icon angle-down-solid"></span>
          </button>
        </Tooltip>
        <div className={'dropdown' + ' ' + (dropdown ? 'active' : '')}>
          <ul>
            <li key={0}>
              <button
                className={selectedCategory === 'All' ? styles.Selected : ''}
                onClick={() =>
                  CategoryClickHandler({
                    name: 'All',
                    uuid: 'all',
                    attachment: '',
                    slug: '',
                  })
                }
              >
                All
              </button>
            </li>
            {categories.map((category: CategoryInterface, index: number) => {
              return (
                <li key={++index}>
                  <button
                    className={
                      selectedCategory === category.name ? styles.Selected : ''
                    }
                    onClick={() => CategoryClickHandler(category)}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryDropdown;
