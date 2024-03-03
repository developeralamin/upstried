import styles from './InputError.module.scss';

export interface InputErrorProps {
  errorMessage: string;
}

const InputError: React.FC<InputErrorProps> = (props) => {
  return (
    <div className={styles.InputError}>
      <h6>{props.errorMessage}</h6>
    </div>
  );
};

export default InputError;
