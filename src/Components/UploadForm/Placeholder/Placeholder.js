import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import styles from "./../formUpload.module.css"

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
    <div
        {...getRootProps()}
        className={`${styles.placeholderPreview} ${error && touched ? styles.hasError : ""}`}
    >
        <input {...getInputProps()} />
        <FontAwesomeIcon className={styles.uploadIcon} icon={faCloudUploadAlt}></FontAwesomeIcon>
        <p>Кликните или перетащите <strong>фото</strong> для загрузки</p>
    </div>
);

Placeholder.propTypes = {
    error: PropTypes.string,
    getInputProps: PropTypes.func.isRequired,
    getRootProps: PropTypes.func.isRequired,
    touched: PropTypes.bool
};

export default Placeholder;
