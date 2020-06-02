import React from "react";
import PropTypes from "prop-types";
import styles from "./../formUpload.module.css"
const ImagePreview = ({ imagefile }) =>
    imagefile.map(({ name, preview, size }) => (
        <div key={name} className={styles.renderPreview}>
            <div>
            <div className={styles.imageContainer}>
                <img src={preview} alt={name} />
            </div>
            </div>
                <div className={styles.details}>
                    {name} - {(size / 1024000).toFixed(2)}MB
                </div>


        </div>
    ));

ImagePreview.propTypes = {
    imagefile: PropTypes.arrayOf(
        PropTypes.shape({
            file: PropTypes.file,
            name: PropTypes.string,
            preview: PropTypes.string,
            size: PropTypes.number
        })
    )
};

export default ImagePreview;
