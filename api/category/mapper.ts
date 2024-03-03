import { v4 as uuidv4 } from 'uuid';
import { arraySortAlphabetically } from '../../services/util';
import { CategoryDataType } from './dataTypes';

export const mapCategoryServerToClient = (category: any) => {
  return {
    uuid: category.uuid,
    name: category.name,
    attachment: category.image,
    slug: category.slug,
  } as CategoryDataType;
};
export const mapCategoriesServerToClient = (categories: Array<any>) => {
  return arraySortAlphabetically(
    categories
      .map((category: CategoryDataType) => {
        return mapCategoryServerToClient(category);
      })
      .concat([
        {
          uuid: uuidv4(),
          name: 'General',
          attachment: 'https://via.placeholder.com/400x300',
          slug: 'general',
        },
      ])
  );
};
