import { CreateTipsRequestInterface } from '../TipsForm.d';

/**
 * validate tips form
 * @param values
 * @returns errors
 */
const validate = (values: CreateTipsRequestInterface) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = 'Please enter title';
  }
  if (values.title.length >= 255) {
    errors.title = 'Title should not be over 255 characters';
  }
  if (values.tags.length > 10) {
    errors.tags = 'You can only add max 10 tags';
  }
  if (!values.category) {
    errors.category = 'You must select category';
  }
  if (values.tasks.length < 1) {
    errors.tasks = 'Please enter at least one task';
  }

  return errors;
};

export const validateDescription = (description: string) => {
  const errors: any = {};
  if (description.length > 1000) errors.description = 'You can type max 1000 characters';
  return errors;
}

export default validate;
