import React from "react";
import PropTypes from "prop-types";
import styles from "./../formUpload.module.css"

const ShowError = ({ error, touched }) =>
    touched && error ? (
        <div className={styles.error}>
            <div className={styles.error}>Обязательно для заполнения</div>
        </div>
    ) : null;

ShowError.propTypes = {
    error: PropTypes.string,
    touched: PropTypes.bool
};

export default ShowError;
